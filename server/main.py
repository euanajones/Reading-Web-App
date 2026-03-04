import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/user/{user_name}")
def welcome_user(user_name: str):
    return {"message": f"Welcome, {user_name}!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)