# Intelligent Reading Tracker
A **full-stack web application** that helps users track their reading, estimate completion time for books, and eventually receive **machine-learning driven reading recommendations** based on their personal reading habits.

This project was built as a **learning-driven exploration of modern web architecture**, authentication systems, and data-driven personalisation.

---

# Project Goals
The aim of this project is to build an application that can:
* Track a user's reading activity
* Estimate **remaining reading time for books**
* Learn a user's **reading speed and habits**
* Provide **intelligent book recommendations** based on time constraints and reading patterns

Example future query:
> *"Suggest a book similar to the books I read last month that would take less than 8 hours to finish."*

The project focuses on building **practical backend systems, authentication workflows, and scalable application structure**, while progressively introducing **data analysis and machine learning components**.

---

# System Architecture
```
React Frontend
      │
      │ HTTP Requests (JSON)
      ▼
FastAPI Backend
      │
      ├── Authentication (JWT)
      ├── Business Logic
      └── REST API Endpoints
      │
      ▼
SQLite Database
```

### Key Design Choices
**React**
* Component-based UI architecture
* Clean separation between UI and backend services
* Scalable frontend structure

**FastAPI**
* High-performance Python API framework
* Automatic OpenAPI documentation
* Async-ready architecture

**SQLite**
* Lightweight relational database
* Ideal for early-stage development and prototyping
* Previous experience working with SQLite
* NOTE: Looking to migrate to PostgreSQL in the future

---

# Tech Stack

| Layer          | Technology       |
| -------------- | ---------------- |
| Frontend       | React            |
| Backend        | FastAPI          |
| Database       | SQLite           |
| Authentication | JWT Tokens       |
| Security       | Password Hashing |
| Middleware     | CORSMiddleware   |

---

# Authentication & Security
The project implements a **token-based authentication system**.

### Workflow
1. **User Registration**
   * Passwords are **hashed before storage**
   * User stored in database

2. **User Login**
   * Credentials verified
   * Server issues **JWT token**

3. **Authenticated Requests**
   * Token included in request headers
   * Backend validates token before granting access

This ensures **secure session management without storing passwords in plaintext**.

---

# API Design
The backend exposes a **RESTful API built with FastAPI**.

Key endpoints include:
```
POST  /register
POST  /login
GET   /users
PATCH /users/{user_id}
```

To allow communication between the **React frontend** and **FastAPI backend**, the project uses:
**CORSMiddleware**

This enables cross-origin communication during development between:
```
React Dev Server → FastAPI API
```

---

# Current Features
### User System
* User registration
* Secure login
* Password hashing
* JWT authentication

### Frontend
* React login page
* React registration page
* API communication with backend

### Backend
* FastAPI server
* SQLite user database
* Authentication endpoints

---

# In Progress

### Personal Reading Library
Users will be able to:
* Add books to their library
* Track reading progress
* Store metadata such as:
  * Title
  * Author
  * Page count
  * Reading progress
  * Start date

---

### Reading Time Estimation
The system will estimate:
* Remaining time for the current book
* Total reading time for new books

Initial calculation:
```
Estimated Time = Pages Remaining / User Reading Speed
```
User reading speed will be learned dynamically from historical data.

---

# Planned Machine Learning Features
A future component of the project will analyse reading behaviour to model:
* Reading speed trends
* Book completion patterns
* Preferred book lengths
* Reading frequency

This will enable predictions such as:
> *"Based on your previous reading behaviour, this book will take approximately 6.3 hours to complete."*

---

# Smart Book Search (Planned)
A key goal is implementing **query-based recommendations**.

Example queries:
```
Suggest a book similar to what I read last month
Recommend a book under 10 hours to finish
Find books similar to my fastest reads
```

Potential techniques:
* Content similarity
* Reading-time filtering
* Behavioural recommendation models

---

# What I Have Learned From This Project So Far
### Backend Development
* Designing REST APIs with FastAPI
* Structuring backend services
* Middleware configuration

### Authentication Systems
* Password hashing
* JWT token authentication
* Secure user login flows

### Full Stack Integration
* React frontend communicating with FastAPI backend
* Handling CORS between services
* Managing application state across client/server

### Database Design
* User storage and schema design
* Handling persistent user data

---

# Future Improvements
Planned technical improvements include:
* Migration from **SQLite → PostgreSQL**
* Integration with **Google Books API**
* Reading analytics dashboard
* Visualisation of reading speed trends
* Recommendation engine
* Natural language query system

---

# Running the Project
## Backend
```bash
cd server
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run on:
```
http://localhost:8000
```

---

## Frontend
```bash
npm install
npm start
```

Frontend will run on:

```
http://localhost:5173
```

---

# Why I Built This
This project was created to **gain hands-on experience building a full-stack application from scratch**, including:
* authentication systems
* API development
* frontend/backend integration
* designing systems that can evolve into **data-driven applications**

It also serves as a foundation for experimenting with **machine learning applied to personal productivity tools**, and stems from myself feeling a need for a tool like this that is not locked behind a paywall or subscription.
