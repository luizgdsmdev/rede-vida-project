# Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the Rede Vida Project in various environments, including development, staging, and production. It covers Docker deployment, cloud deployment, and infrastructure setup.

## Deployment Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │────│   Frontend      │────│   Backend       │
│   (Nginx/ALB)   │    │   (React/Vite)  │    │   (Spring Boot) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                      │
                                │                      │
                       ┌─────────────────┐    ┌─────────────────┐
                       │   CDN           │    │   Database      │
                       │   (Cloudflare)  │    │   (PostgreSQL)  │
                       └─────────────────┘    └─────────────────┘
```

### Environment Types

- **Development**: Local development with hot reload
- **Staging**: Pre-production testing environment
- **Production**: Live production environment

## Docker Deployment

### Prerequisites

- Docker Desktop 4.0+
- Docker Compose 2.0+
- At least 4GB RAM available

### Local Development

#### Quick Start (Recommended)

The project comes with a sophisticated Docker configuration integrated with Maven. This is the recommended approach for local development.

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

**What happens automatically:**
1. Maven starts PostgreSQL container using `docker-compose.yml`
2. Waits for database health check to pass
3. Runs database migrations if needed
4. Starts the Spring Boot application

#### Docker Requirements

**Important**: Docker Desktop must be running before starting the backend application. The Maven configuration will automatically:

1. Start PostgreSQL with PostGIS extension using Docker
2. Wait for the database to be healthy
3. Connect the application to the database

#### Alternative Setup (Manual Database)

If you prefer to use a local PostgreSQL installation:

```bash
# Start backend with Docker disabled
cd rede-vida-backEnd
mvn spring-boot:run "-Dskip.docker=true"

# Note: You must have PostgreSQL 16+ with PostGIS 3.4+ installed locally
```

#### Docker Compose Configuration

```yaml
# docker-compose.yml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgis/postgis:16-3.4
    container_name: redevida-postgres
    environment:
      POSTGRES_DB: geodb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_INITDB_ARGS: "--encoding=UTF-8"
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d
    networks:
      - redevida-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Backend Application
  backend:
    build:
      context: ./rede-vida-backEnd
      dockerfile: Dockerfile
    container_name: redevida-backend
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/geodb
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: postgres
      SPRING_PROFILES_ACTIVE: docker
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - redevida-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Frontend Application
  frontend:
    build:
      context: ./rede-vida-UI
      dockerfile: Dockerfile
    container_name: redevida-frontend
    ports:
      - "5173:5173"
    environment:
      VITE_API_URL: http://localhost:8080/api/v1
    depends_on:
      - backend
    networks:
      - redevida-network

  # Nginx Reverse Proxy (Optional)
  nginx:
    image: nginx:alpine
    container_name: redevida-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    networks:
      - redevida-network

volumes:
  postgres_data:

networks:
  redevida-network:
    driver: bridge
```

#### Backend Dockerfile

```dockerfile
# rede-vida-backEnd/Dockerfile
FROM openjdk:21-jdk-slim as builder

WORKDIR /app
COPY pom.xml .
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM openjdk:21-jre-slim

WORKDIR /app

# Create non-root user
RUN addgroup --system spring && adduser --system spring --ingroup spring

# Copy the built JAR
COPY --from=builder /app/target/*.jar app.jar

# Change ownership
RUN chown spring:app.jar app.jar

USER spring:spring

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### Frontend Dockerfile

```dockerfile
# rede-vida-UI/Dockerfile
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## Cloud Deployment

### AWS Deployment

#### Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ALB           │────│   ECS Fargate   │────│   RDS           │
│   (Application  │    │   (Backend)     │    │   (PostgreSQL)  │
│    Load Balancer)│    └─────────────────┘    └─────────────────┘
└─────────────────┘            │                      │
                                │                      │
                       ┌─────────────────┐    ┌─────────────────┐
                       │   S3            │    │   ElastiCache   │
                       │   (Frontend)    │    │   (Redis)       │
                       └─────────────────┘    └─────────────────┘
```

#### Infrastructure as Code (Terraform)

```hcl
# terraform/main.tf
provider "aws" {
  region = var.aws_region
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "redevida-vpc"
  }
}

# Subnets
resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true

  tags = {
    Name = "redevida-public-${count.index + 1}"
  }
}

resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "redevida-private-${count.index + 1}"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "redevida-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# RDS Instance
resource "aws_db_instance" "postgres" {
  identifier     = "redevida-postgres"
  engine         = "postgres"
  engine_version = "16.1"
  instance_class = "db.t3.micro"

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp2"
  storage_encrypted     = true

  db_name  = "geodb"
  username = var.db_username
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window    = "sun:04:00-sun:05:00"

  skip_final_snapshot = true

  tags = {
    Name = "redevida-postgres"
  }
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "redevida-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id

  enable_deletion_protection = false

  tags = {
    Name = "redevida-alb"
  }
}
```

#### ECS Task Definition

```json
{
  "family": "redevida-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::account:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "your-account.dkr.ecr.region.amazonaws.com/redevida-backend:latest",
      "portMappings": [
        {
          "containerPort": 8080,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "SPRING_PROFILES_ACTIVE",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "SPRING_DATASOURCE_PASSWORD",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:redevida/db-password"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/redevida-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:8080/actuator/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3
      }
    }
  ]
}
```

### Azure Deployment

#### Azure Container Instances

```yaml
# azure-container.yml
apiVersion: 2021-09-01
location: eastus
name: redevida-app
properties:
  containers:
  - name: backend
    properties:
      image: redevida/backend:latest
      resources:
        requests:
          cpu: 1.0
          memoryInGb: 1.5
      ports:
      - port: 8080
      environmentVariables:
      - name: SPRING_PROFILES_ACTIVE
        value: production
      - name: SPRING_DATASOURCE_URL
        secureValue: jdbc:postgresql://server.postgres.database.azure.com:5432/geodb
  - name: frontend
    properties:
      image: redevida/frontend:latest
      resources:
        requests:
          cpu: 0.5
          memoryInGb: 0.5
      ports:
      - port: 80
  osType: Linux
  restartPolicy: Always
  ipAddress:
    type: Public
    ports:
    - port: 80
    - port: 8080
    dnsNameLabel: redevida-app
tags: null
type: Microsoft.ContainerInstance/containerGroups
```

### Google Cloud Platform

#### Cloud Run Deployment

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/PROJECT-ID/redevida-backend

# Deploy to Cloud Run
gcloud run deploy redevida-backend \
  --image gcr.io/PROJECT-ID/redevida-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars SPRING_PROFILES_ACTIVE=production
```

## Environment Configuration

### Environment Variables

#### Development (.env.dev)

```bash
# Database Configuration
POSTGRES_DB=geodb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Spring Boot Configuration
SPRING_PROFILES_ACTIVE=dev
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/geodb
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres

# Application Configuration
APP_NAME=Rede Vida Project
APP_VERSION=1.0.0
APP_ENVIRONMENT=development

# Logging
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_REDEEMVIDA=DEBUG

# Frontend Configuration
VITE_API_URL=http://localhost:8080/api/v1
VITE_APP_NAME=Rede Vida Project
VITE_ENVIRONMENT=development
```

#### Staging (.env.staging)

```bash
# Database Configuration
POSTGRES_DB=geodb_staging
POSTGRES_USER=redevida_staging
POSTGRES_PASSWORD=${STAGING_DB_PASSWORD}
POSTGRES_HOST=staging-db.example.com
POSTGRES_PORT=5432

# Spring Boot Configuration
SPRING_PROFILES_ACTIVE=staging
SPRING_DATASOURCE_URL=jdbc:postgresql://staging-db.example.com:5432/geodb_staging
SPRING_DATASOURCE_USERNAME=redevida_staging
SPRING_DATASOURCE_PASSWORD=${STAGING_DB_PASSWORD}

# Application Configuration
APP_NAME=Rede Vida Project
APP_VERSION=1.0.0
APP_ENVIRONMENT=staging

# Logging
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_REDEEMVIDA=INFO

# Frontend Configuration
VITE_API_URL=https://api-staging.redevida.com/api/v1
VITE_APP_NAME=Rede Vida Project
VITE_ENVIRONMENT=staging
```

#### Production (.env.prod)

```bash
# Database Configuration
POSTGRES_DB=geodb
POSTGRES_USER=redevida_prod
POSTGRES_PASSWORD=${PROD_DB_PASSWORD}
POSTGRES_HOST=prod-db.example.com
POSTGRES_PORT=5432

# Spring Boot Configuration
SPRING_PROFILES_ACTIVE=production
SPRING_DATASOURCE_URL=jdbc:postgresql://prod-db.example.com:5432/geodb
SPRING_DATASOURCE_USERNAME=redevida_prod
SPRING_DATASOURCE_PASSWORD=${PROD_DB_PASSWORD}

# Application Configuration
APP_NAME=Rede Vida Project
APP_VERSION=1.0.0
APP_ENVIRONMENT=production

# Logging
LOGGING_LEVEL_ROOT=WARN
LOGGING_LEVEL_COM_REDEEMVIDA=INFO

# Frontend Configuration
VITE_API_URL=https://api.redevida.com/api/v1
VITE_APP_NAME=Rede Vida Project
VITE_ENVIRONMENT=production
```

## Security Configuration

### SSL/TLS Configuration

#### Nginx SSL Configuration

```nginx
# nginx/nginx.conf
server {
    listen 443 ssl http2;
    server_name redevida.com www.redevida.com;

    ssl_certificate /etc/nginx/ssl/redevida.com.crt;
    ssl_certificate_key /etc/nginx/ssl/redevida.com.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        proxy_pass http://frontend:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name redevida.com www.redevida.com;
    return 301 https://$server_name$request_uri;
}
```

### Firewall Configuration

```bash
# UFW Configuration
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw deny 5432/tcp  # PostgreSQL (internal only)
sudo ufw enable
```

## Monitoring and Logging

### Application Monitoring

#### Spring Boot Actuator

```properties
# application.properties
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.endpoint.health.show-details=when-authorized
management.metrics.export.prometheus.enabled=true
management.info.env.enabled=true
```

#### Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'redevida-backend'
    static_configs:
      - targets: ['backend:8080']
    metrics_path: '/actuator/prometheus'
    scrape_interval: 30s

  - job_name: 'nginx'
    static_configs:
      - targets: ['nginx:9113']
```

### Log Aggregation

#### ELK Stack Configuration

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    ports:
      - "5044:5044"
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    ports:
      - "5601:5601"
    environment:
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200
    depends_on:
      - elasticsearch

volumes:
  elasticsearch_data:
```

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up JDK 21
        uses: actions/setup-java@v3
        with:
          java-version: '21'
          distribution: 'temurin'
      
      - name: Run backend tests
        run: |
          cd rede-vida-backEnd
          ./mvnw test
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Run frontend tests
        run: |
          cd rede-vida-UI
          npm ci
          npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build backend Docker image
        run: |
          docker build -t redevida-backend ./rede-vida-backEnd
          docker tag redevida-backend:latest ${{ secrets.REGISTRY_URL }}/redevida-backend:${{ github.sha }}
      
      - name: Build frontend Docker image
        run: |
          docker build -t redevida-frontend ./rede-vida-UI
          docker tag redevida-frontend:latest ${{ secrets.REGISTRY_URL }}/redevida-frontend:${{ github.sha }}
      
      - name: Push to registry
        run: |
          echo ${{ secrets.REGISTRY_PASSWORD }} | docker login ${{ secrets.REGISTRY_URL }} -u ${{ secrets.REGISTRY_USERNAME }} --password-stdin
          docker push ${{ secrets.REGISTRY_URL }}/redevida-backend:${{ github.sha }}
          docker push ${{ secrets.REGISTRY_URL }}/redevida-frontend:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          # Update ECS service or Kubernetes deployment
          echo "Deploying to production..."
```

## Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Check database connectivity
docker exec -it redevida-postgres psql -U postgres -d geodb -c "SELECT 1;"

# Check connection logs
docker logs redevida-backend | grep -i "connection"
```

#### Memory Issues

```bash
# Check container resource usage
docker stats

# Check JVM memory usage
docker exec redevida-backend jstat -gc $(docker exec redevida-backend jps | grep -v Jps | awk '{print $1}')
```

#### Network Issues

```bash
# Check container networking
docker network ls
docker network inspect redevida-project_redevida-network

# Test connectivity between containers
docker exec redevida-backend ping postgres
```

### Health Checks

```bash
# Check application health
curl -f http://localhost:8080/actuator/health

# Check database health
curl -f http://localhost:8080/actuator/health/db

# Check all health endpoints
curl -f http://localhost:8080/actuator/health
```

## Best Practices

### Deployment Best Practices

1. **Use environment-specific configurations**
2. **Implement proper health checks**
3. **Use secrets management for sensitive data**
4. **Implement proper logging and monitoring**
5. **Use infrastructure as code (IaC)**
6. **Implement automated testing in CI/CD**
7. **Use blue-green or canary deployments**
8. **Implement proper backup strategies**

### Security Best Practices

1. **Use HTTPS everywhere**
2. **Implement proper authentication and authorization**
3. **Use secrets management**
4. **Implement proper network segmentation**
5. **Regular security updates**
6. **Implement proper logging for security events**
7. **Use security scanning in CI/CD**

### Performance Best Practices

1. **Use proper caching strategies**
2. **Implement database connection pooling**
3. **Use CDN for static assets**
4. **Implement proper load balancing**
5. **Monitor performance metrics**
6. **Use auto-scaling when possible**

## Support

For deployment support and questions:

- **Documentation**: [Deployment Guide](./DEPLOYMENT.md)
- **Issues**: [GitHub Issues](../../issues)
- **Email**: ops@redevida.com

---

**Note**: This deployment guide is continuously updated. Check back regularly for the latest deployment procedures and best practices.
