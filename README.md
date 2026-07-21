# 🏉 AFL Performance Analytics Portal

<p align="center">

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116-green?logo=fastapi)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Azure-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker)
![Azure](https://img.shields.io/badge/Microsoft-Azure-0078D4?logo=microsoftazure)
![GitHub Actions](https://img.shields.io/badge/GitHub-Actions-2088FF?logo=githubactions)
![License](https://img.shields.io/badge/License-MIT-success)

</p>

---

# 📖 Project Overview

The **AFL Performance Analytics Portal** is an end-to-end cloud-based sports analytics platform designed to transform raw Australian Football League (AFL) match data into meaningful insights through interactive dashboards and REST APIs.

The project combines **data engineering**, **backend API development**, **frontend development**, **database design**, **cloud deployment**, **containerisation**, and **DevOps** into a single production-oriented application.

Unlike a traditional CRUD application, this project demonstrates the complete analytics lifecycle:

- Data extraction
- Data transformation
- Data loading
- Database modelling
- API development
- Frontend visualisation
- Cloud deployment
- Continuous Integration & Continuous Deployment (CI/CD)

The application has been developed as part of an advanced software engineering and business analytics portfolio to demonstrate practical implementation of modern full-stack development practices.

---

# 🎯 Project Objectives

The objectives of this project are to:

- Build a scalable sports analytics platform for AFL data.
- Design a modular REST API using FastAPI.
- Develop a modern React dashboard.
- Create a complete ETL pipeline for AFL datasets.
- Store cleaned data in Azure Database for PostgreSQL.
- Implement automated data generation for testing and development.
- Containerise the application using Docker.
- Deploy the backend to Microsoft Azure App Service.
- Automate deployments using GitHub Actions.
- Build a foundation for a production-ready analytics platform.

---

# 🚀 Key Features

## 📊 Data Engineering

- ETL (Extract, Transform, Load) Pipeline
- Automated AFL dataset processing
- Data cleaning
- Data transformation
- Synthetic data generation for development and testing
- Automated database loading

---

## ⚙ Backend

- FastAPI REST API
- Modular architecture
- SQLAlchemy ORM
- Pydantic validation
- Service Layer architecture
- Health monitoring endpoint
- Dashboard APIs
- Team APIs
- Player APIs
- Swagger API documentation
- Environment variable configuration

---

## 💻 Frontend

- React 19
- Vite
- React Router
- React Query
- Axios
- Tailwind CSS
- Interactive dashboards
- Team pages
- Player pages
- Responsive UI

---

## 🗄 Database

- Azure Database for PostgreSQL
- SQLAlchemy ORM
- Relational schema
- Entity relationships
- Secure environment variable configuration

---

## ☁ Cloud & DevOps

- Microsoft Azure App Service
- Azure Database for PostgreSQL
- GitHub Actions CI/CD
- Docker support
- Docker Compose
- Oryx Build System
- Automated deployments

---

# 🛠 Technology Stack

| Layer | Technologies |
|---------|-------------|
| Frontend | React, Vite, React Router, React Query, Axios, Tailwind CSS |
| Backend | FastAPI, Python 3.12, SQLAlchemy, Pydantic, Uvicorn |
| Database | Azure Database for PostgreSQL |
| Data Engineering | Python ETL Pipeline |
| DevOps | GitHub Actions, Docker, Docker Compose |
| Cloud | Microsoft Azure App Service |
| Tools | VS Code, pgAdmin, Swagger UI, Postman, Git |

---

# 🏗 System Architecture

```
                    AFL Match Dataset
                            │
                            ▼
                 ETL Pipeline (Python)
        ┌────────────┬─────────────┬────────────┐
        │            │             │
        ▼            ▼             ▼
   Extract      Transform       Generate
                                 Test Data
        │            │             │
        └────────────┴─────────────┘
                     │
                     ▼
         Azure Database for PostgreSQL
                     │
                     ▼
              SQLAlchemy ORM Layer
                     │
                     ▼
             FastAPI REST Backend
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
 Swagger Documentation      React Frontend
                                     │
                                     ▼
                                  End Users
```

---

# 🔄 Data Pipeline (ETL)

A dedicated ETL pipeline was developed to automate the ingestion and preparation of AFL datasets before loading them into the application database.

## Extract

- Import raw AFL datasets
- Read CSV files
- Validate source data

---

## Transform

- Clean missing values
- Convert data types
- Standardise formats
- Prepare relational tables
- Validate records

---

## Generate

To support frontend development and API testing, synthetic AFL datasets were generated where required.

Generated data enabled:

- API development
- Dashboard visualisation
- Database testing
- UI development
- Performance testing

---

## Load

Processed datasets are loaded into Azure Database for PostgreSQL through SQLAlchemy.

This ensures the backend consumes clean, validated and structured data rather than raw datasets.

---

# 📂 Project Structure

```
AFL_Analytics/

│
├── backend/
│   │
│   ├── app/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── core/
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── main.py
│   │   └── __init__.py
│   │
│   ├── etl/
│   │   ├── extract.py
│   │   ├── transform.py
│   │   ├── load.py
│   │   ├── generate_data.py
│   │   └── config.py
│   │
│   ├── Dockerfile
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── pages/
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yml
│
├── .github/
│   └── workflows/
│
└── README.md
```

---

# 🐳 Containerisation

The project has been containerised using Docker to ensure consistent development environments across different systems.

Docker support includes:

- Backend Dockerfile
- Frontend Dockerfile
- Docker Compose configuration

The current production deployment uses **Azure App Service with the native Python runtime**, while Docker provides a clear migration path to Azure Container Apps or Azure Kubernetes Service (AKS) in the future.

---

# 📌 Current Architecture

```
React Frontend (Vercel)
           │
           ▼
FastAPI Backend (Azure App Service)
           │
           ▼
Azure Database for PostgreSQL
```

---

# 🚀 Getting Started

## Prerequisites

Before running the project, ensure the following software is installed:

| Software | Version |
|----------|----------|
| Python | 3.12+ |
| Node.js | 20+ |
| npm | Latest |
| PostgreSQL | 16+ (Local) or Azure Database for PostgreSQL |
| Docker | Latest |
| Docker Compose | Latest |
| Git | Latest |
| Visual Studio Code | Recommended |

---

# 📥 Clone the Repository

```bash
git clone https://github.com/<your-username>/AFL_Analytics.git

cd AFL_Analytics
```

---

# ⚙ Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

---

## Create a Virtual Environment

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
DB_HOST=your-server.postgres.database.azure.com
DB_PORT=5432
DB_NAME=afl_analytics
DB_USER=your_username
DB_PASSWORD=your_password

DATABASE_URL=postgresql://username:password@host:5432/afl_analytics
```

The application securely loads configuration using **python-dotenv**, ensuring sensitive credentials are never hardcoded.

---

## Start the Backend

```bash
uvicorn app.main:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

# 💻 Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install project dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 🗄 Database Design

The project uses **Azure Database for PostgreSQL** as the primary relational database.

Key advantages include:

- Managed cloud database
- High availability
- Automatic backups
- Secure authentication
- Scalability
- PostgreSQL compatibility

SQLAlchemy ORM manages communication between FastAPI and PostgreSQL while abstracting SQL queries into Python models.

---

## Database Schema

The application stores AFL data across multiple relational tables, including:

- Teams
- Players
- Seasons
- Matches
- Dashboard statistics

These entities are linked using foreign key relationships, enabling efficient analytical queries.

---

# 🔄 Running the ETL Pipeline

The ETL pipeline prepares raw AFL datasets for analytical use.

Run the pipeline from the backend directory.

```bash
python etl/main.py
```

The ETL process performs the following stages:

1. Extract raw AFL data
2. Validate source files
3. Clean missing values
4. Transform datasets
5. Generate development data (where required)
6. Load processed data into PostgreSQL

This ensures the application always works with clean and structured data.

---

# 📚 API Documentation

FastAPI automatically generates interactive API documentation.

Local Development

```
http://localhost:8000/docs
```

Azure Deployment

```
https://<your-app-name>.azurewebsites.net/docs
```

Swagger allows developers to:

- Explore endpoints
- Execute API requests
- Inspect request models
- View response schemas
- Test backend functionality

---

# 🌐 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Application status |
| GET | `/health` | Health check |
| GET | `/dashboard` | Dashboard analytics |
| GET | `/teams` | Team statistics |
| GET | `/players` | Player statistics |

The API follows RESTful design principles and returns JSON responses for seamless frontend integration.

---

# 🐳 Docker Support

The application has been fully containerised to simplify development and improve portability.

Included Docker resources:

- Backend Dockerfile
- Frontend Dockerfile
- Docker Compose configuration

To build and run the application using Docker:

```bash
docker-compose up --build
```

Docker ensures that developers can run the project consistently across different operating systems without dependency conflicts.

> **Note:** While Docker support is fully implemented, the current production deployment uses Azure App Service with the native Python runtime and Oryx Build System rather than deploying Docker containers.

---

# ☁ Microsoft Azure Deployment

The backend is hosted on **Microsoft Azure App Service**, providing a managed cloud environment for FastAPI.

Production deployment includes:

- Azure App Service (Linux)
- Azure Database for PostgreSQL
- Environment Variables
- Automatic HTTPS
- Azure logging
- Health monitoring

The frontend is deployed separately on **Vercel**, where it communicates with the Azure-hosted REST API.

---

# 🔄 Continuous Integration & Continuous Deployment

The project uses **GitHub Actions** to automate deployments.

Whenever code is pushed to the main branch:

1. GitHub detects the commit.
2. The workflow installs backend dependencies.
3. The project is packaged into a deployment artifact.
4. GitHub authenticates with Azure.
5. Azure App Service receives the deployment.
6. Oryx builds the Python application.
7. Uvicorn starts the FastAPI server.

This automated workflow reduces manual deployment effort and ensures consistent releases.

---

# 📦 Deployment Workflow

```
Developer
     │
     ▼
GitHub Repository
     │
     ▼
GitHub Actions
     │
     ▼
Azure App Service
     │
Oryx Build System
     │
Python Runtime
     │
FastAPI (Uvicorn)
     │
Azure Database for PostgreSQL
     │
REST API
     │
React Frontend (Vercel)
     │
End Users
```

---

# ✅ Current Project Features

✔ End-to-end ETL pipeline

✔ Automated data generation

✔ Azure Database for PostgreSQL

✔ FastAPI REST API

✔ Interactive Swagger documentation

✔ React frontend

✔ SQLAlchemy ORM

✔ Docker support

✔ GitHub Actions CI/CD

✔ Azure App Service deployment

✔ Cloud-hosted REST API

✔ Responsive user interface

---

# ☁ Azure Deployment Journey

Deploying the AFL Performance Analytics Portal to Microsoft Azure involved several stages of planning, configuration, testing, debugging, and optimisation. Throughout the deployment process, multiple challenges were encountered and resolved, providing valuable experience with cloud infrastructure, CI/CD pipelines, and production deployment.

---

# Deployment Architecture

The final production architecture consists of three independent components:

```
                         Users
                           │
                           ▼
                 React Frontend (Vercel)
                           │
                    REST API Requests
                           │
                           ▼
          FastAPI Backend (Azure App Service)
                           │
                    SQLAlchemy ORM
                           │
                           ▼
          Azure Database for PostgreSQL
```

The frontend and backend are deployed independently, allowing each service to scale and be maintained separately.

---

# Deployment Process

The deployment followed these major stages:

1. Developed the backend using FastAPI.
2. Designed and implemented the PostgreSQL database schema.
3. Built the ETL pipeline to prepare AFL datasets.
4. Developed the React frontend.
5. Containerised the application using Docker.
6. Configured GitHub Actions for Continuous Deployment.
7. Created Microsoft Azure App Service.
8. Configured Azure Database for PostgreSQL.
9. Connected the backend using environment variables.
10. Successfully deployed the backend and verified all API endpoints.

---

# Challenges Encountered

Deploying a cloud application involved several real-world engineering challenges.

## Module Import Errors

During deployment, Azure repeatedly failed to start the application because the runtime could not locate the FastAPI package structure.

Typical errors included:

```
ModuleNotFoundError: No module named 'app'
```

### Solution

- Reorganised the backend directory.
- Updated startup commands.
- Corrected deployment artifact paths.
- Ensured the GitHub Actions workflow deployed only the backend project.

---

## Dependency Issues

Some deployments failed because required Python packages were not available during application startup.

### Solution

- Verified the `requirements.txt` file.
- Confirmed all dependencies were installed by Azure Oryx Build.
- Redeployed after validating package installation.

---

## Startup Configuration

Initially, the backend failed to start due to incorrect startup commands.

### Final Startup Command

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Using this configuration allowed Azure App Service to launch the FastAPI application successfully.

---

## Environment Variables

The backend required secure access to the database.

Sensitive configuration values were moved into Azure App Service environment variables.

Examples include:

- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD

This approach improved security and separated application configuration from source code.

---

## Database Connectivity

Connecting the deployed backend to Azure Database for PostgreSQL required careful configuration.

Tasks included:

- Configuring database credentials.
- Updating connection strings.
- Testing SQLAlchemy connectivity.
- Verifying API responses after deployment.

---

# Docker Implementation

The project includes Docker support for consistent development and future production deployment.

Implemented components include:

- Backend Dockerfile
- Frontend Dockerfile
- Docker Compose

At present, production deployment uses Azure App Service with the native Python runtime.

The Docker configuration provides flexibility for future migration to:

- Azure Container Apps
- Azure Kubernetes Service (AKS)
- Azure Container Registry (ACR)

---

# Continuous Integration

GitHub Actions automates backend deployment.

Every push to the main branch automatically:

- Builds the backend.
- Packages deployment artifacts.
- Authenticates with Azure.
- Deploys the application.
- Restarts the Azure App Service.

This significantly reduces manual deployment effort while improving deployment consistency.

---

# Testing

The application was tested throughout development to ensure reliability.

Testing included:

- ETL pipeline validation
- Database connection testing
- REST API testing
- Swagger endpoint verification
- Frontend integration testing
- Azure deployment testing
- Cloud database connectivity
- Docker validation
- GitHub Actions workflow validation

---

# Lessons Learned

Developing this project provided practical experience in several areas of modern software engineering.

Key learning outcomes include:

- Designing scalable REST APIs with FastAPI.
- Building ETL pipelines for structured data processing.
- Designing relational database schemas.
- Using SQLAlchemy ORM effectively.
- Developing modern React applications.
- Managing environment variables securely.
- Containerising applications with Docker.
- Deploying production applications to Microsoft Azure.
- Configuring GitHub Actions for CI/CD.
- Debugging real-world deployment issues.
- Managing cloud infrastructure and application configuration.

---

# Current Project Status

## Completed

- End-to-end ETL pipeline
- Synthetic data generation
- Azure Database for PostgreSQL integration
- SQLAlchemy ORM implementation
- FastAPI backend
- REST API endpoints
- Swagger documentation
- React frontend
- Responsive user interface
- Docker support
- GitHub Actions CI/CD
- Azure App Service deployment
- Cloud database integration

---

# Future Enhancements

The project has been designed with scalability in mind.

Planned improvements include:

- User authentication using JWT
- Role-based access control
- Advanced AFL analytics dashboards
- Interactive charts and visualisations
- Machine Learning models for match prediction
- Player performance forecasting
- API caching using Redis
- Unit and integration testing
- Monitoring with Azure Application Insights
- Container-based deployment using Azure Container Apps or AKS
- Azure Container Registry integration
- API rate limiting
- Performance optimisation
- Production logging and monitoring

---

# Screenshots

Future versions of this README will include screenshots of:

- Home Dashboard
- Team Analytics
- Player Analytics
- Swagger Documentation
- Azure App Service
- GitHub Actions Workflow
- Docker Deployment
- PostgreSQL Database
- ETL Pipeline Execution

---

# Acknowledgements

This project was developed as part of the **MSc in Business Analytics** and demonstrates the practical application of software engineering, data engineering, cloud computing, and business analytics concepts using modern technologies and industry best practices.

---

# Author

**Sakshi Vijay Nandgude**

- MSc Business Analytics
- University of Limerick
- GitHub: https://github.com/<your-github-username>
- LinkedIn: https://linkedin.com/in/<your-linkedin-profile>

---

# License

This project is licensed under the MIT License.

---

## If you found this project useful, consider giving it a ⭐ on GitHub!

