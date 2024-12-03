from pydantic import BaseModel
from typing import Optional


class Item(BaseModel):
    name: str
    price: float
    is_offer: Optional[bool] = None


class SpendingItem(BaseModel):
    time: str
    amount: float
    type: str
    description: Optional[str] = None


class UserRegisterItem(BaseModel):
    username: str
    password: str
    email: str


class UserLoginItem(BaseModel):
    username: str
    password: str


class TokenModel(BaseModel):
    token: str

class AddGroupItem(BaseModel):
    group_name: str
    user_id: str

class GetGroupItem(BaseModel):
    user_id: str

