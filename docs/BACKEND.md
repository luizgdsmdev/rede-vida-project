# Backend Documentation

## Overview

The backend of Rede Vida Project is built using Spring Boot 4.0.3 with Java 21, following Clean Architecture principles. This document provides comprehensive information about the backend architecture, structure, and development guidelines.

## Architecture

### Clean Architecture Implementation

Our backend follows Clean Architecture with three main layers:

```
src/main/java/com/redeemvida/rv/
├── domain/                         # Domain Layer (Business Rules)
│   ├── entity/                     # Domain entities (pure business objects)
│   ├── repository/                 # Repository interfaces (contracts)
│   └── service/                    # Domain services (business logic)
├── application/                    # Application Layer (Use Cases)
│   ├── dto/                        # Data Transfer Objects
│   ├── usecase/                    # Use cases / Interactors
│   └── service/                    # Application services
└── infrastructure/                 # Infrastructure Layer (External)
    ├── controller/                 # REST Controllers
    ├── repository/                 # Repository implementations (JPA)
    ├── config/                     # Spring configurations
    └── exception/                  # Exception handlers
```

### Architecture Principles

- **Domain Independence**: Business rules are isolated from external concerns
- **Dependency Inversion**: Dependencies point inward toward the domain
- **Testability**: Each layer can be tested independently
- **Flexibility**: Easy to swap implementations (databases, frameworks, etc.)

## Technology Stack

### Core Technologies

- **Java 21**: Latest Java version with modern features
- **Spring Boot 4.0.3**: Main framework for application development
- **Spring Data JPA**: ORM for database operations
- **Hibernate Spatial**: Support for geospatial data
- **Maven**: Build tool and dependency management

### Database

- **PostgreSQL 16**: Primary database
- **PostGIS 3.4**: Spatial extension for geographic data
- **HikariCP**: Connection pooling

### Containerization

- **Docker**: Container runtime
- **Docker Compose**: Multi-container orchestration

## Project Structure

### Domain Layer

Contains the core business logic and entities:

```bash
domain/
├── entity/
│   ├── User.java                   # User domain entity
│   └── DonationCenter.java         # Donation center entity
├── repository/
│   ├── UserRepository.java        # User repository interface
│   └── DonationCenterRepository.java # Donation center repository interface
├── service/
│   ├── UserService.java            # User domain service
│   └── DonationCenterService.java  # Donation center domain service
└── exception/
    ├── BusinessException.java     # Custom business exception
    └── ResourceNotFoundException.java # Resource not found exception
```

### Application Layer

Contains use cases and application services:

```bash
application/
├── dto/
│   ├── UserCreateDTO.java          # User creation DTO
│   ├── UserResponseDTO.java        # User response DTO
│   ├── UserUpdateDTO.java          # User update DTO
│   └── DonationCenterDTO.java      # Donation center DTO
├── usecase/
│   ├── CreateUserUseCase.java      # Create user use case
│   ├── FindUserUseCase.java        # Find user use case
│   └── UpdateUserUseCase.java      # Update user use case
└── service/
    ├── UserService.java            # User application service
    └── DonationCenterService.java  # Donation center application service
```

### Infrastructure Layer

Contains external implementations:

```bash
infrastructure/
├── controller/
│   ├── UserController.java         # User REST controller
│   └── DonationCenterController.java # Donation center REST controller
├── repository/
│   ├── impl/
│   │   ├── UserRepositoryImpl.java # JPA user repository
│   │   └── DonationCenterRepositoryImpl.java # JPA donation center repository
├── config/
│   ├── DatabaseConfig.java         # Database configuration
│   ├── SecurityConfig.java         # Security configuration
│   └── SwaggerConfig.java          # API documentation configuration
└── exception/
    ├── GlobalExceptionHandler.java # Global exception handler
    └── RestExceptionHandler.java   # REST exception handler
```

## Getting Started

### Prerequisites

- Java 21+
- Maven 3.6+
- **Docker Desktop** (required for PostgreSQL with PostGIS)
- PostgreSQL (optional if using Docker)

### Running the Application

#### Method 1: With Docker (Recommended)

This is the default and recommended approach. The application will automatically start PostgreSQL with PostGIS using Docker.

```bash
cd rede-vida-backEnd
mvn spring-boot:run
```

**What happens automatically:**
1. Maven starts PostgreSQL container using `docker-compose.yml`
2. Waits for database health check to pass
3. Runs database migrations if needed
4. Starts the Spring Boot application

**Requirements:**
- Docker Desktop must be running before executing the command
- Docker must have permission to bind to port 5432

#### Method 2: Without Docker (Manual Database Setup)

If you prefer to use a local PostgreSQL installation:

```bash
cd rede-vida-backEnd
mvn spring-boot:run "-Dskip.docker=true"
```

**Manual setup requirements:**
- PostgreSQL 16+ installed locally
- PostGIS 3.4+ extension installed
- Database named `geodb` created
- User `postgres` with password `postgres` (or configure in `.env`)

#### Method 3: Full Docker Environment

Run the complete stack with Docker Compose:

```bash
docker-compose up --build
```

This builds and runs both the database and application in containers.

### Docker Configuration

The project uses a sophisticated Docker configuration integrated with Maven:

#### Docker Compose Configuration

```yaml
# docker-compose.yml
services:
  postgis:
    image: postgis/postgis:16-3.4
    container_name: postgis_db
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "${POSTGRES_PORT}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5
```

#### Maven Docker Integration

The `pom.xml` includes the `dockerfile-maven-plugin` and `exec-maven-plugin` to:

1. Start PostgreSQL container automatically
2. Wait for database to be healthy
3. Run the application only when database is ready

```xml
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>exec-maven-plugin</artifactId>
    <executions>
        <execution>
            <id>start-database</id>
            <phase>prepare-package</phase>
            <goals>
                <goal>exec</goal>
            </goals>
            <configuration>
                <executable>docker-compose</executable>
                <arguments>
                    <argument>up</argument>
                    <argument>postgis</argument>
                    <argument>-d</argument>
                </arguments>
                <skip>${skip.docker}</skip>
            </configuration>
        </execution>
        <execution>
            <id>wait-for-database</id>
            <phase>prepare-package</phase>
            <goals>
                <goal>exec</goal>
            </goals>
            <configuration>
                <executable>docker</executable>
                <arguments>
                    <argument>exec</argument>
                    <argument>postgis_db</argument>
                    <argument>pg_isready</argument>
                    <argument>-U</argument>
                    <argument>${POSTGRES_USER}</argument>
                    <argument>-t</argument>
                    <argument>10</argument>
                </arguments>
                <skip>${skip.docker}</skip>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### API Documentation

The application includes OpenAPI 3.0 documentation with Swagger UI:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI Spec**: `http://localhost:8080/v3/api-docs`

The OpenAPI configuration is located in:
- `OpenApiConfig.java`: Main OpenAPI configuration
- Automatic endpoint discovery from controllers
- Request/response schema documentation

### Configuration

The application uses the following configuration files:

- `application.properties`: Main application configuration
- `application-dev.properties`: Development environment
- `application-prod.properties`: Production environment

### Environment Variables

```bash
# Database Configuration
POSTGRES_DB=geodb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432

# Spring Boot Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://postgis:5432/geodb
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
```

## Development Guidelines

### Code Style

We follow these coding standards:

- **Java Code Conventions**: Follow Oracle Java coding standards
- **Clean Code**: Principles from Robert C. Martin's Clean Code
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion

### Testing

#### Unit Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run tests with coverage
mvn jacoco:report
```

#### Integration Tests

```bash
# Run integration tests
mvn test -Pintegration-test
```

### API Documentation

The application uses Swagger/OpenAPI for API documentation:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI Spec**: `http://localhost:8080/v3/api-docs`

## Database Schema

### User Entity

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    blood_type VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Donation Center Entity

```sql
CREATE TABLE donation_centers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PostGIS spatial index
CREATE INDEX idx_donation_centers_location 
ON donation_centers USING GIST (ST_Point(longitude, latitude));
```

## Security

### Authentication & Authorization

Currently, the application uses basic authentication. Future implementations will include:

- JWT (JSON Web Tokens)
- OAuth 2.0
- Role-based access control

### Security Best Practices

- Input validation using Jakarta Bean Validation
- SQL injection prevention through JPA
- CORS configuration for cross-origin requests
- Password hashing with BCrypt

## Logging

The application uses SLF4J with Logback for logging:

```xml
<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <logger name="com.redeemvida.rv" level="INFO"/>
    
    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
    </root>
</configuration>
```

## Performance

### Database Optimization

- Connection pooling with HikariCP
- Spatial indexing for location queries
- Query optimization with JPA hints

### Caching

- Spring Cache abstraction
- Redis integration (planned)

### Monitoring

- Spring Boot Actuator endpoints
- Health checks
- Metrics collection

## Troubleshooting

### Common Issues

#### Docker Connection Issues

**Problem**: Maven fails to start PostgreSQL container

**Solution**:
1. Ensure Docker Desktop is running
2. Check if Docker has permission to bind to port 5432
3. Verify Docker daemon is responsive:

```bash
docker version
docker-compose version
```

#### Port Conflicts

**Problem**: Port 5432 is already in use

**Solution**:
1. Stop other PostgreSQL services
2. Or change the port in `.env` file:
```bash
POSTGRES_PORT=5433
```

#### Permission Issues

**Problem**: Docker permission denied errors

**Solution**:
1. On Windows: Run Docker Desktop as Administrator
2. On Linux/Mac: Add user to docker group:
```bash
sudo usermod -aG docker $USER
```

#### Database Connection Issues

**Problem**: Application cannot connect to database

**Solution**:
1. Check if PostgreSQL container is running:
```bash
docker ps | grep postgis
```

2. Check container logs:
```bash
docker logs postgis_db
```

3. Test database connection manually:
```bash
docker exec -it postgis_db psql -U postgres -d geodb -c "SELECT 1;"
```

#### Maven Build Issues

**Problem**: Maven build fails with Docker-related errors

**Solution**:
1. Skip Docker and use manual database setup:
```bash
mvn spring-boot:run "-Dskip.docker=true"
```

2. Or use full Docker environment:
```bash
docker-compose up --build
```

### Debug Mode

Run the application in debug mode to troubleshoot issues:

```bash
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"
```

### Health Checks

Monitor application and database health:

```bash
# Application health
curl http://localhost:8080/actuator/health

# Database health
curl http://localhost:8080/actuator/health/db
```

## Additional Resources

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostGIS Documentation](https://postgis.net/documentation/)

## Contributing

When contributing to the backend:

1. Follow the existing code style and architecture patterns
2. Write comprehensive tests for new features
3. Update API documentation for new endpoints
4. Ensure all tests pass before submitting PR

For detailed contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).
