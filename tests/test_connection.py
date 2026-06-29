from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from sqlalchemy import create_engine, text
from etl.config import DATABASE_URL

try:
    engine = create_engine(DATABASE_URL)

    with engine.connect() as conn:
        result = conn.execute(text("SELECT version();"))

        print("Connected Successfully!")
        print(result.scalar())

except Exception as e:
    print("Connection Failed!")
    print(e)