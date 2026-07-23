# Analytics Views

This folder contains all SQL views used by the Analytics Platform.

The purpose of these views is to separate analytical queries from transactional tables.

Architecture

Raw Tables
↓

Analytics Views
↓

FastAPI Analytics Layer
↓

React Dashboard

Each view should answer one business question and avoid business logic duplication in the application layer.