from dotenv import load_dotenv
import os
from datetime import datetime
from flask import (
    Flask,
    Blueprint,
    request,
    send_file,
    abort,
    jsonify,
    render_template,
    url_for,
    redirect,
    current_app,
)
import logging

test_blueprint = Blueprint("test_blueprint", __name__)

# Logging起始設定
log_file = "salesplatform_backend.log"
logger = logging.getLogger("test_blueprint")
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


# 測試用路由
@test_blueprint.route("/test", methods=["POST"])
def test():
    try:
        print(request.json)
        print(current_app.config["MONGO_DB"]["users"].find_one())
        return jsonify({"message": "general success"}), 200
    except Exception as e:
        return jsonify({"message": "failed"}), 400
