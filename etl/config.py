from pathlib import Path
import os
from urllib.parse import quote_plus
from dotenv import load_dotenv

# Project root
PROJECT_ROOT = Path(__file__).resolve().parents[1]

# Load .env
load_dotenv(PROJECT_ROOT / ".env")

DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "port": os.getenv("DB_PORT"),
    "database": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
}

# Encode password to handle @, #, %, etc.
encoded_password = quote_plus(DB_CONFIG["password"])

DATABASE_URL = (
    f"postgresql+psycopg2://"
    f"{DB_CONFIG['user']}:"
    f"{encoded_password}@"
    f"{DB_CONFIG['host']}:"
    f"{DB_CONFIG['port']}/"
    f"{DB_CONFIG['database']}"
)
