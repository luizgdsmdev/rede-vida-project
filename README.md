# Rede Vida Project

> **⚠️ Development Status**: This project is currently under development. New features and improvements are being actively developed. Please check the issues and projects sections to see what's being worked on.

A comprehensive blood donation platform developed as a final project for an AWS course in partnership with official partner EDN (cloud school). This platform connects blood donors with blood banks, facilitating life-saving donations through modern web technologies.

## Overview

The **Rede Vida Project** is a complete solution designed to facilitate and optimize the blood donation process, connecting donors, recipients, and donation centers in a single integrated platform.

### Main Objectives
- **Connect Donors**: Facilitate donor registration and engagement
- **Locate Centers**: Easily find nearby donation centers
- **Schedule Donations**: Complete donation scheduling system
- **Emergencies**: Urgent donation notifications
- **Accessibility**: Multi-language support and responsive design

## Project Architecture

The project follows **Clean Architecture** principles with clear separation of concerns:

```
├── rede-vida-backEnd/          # Backend Spring Boot + Java 21
├── rede-vida-UI/               # Frontend React + Vite
├── db/                         # Database scripts
├── docker-compose.yml          # Docker orchestration
└── docs/                       # Detailed documentation
```

## Quick Start

### Prerequisites
- Java 21+
- Maven 3.6+
- **Docker Desktop** (required for database)
- Node.js 18+
- npm or yarn

### Quick Setup

The application uses Docker to automatically start PostgreSQL with PostGIS extension.

```bash
# Clone the repository
git clone https://github.com/luizgdsmdev/rede-vida-project
cd rede-vida-project

# Start backend (automatically starts PostgreSQL with Docker)
cd rede-vida-backEnd
mvn spring-boot:run

# Start frontend (in another terminal)
cd rede-vida-UI
npm install && npm run dev
```

### Docker Requirements

**Important**: Docker Desktop must be running before starting the backend application. The Maven configuration will automatically:

1. Start PostgreSQL with PostGIS extension using Docker
2. Wait for the database to be healthy
3. Connect the application to the database

### Alternative Setup (Manual Database)

If you prefer to use a local PostgreSQL installation:

```bash
# Start backend with Docker disabled
cd rede-vida-backEnd
mvn spring-boot:run "-Dskip.docker=true"

# Note: You must have PostgreSQL 16+ with PostGIS 3.4+ installed locally
```

### Access
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8080`
- **API Documentation**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI Spec**: `http://localhost:8080/v3/api-docs`

## Complete Documentation

For detailed information, consult our organized documentation:

### Essential Guides
- **[Backend Documentation](./docs/BACKEND.md)** - Architecture, structure, and backend development
- **[Frontend Documentation](./docs/FRONTEND.md)** - Components, structure, and frontend development
- **[API Documentation](./docs/API.md)** - Endpoints, authentication, and usage examples
- **[Database Documentation](./docs/DATABASE.md)** - Schema, configurations, and migrations

### Operations
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Environment setup and deployment
- **[Contributing Guide](./docs/CONTRIBUTING.md)** - How to contribute to the project

## Key Features

- **Donor Registration**: Simple registration process
- **Center Location**: Georeferenced search for donation centers
- **Scheduling**: Complete donation scheduling system
- **Multi-language**: Support for Portuguese, English, and Spanish
- **Responsive Design**: Optimized experience for all devices
- **Notifications**: Real-time alerts for donation opportunities

## Technology Stack

### Backend
- **Java 21** + **Spring Boot 4.0.3**
- **PostgreSQL** + **PostGIS** for geospatial data
- **Clean Architecture** + **Domain-Driven Design**
- **Docker** for containerization

### Frontend
- **React 19.2.0** + **Vite 7.3.1**
- **TailwindCSS** for styling
- **React Router** for navigation
- **i18next** for internationalization

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add: new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

For detailed guides, consult our [Contributing Guide](./docs/CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.