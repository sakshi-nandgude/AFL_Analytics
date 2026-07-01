# AFL Performance Analytics API Test Checklist

## Server

- [ ] FastAPI server starts successfully
- [ ] Swagger UI opens

---

## Root Endpoint

GET /

Expected

- Status 200
- Application name returned

---

## Health

GET /health

Expected

- Status 200
- Healthy response

---

## Dashboard

GET /dashboard/

Expected

- Total Teams
- Total Players
- Total Matches
- Average Scores

---

## Teams

GET /teams/

Expected

- 18 Teams
- Ordered alphabetically

---

## Single Team

GET /teams/1

Expected

- Team Details

---

GET /teams/999

Expected

404

---

## Players

GET /players/

Expected

720 Players

---

GET /players/1

Expected

Player Details

---

GET /players/9999

Expected

404