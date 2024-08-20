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
ACCESS_TOKEN_EXPIRE_MINUTES = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
jwt_instance = JWT()
jwk = OctetJWK(SECRET_KEY.encode('utf-8'))

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
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire.timestamp()})  # 使用时间戳而不是 datetime 对象
    encoded_jwt = jwt_instance.encode(to_encode, jwk, alg=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str):
    try:
        payload = jwt_instance.decode(token, jwk, algorithms=[ALGORITHM])
        return payload
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="无效的认证凭证",
            headers={"WWW-Authenticate": "Bearer"},
        )


@app.post("/register")
def register(user: model.UserRegisterItem):
    # 检查用户是否已存在
    if db.users.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="用户名已存在")

    # 生成随机salt
    salt = token_bytes(16)

    # 使用pbkdf2对密码进行加密，使用随机生成的salt
    hashed_password = hashlib.pbkdf2_hmac(
        'sha256', user.password.encode('utf-8'), salt, 100000)

    # 创建新用户，存储salt和密码哈希
    user = {
        "username": user.username,
        "password": hashed_password.hex(),
        "salt": salt.hex(),
        "email": user.email
    }
    db.users.insert_one(user)
    return {"success": True, "message": "注册成功"}


@app.post("/login")
def login(login_item: model.UserLoginItem):
    # 查找用户
    user = db.users.find_one({"username": login_item.username})
    if not user:
        raise HTTPException(status_code=400, detail="用户名或密码错误")

    # 使用存储的salt重新计算密码哈希
    salt = bytes.fromhex(user["salt"])
    hashed_password = hashlib.pbkdf2_hmac(
        'sha256', login_item.password.encode('utf-8'), salt, 100000)

    # 验证密码
    if hashed_password.hex() != user["password"]:
        raise HTTPException(status_code=400, detail="用户名或密码错误")

    access_token = create_access_token(data={"sub": login_item.username})
    return {"success": True, "message": "登录成功", "access_token": access_token, "token_type": "bearer"}


@app.post("/add_spending")
def add_spending(spending: model.SpendingItem):
    print(spending)
    return {"date": spending.date, "amount": spending.amount, "type": spending.type, "description": spending.description}
