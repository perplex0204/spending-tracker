import json
import pymongo
import datetime
from flask import (
    Flask,
    request,
    send_file,
    abort,
    jsonify,
    render_template,
    url_for,
    redirect,
)
from flask_cors import CORS
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    logout_user,
    login_required,
    current_user,
)
from werkzeug.security import generate_password_hash, check_password_hash
from flask_pymongo import PyMongo
import logging
import os
import sys
import numpy as np
import pytz
import jwt
import uuid
from functools import wraps
import traceback
from dotenv import load_dotenv
import argparse

# flask configuration
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("web_backend_secret_key")
app.config["UPLOAD_FOLDER"] = "./uploads"
app.debug = True

# Logging起始設定
log_file = "web_app_templates.log"
logger = logging.getLogger("web_app_templates")
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

# 連接MongoDB
if MONGO_HOST == "localhost":
    uri = "mongodb://{}:{}".format(MONGO_HOST, MONGO_PORT)
else:
    uri = "mongodb://{}:{}@{}:{}/?authSource=admin".format(
        MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT
    )
logger.info("MongoDB connect uri: {}".format(uri))
app.config["MONGO_URI"] = uri
with app.app_context():
    app.config["MONGO_DB"] = pymongo.MongoClient(app.config["MONGO_URI"])[
        "salesplatformv2"
    ]
try:
    result = app.config["MONGO_DB"].command("ping")
    logger.info("MongoDB ping response: {}".format(result))
    logger.info("MongoDB connected")
except Exception as e:
    logger.error("MongoDB ping response: {}".format(e))
    logger.error("MongoDB connect failed")
    sys.exit(1)


# 啟用mongodb起始設置
def init_mongodb():
    # logger.info("Running MongoDB initialization")
    # import mongodb_init

    # # print(mongodb_init.file_upload_record)
    # app.config["MONGO_DB"]["file_upload_record"].insert_one(
    #     mongodb_init.file_upload_record
    # )
    # # print(mongodb_init.match_result)
    # app.config["MONGO_DB"]["match_result"].insert_one(mongodb_init.match_result)
    # # print(mongodb_init.taipower_hour_price)
    # app.config["MONGO_DB"]["taipower_hour_price"].insert_one(
    #     mongodb_init.taipower_hour_price
    # )
    # # print(mongodb_init.taipower_price_day)
    # app.config["MONGO_DB"]["taipower_price_day"].insert_one(
    #     mongodb_init.taipower_price_day
    # )
    # # print(mongodb_init.taipower_bill)
    # app.config["MONGO_DB"]["taipower_bill"].insert_one(mongodb_init.taipower_bill)
    # # print(mongodb_init.web_status)
    # app.config["MONGO_DB"]["web_status"].insert_one(mongodb_init.web_status)
    # # print(mongodb_init.users)
    # for user in mongodb_init.users:
    #     user["id"] = str(uuid.uuid5(uuid.NAMESPACE_DNS, user["user_name"]))
    #     user["password"] = generate_password_hash(user["password"], method="sha256")
    #     app.config["MONGO_DB"]["users"].insert_one(user)
    return None


# Import blueprints
from test_blueprint import test_blueprint

app.register_blueprint(test_blueprint, url_prefix="/v1/test_blueprint")


# 測試用
@app.route("/test", methods=["POST"])
def test():
    try:
        print(request.json)
        return jsonify({"message": "success"}), 200
    except Exception as e:
        return jsonify({"message": "failed"}), 401


if __name__ == "__main__":
    # 啟用mongodb起始設置
    parser = argparse.ArgumentParser(description="Run the Flask app with options.")
    parser.add_argument(
        "--mongodb_init",
        dest="mongodb_init",
        action="store_true",
        help="Initialize MongoDB with default values",
    )
    args = parser.parse_args()
    if args.mongodb_init:
        init_mongodb()

    parser.set_defaults(mongodb_init=False)
    app.run(host="0.0.0.0", port="5050")
