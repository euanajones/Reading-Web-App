from sqlmodel import SQLModel, Field

class UserBase(SQLModel):
    username: str
    first_name: str
    last_name: str
    email: str

class User(UserBase, table=True):
    id: int = Field(default=None, primary_key=True)
    hashed_password: str = Field()
