from sqlmodel import SQLModel
from server.models import UserBase, BookBase
import datetime

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

class UserLogin(SQLModel):
    email: str
    password: str

class BookCreate(BookBase):
    currently_reading: bool | None = False
    current_page : int | None = 0

class BookPublic(BookBase):
    id: int
    currently_reading: bool | None = False
    current_page : int | None = 0

class BookUpdate(SQLModel):
    title: str | None = None
    author: str | None = None
    pages: int | None = None
    currently_reading: bool | None = None
    current_page : int | None = None