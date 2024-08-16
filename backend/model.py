from pydantic import BaseModel
from typing import Optional


class Item(BaseModel):
    name: str
    price: float
    is_offer: Optional[bool] = None


class SpendingItem(BaseModel):
    date: str
    amount: float
    type: str
    description: Optional[str] = None
