from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/user/{user_name}")
def welcome_user(user_name: str):
    return {"message": f"Welcome, {user_name}!"}
