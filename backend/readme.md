# AFL Performance Analytics Backend

## Technology

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic

## Architecture

Browser

↓

Router

↓

Service

↓

SQLAlchemy Models

↓

SQL Views

↓

PostgreSQL

## Endpoints

GET /

GET /health

GET /dashboard/

GET /teams/

GET /teams/{team_id}

GET /players/

GET /players/{player_id}