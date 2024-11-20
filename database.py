
import cx_Oracle
from contextlib import contextmanager
from typing import Generator
from config import Config

Config.DB_USER= "C##blue"

Config.DB_PASSWORD="1234"

Config.DB_DSN="localhost:1521/XE"

@contextmanager
def get_db_connection() -> Generator[cx_Oracle.Connection, None, None]:
    connection = None
    try:
        connection = cx_Oracle.connect(
            user=Config.DB_USER,
            password=Config.DB_PASSWORD,
            dsn=Config.DB_DSN
        )
        yield connection
    finally:
        if connection:
            connection.close()



