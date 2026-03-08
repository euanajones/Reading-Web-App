from contextlib import asynccontextmanager
from sqlmodel import create_engine, Session, SQLModel
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import bcrypt

sqlite_file_name = "test_database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)

def get_session():
    with Session(engine) as session:
        yield session

def create_tables():
    SQLModel.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from server.routers.users import router as users_router
app.include_router(users_router)

@app.get("/health")
def health_check():
    return {"status": "Running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)