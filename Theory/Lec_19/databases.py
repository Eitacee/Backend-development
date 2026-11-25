# Alias to database.py to maintain compatibility
from database import engine, SessionLocal, Base, get_db, DATABASE_URL

__all__ = ["engine", "SessionLocal", "Base", "get_db", "DATABASE_URL"]