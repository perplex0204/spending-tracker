# uvicorn app:app --reload
from fastapi import FastAPI
import pymongo
import datetime
from fastapi import FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
import logging
import os
import sys
from jwt import JWT
from jwt.jwk import OctetJWK
from jwt.exceptions import JWTDecodeError
import traceback
from dotenv import load_dotenv
from datetime import datetime, timedelta
import argparse
import uvicorn
import hashlib
import model
from secrets import token_bytes
from bson.objectid import ObjectId

# FastAPI configuration
app = FastAPI()

# Logging起始設定
log_file = "account.log"
logger = logging.getLogger("account")
logger.setLevel(logging.INFO)
file_handler = logging.FileHandler(log_file, encoding="utf-8")
file_handler.setLevel(logging.INFO)
formatter = logging.Formatter(
    "%(asctime)s - %(name)s(%(lineno)d) [%(levelname)s] : %(message)s"
)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.INFO)
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

# 環境變數設定
load_dotenv("secret_key.env")
MONGO_HOST = str(os.getenv("MONGODB_HOSTNAME"))
MONGO_PORT = str(os.getenv("MONGODB_PORT"))
MONGO_USER = str(os.getenv("MONGODB_USERNAME"))
MONGO_PASS = str(os.getenv("MONGODB_PASSWORD"))
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
jwt_instance = JWT()
jwk = OctetJWK(SECRET_KEY.encode("utf-8"))

# 連接MongoDB
if MONGO_HOST == "localhost":
    uri = f"mongodb://{MONGO_HOST}:{MONGO_PORT}"
else:
    uri = f"mongodb://{MONGO_USER}:{MONGO_PASS}@{
        MONGO_HOST}:{MONGO_PORT}/?authSource=admin"
logger.info("MongoDB connect uri: {}".format(uri))
client = pymongo.MongoClient(uri)
db = client["accounting"]
try:
    result = db.command("ping")
    logger.info("MongoDB ping response: {}".format(result))
    logger.info("MongoDB connected")
except Exception as e:
    logger.error("MongoDB ping response: {}".format(e))
    logger.error("MongoDB connect failed")
    sys.exit(1)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": int(expire.timestamp())})  # 使用整數時間戳
    encoded_jwt = jwt_instance.encode(to_encode, jwk, alg=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(days=7)  # refresh token 通常有更長的有效期
    to_encode.update({"exp": int(expire.timestamp())})
    encoded_jwt = jwt_instance.encode(to_encode, jwk, alg=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt_instance.decode(token, jwk, algorithms=[ALGORITHM])
        print(f"成功解碼的載荷：{payload}")
        return payload
    except JWTDecodeError as e:
        print(f"JWT 解碼錯誤：{str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"無效的認證憑證：{str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        print(f"未預期的錯誤：{str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"服務器錯誤：{str(e)}",
        )

@app.post("/test")
def test(request: model.TestItem):
    return {"message": "Hello from API: " + request.name}

@app.post("/register")
def register(user: model.UserRegisterItem):
    # 检查用户是否已存在
    if db.users.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="用户名已存在")

    # 生成随机salt
    salt = token_bytes(16)

    # 使用pbkdf2对密码进行加密，使用随机生成的salt
    hashed_password = hashlib.pbkdf2_hmac(
        "sha256", user.password.encode("utf-8"), salt, 100000
    )

    # 创建新用户，存储salt和密码哈希
    user = {
        "username": user.username,
        "password": hashed_password.hex(),
        "salt": salt.hex(),
        "email": user.email,
        "email_verified": False,
        "role": "user",
        "group": [],
        "user_data_session": {
            "register_time": datetime.now(),
            "last_login_time": datetime.now(),
            "last_password_change_time": datetime.now(),
        },
        "session": {
            "token": "",
            "refresh_token": "",
            "token_type": "bearer",
        },
    }
    user_result = db.users.insert_one(user)
    return {"success": True, "message": "注册成功"}

@app.post("/login")
def login(login_item: model.UserLoginItem):
    user = db.users.find_one({"username": login_item.username})
    if not user:
        raise HTTPException(status_code=400, detail="帳號或密碼錯誤")
    salt = bytes.fromhex(user["salt"])
    hashed_password = hashlib.pbkdf2_hmac(
        "sha256", login_item.password.encode("utf-8"), salt, 100000
    )
    if hashed_password.hex() != user["password"]:
        raise HTTPException(status_code=400, detail="帳號或密碼錯誤")
    access_token = create_access_token(data={"sub": login_item.username})
    refresh_token = create_refresh_token(data={"sub": login_item.username})
    db.users.update_one(
        {"username": login_item.username},
        {
            "$set": {
                "session.token": access_token,
                "session.refresh_token": refresh_token,
            }
        },
    )
    return_data = {
        "user_id": str(user["_id"]),
        "user_name": user["username"],
        "email": user["email"],
        "user_data_session": user["user_data_session"],
    }
    return {
        "success": True,
        "message": "登入成功",
        "token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user_data": return_data,
    }


@app.post("/get_role_by_token")
def get_role_by_token(token: model.TokenModel):
    payload = decode_access_token(token.token)
    print("payload", payload)
    if payload["exp"] < datetime.now().timestamp():
        raise HTTPException(status_code=401, detail="Token expired")
    user = db.users.find_one({"session.token": token.token})
    return_data = {
        "user_name": user["username"],
        "email": user["email"],
        "user_id": str(user["_id"]),
        "user_data_session": user["user_data_session"],
    }
    return {"success": True, "message": "獲取角色成功", "user_data": return_data}

@app.post("/add_spending")
def add_spending(spending: model.SpendingItem):
    print(spending)
    return {
        "time": spending.time,
        "amount": spending.amount,
        "type": spending.type,
        "description": spending.description,
    }


@app.post("/add_group")
def add_group(add_group: model.AddGroupItem):
    default_type = db["web_status"].find_one({"name": "default_type"})
    default_fast_input = db["web_status"].find_one({"name": "default_fast_input"})
    upload_data = {
        "group_name": add_group.group_name,
        "type": default_type["value"],
        "fast_input": default_fast_input["value"],
        "member": [add_group.user_id],
    }
    db["group"].insert_one(upload_data)
    return {"success": True, "message": "新增群組成功"}


@app.post("/get_group")
def get_group(get_group: model.GetGroupItem):
    group_list = list(db["group"].find({"member": {"$in": [get_group.user_id]}}))
    for group in group_list:
        group["_id"] = str(group["_id"])
    return {"success": True, "message": "獲取群組成功", "data": group_list}


@app.post("/get_user_list_by_group")
def get_user_list_by_group(get_user_list_by_group: model.GetUserListByGroupItem):
    print(get_user_list_by_group)
    group_data = db["group"].find_one(
        {"_id": ObjectId(get_user_list_by_group.group_id)}
    )
    if group_data is not None:
        return {
            "success": True,
            "message": "獲取群組成員成功",
            "data": group_data["member"],
        }
    else:
        return {"success": False, "message": "群組不存在"}
