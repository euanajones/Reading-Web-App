from fastapi import APIRouter, Depends, Query, HTTPException
from sqlmodel import Session, select
from server.main import get_session
from server.auth.auth import hash_password, create_token, verify_current_user, verify_password
from server.models import User
from server.schemas import UserCreate, UserPublic, UserUpdate, UserLogin

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/health")
def get_users_health():
    return {"status": "Running"}

@router.post("/create")
def create_user(*, session: Session = Depends(get_session), user: UserCreate):
    hashed_password = hash_password(user.password)
    extra_data = {"hashed_password": hashed_password}
    db_user = User.model_validate(user, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    token = create_token({"sub": db_user.username, "email": db_user.email})
    return {"token": token}

@router.post("/login")
def login_user(*, session: Session = Depends(get_session), user: UserLogin):
    db_user = session.exec(select(User).where(User.email == user.email)).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    
    token = create_token({"sub": db_user.username, "email": db_user.email})
    return {"token": token}

@router.get("/", response_model=list[UserPublic])
def get_users(*, session: Session = Depends(get_session), offset: int = 0, limit: int = Query(default=30, le=100), current_user: dict = Depends(verify_current_user)):
    users = session.exec(select(User).offset(offset).limit(limit)).all()

    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users


@router.patch("/{user_id}", response_model=UserPublic)
def update_user(*, session: Session = Depends(get_session) ,user_id: int, user: UserUpdate):
    db_user = session.get(User, user_id)
    
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    user_data = user.model_dump(exclude_unset=True)

    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = hash_password(password)
        extra_data["hashed_password"] = hashed_password

    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return db_user
