from sqlalchemy import text

from backend.app.database import SessionLocal

db = SessionLocal()

try:

    result = db.execute(
        text("SELECT current_database();")
    )

    print(result.fetchone())

finally:

    db.close()