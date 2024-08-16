from fastapi import FastAPI
import json
import pymongo
import datetime
from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional
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
import uvicorn
import model

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


app = FastAPI()


@app.post("/add_spending")
def add_spending(spending: model.SpendingItem):
    print(spending)
    return {"date": spending.date, "amount": spending.amount, "type": spending.type, "description": spending.description}
