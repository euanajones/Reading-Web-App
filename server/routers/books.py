from fastapi import APIRouter, Depends, Query, HTTPException
from server.main import get_session
from server.models import Book
from server.schemas import BookCreate, BookPublic, BookUpdate
from server.auth.auth import verify_current_user
from sqlmodel import Session, select

router = APIRouter(prefix="/books", tags=["books"])

@router.get("/health")
def get_books_health():
    return {"status": "Running"}

@router.post("/create", response_model=BookPublic)
def create_book(*, session: Session = Depends(get_session), book: BookCreate, current_user: dict = Depends(verify_current_user)):
    db_book = Book.model_validate(book)
    session.add(db_book)
    session.commit()
    session.refresh(db_book)
    return db_book

@router.get("/", response_model=list[BookPublic])
def get_books(*, session: Session = Depends(get_session), offset: int = 0, limit: int = Query(default=30, le=100), current_user: dict = Depends(verify_current_user)):
    books = session.exec(select(Book).offset(offset).limit(limit)).all()

    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return books

@router.get("/{book_id}", response_model=BookPublic)
def get_book(*, session: Session = Depends(get_session), book_id: int, current_user: dict = Depends(verify_current_user)):
    book = session.get(Book, book_id)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.patch("/{book_id}", response_model=BookPublic)
def update_book(*, session: Session = Depends(get_session) ,book_id: int, book: BookUpdate, current_user: dict = Depends(verify_current_user)):
    db_book = session.get(Book, book_id)
    
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found.")
    
    book_data = book.model_dump(exclude_unset=True)

    db_book.sqlmodel_update(book_data)
    session.add(db_book)
    session.commit()
    session.refresh(db_book)
    return db_book