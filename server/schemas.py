from sqlmodel import SQLModel
from server.models import UserBase

class UserCreate(UserBase):
    password: str

class UserPublic(UserBase):
    id: int

class UserUpdate(SQLModel):
    username: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    email: str | None = None
    password: str | None = None