from etl.database import get_session

session = get_session()

print("Database session created successfully!")

session.close()

print("Database session closed successfully!")