from sqlmodel import SQLModel, Field

class UserBase(SQLModel):
    username: str
    first_name: str
    last_name: str
    email: str

class User(UserBase, table=True):
    id: int = Field(default=None, primary_key=True)
    hashed_password: str = Field()

class BookBase(SQLModel):
    title: str
    author: str
    pages: int
    currently_reading: bool | None = False
    current_page : int | None = 0

class Book(BookBase, table=True):
    id: int = Field(default=None, primary_key=True)
