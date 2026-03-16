# Database Documentation

## Overview

The Rede Vida Project uses PostgreSQL 16 with PostGIS 3.4 for spatial data management. This document describes the database schema, configuration, migrations, and best practices for database operations.

## Database Architecture

### Technology Stack

- **PostgreSQL 16**: Primary relational database
- **PostGIS 3.4**: Spatial extension for geographic data
- **HikariCP**: Connection pooling
- **Flyway**: Database migration management

### Database Design Principles

- **Normalization**: Follow 3NF principles
- **Spatial Optimization**: Efficient geospatial queries
- **Indexing Strategy**: Optimize for common query patterns
- **Data Integrity**: Constraints and validation rules

## Database Schema

### Core Tables

#### Users Table

Stores user information and blood donation details.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    blood_type VARCHAR(10) CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')),
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'Brazil',
    is_active BOOLEAN DEFAULT true,
    is_donor BOOLEAN DEFAULT false,
    last_donation_date DATE,
    total_donations INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_blood_type ON users(blood_type);
CREATE INDEX idx_users_is_donor ON users(is_donor);
CREATE INDEX idx_users_city ON users(city);
CREATE INDEX idx_users_state ON users(state);
CREATE INDEX idx_users_created_at ON users(created_at);
```

#### Donation Centers Table

Stores donation center information with geographic coordinates.

```sql
CREATE TABLE donation_centers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'Brazil',
    latitude DECIMAL(10, 8) NOT NULL CHECK (latitude >= -90 AND latitude <= 90),
    longitude DECIMAL(11, 8) NOT NULL CHECK (longitude >= -180 AND longitude <= 180),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(500),
    operating_hours JSONB,
    services JSONB,
    capacity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PostGIS spatial index
CREATE EXTENSION IF NOT EXISTS postgis;

-- Add geometry column for spatial queries
ALTER TABLE donation_centers 
ADD COLUMN geom geometry(Point, 4326);

-- Populate geometry column
UPDATE donation_centers 
SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);

-- Create spatial index
CREATE INDEX idx_donation_centers_geom 
ON donation_centers USING GIST (geom);

-- Additional indexes
CREATE INDEX idx_donation_centers_city ON donation_centers(city);
CREATE INDEX idx_donation_centers_state ON donation_centers(state);
CREATE INDEX idx_donation_centers_is_active ON donation_centers(is_active);
```

#### Donations Table

Tracks blood donation records.

```sql
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    center_id UUID NOT NULL REFERENCES donation_centers(id) ON DELETE RESTRICT,
    donation_date DATE NOT NULL,
    donation_type VARCHAR(50) NOT NULL CHECK (donation_type IN ('WHOLE_BLOOD', 'PLATELETS', 'PLASMA', 'RED_CELLS')),
    blood_type VARCHAR(10) NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')),
    volume_ml INTEGER CHECK (volume_ml > 0 AND volume_ml <= 500),
    status VARCHAR(20) DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_donations_user_id ON donations(user_id);
CREATE INDEX idx_donations_center_id ON donations(center_id);
CREATE INDEX idx_donations_date ON donations(donation_date);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_blood_type ON donations(blood_type);
```

#### Appointments Table

Manages donation appointments.

```sql
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    center_id UUID NOT NULL REFERENCES donation_centers(id) ON DELETE RESTRICT,
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    donation_type VARCHAR(50) NOT NULL CHECK (donation_type IN ('WHOLE_BLOOD', 'PLATELETS', 'PLASMA', 'RED_CELLS')),
    status VARCHAR(20) DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW')),
    reminder_sent BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_center_id ON appointments(center_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
```

#### Blood Inventory Table

Tracks blood supply levels at each center.

```sql
CREATE TABLE blood_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    center_id UUID NOT NULL REFERENCES donation_centers(id) ON DELETE CASCADE,
    blood_type VARCHAR(10) NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')),
    product_type VARCHAR(50) NOT NULL CHECK (product_type IN ('WHOLE_BLOOD', 'PLATELETS', 'PLASMA', 'RED_CELLS')),
    units_available INTEGER NOT NULL DEFAULT 0 CHECK (units_available >= 0),
    min_required INTEGER DEFAULT 10 CHECK (min_required >= 0),
    max_capacity INTEGER DEFAULT 100 CHECK (max_capacity > 0),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(center_id, blood_type, product_type)
);

-- Indexes
CREATE INDEX idx_blood_inventory_center_id ON blood_inventory(center_id);
CREATE INDEX idx_blood_inventory_blood_type ON blood_inventory(blood_type);
CREATE INDEX idx_blood_inventory_product_type ON blood_inventory(product_type);
```

### Audit Tables

#### Users Audit Table

```sql
CREATE TABLE users_audit (
    audit_id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    operation VARCHAR(10) NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
    old_data JSONB,
    new_data JSONB,
    changed_by VARCHAR(255),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_audit_user_id ON users_audit(user_id);
CREATE INDEX idx_users_audit_operation ON users_audit(operation);
CREATE INDEX idx_users_audit_changed_at ON users_audit(changed_at);
```

## Configuration

### Database Connection

```properties
# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/geodb
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# Connection Pool Configuration
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=300000
spring.datasource.hikari.max-lifetime=1200000
spring.datasource.hikari.connection-timeout=20000

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
```

### PostGIS Configuration

```sql
-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Verify installation
SELECT PostGIS_Full_Version();
```

## Database Migrations

### Migration Structure

```
db/
├── migration/
│   ├── V1__Create_users_table.sql
│   ├── V2__Create_donation_centers_table.sql
│   ├── V3__Add_postgis_extension.sql
│   ├── V4__Create_donations_table.sql
│   ├── V5__Create_appointments_table.sql
│   ├── V6__Create_blood_inventory_table.sql
│   └── V7__Add_audit_tables.sql
└── seed/
    ├── users_seed_data.sql
    ├── donation_centers_seed_data.sql
    └── blood_inventory_seed_data.sql
```

### Sample Migration Files

#### V1__Create_users_table.sql

```sql
-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    blood_type VARCHAR(10) CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')),
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'Brazil',
    is_active BOOLEAN DEFAULT true,
    is_donor BOOLEAN DEFAULT false,
    last_donation_date DATE,
    total_donations INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_blood_type ON users(blood_type);
CREATE INDEX idx_users_is_donor ON users(is_donor);
```

#### V3__Add_postgis_extension.sql

```sql
-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Add geometry column to donation_centers
ALTER TABLE donation_centers 
ADD COLUMN geom geometry(Point, 4326);

-- Create spatial index
CREATE INDEX idx_donation_centers_geom 
ON donation_centers USING GIST (geom);
```

## Performance Optimization

### Query Optimization

#### Spatial Queries

```sql
-- Find nearest centers (optimized)
SELECT 
    id, 
    name, 
    address, 
    city, 
    state,
    phone,
    email,
    latitude,
    longitude,
    ST_Distance(geom, ST_SetSRID(ST_MakePoint(-46.6333, -23.5505), 4326)) as distance
FROM donation_centers 
WHERE ST_DWithin(
    geom, 
    ST_SetSRID(ST_MakePoint(-46.6333, -23.5505), 4326), 
    10000  -- 10km in meters
)
ORDER BY distance
LIMIT 10;
```

#### Blood Type Availability

```sql
-- Find centers with specific blood type availability
SELECT 
    dc.id,
    dc.name,
    dc.address,
    dc.city,
    dc.state,
    bi.blood_type,
    bi.product_type,
    bi.units_available,
    bi.min_required
FROM donation_centers dc
JOIN blood_inventory bi ON dc.id = bi.center_id
WHERE bi.blood_type = 'O+'
AND bi.product_type = 'WHOLE_BLOOD'
AND bi.units_available > bi.min_required
ORDER BY bi.units_available DESC;
```

### Index Strategy

#### Composite Indexes

```sql
-- Composite index for user searches
CREATE INDEX idx_users_city_blood_type ON users(city, blood_type) 
WHERE is_donor = true;

-- Composite index for appointment searches
CREATE INDEX idx_appointments_center_date_status ON appointments(center_id, appointment_date, status);

-- Composite index for donation analytics
CREATE INDEX idx_donations_center_date_blood_type ON donations(center_id, donation_date, blood_type);
```

#### Partial Indexes

```sql
-- Index only active donors
CREATE INDEX idx_users_active_donors ON users(city, blood_type) 
WHERE is_donor = true AND is_active = true;

-- Index only recent donations
CREATE INDEX idx_donations_recent ON donations(user_id, donation_date) 
WHERE donation_date >= CURRENT_DATE - INTERVAL '1 year';
```

## Security

### Data Encryption

```sql
-- Enable pgcrypto extension for data encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Example of encrypting sensitive data
CREATE TABLE encrypted_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email_encrypted BYTEA NOT NULL,
    phone_encrypted BYTEA,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Encryption functions
CREATE OR REPLACE FUNCTION encrypt_email(email TEXT) RETURNS BYTEA AS $$
BEGIN
    RETURN pgp_sym_encrypt(email, 'encryption_key');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrypt_email(email_encrypted BYTEA) RETURNS TEXT AS $$
BEGIN
    RETURN pgp_sym_decrypt(email_encrypted, 'encryption_key');
END;
$$ LANGUAGE plpgsql;
```

### Row Level Security

```sql
-- Enable row level security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for user access
CREATE POLICY user_access_policy ON users
    FOR ALL
    TO authenticated_role
    USING (id = current_setting('app.current_user_id')::UUID);

-- Create policy for center access
ALTER TABLE donation_centers ENABLE ROW LEVEL SECURITY;

CREATE POLICY center_access_policy ON donation_centers
    FOR SELECT
    TO public
    USING (is_active = true);
```

## Backup and Recovery

### Backup Strategy

#### Full Backup

```bash
# Full database backup
pg_dump -h localhost -U postgres -d geodb -f backup_full_$(date +%Y%m%d_%H%M%S).sql

# Compressed backup
pg_dump -h localhost -U postgres -d geodb | gzip > backup_full_$(date +%Y%m%d_%H%M%S).sql.gz
```

#### Incremental Backup

```bash
# WAL archive for point-in-time recovery
archive_command = 'cp %p /backup/wal_archive/%f'
```

#### Automated Backup Script

```bash
#!/bin/bash
# backup_database.sh

DB_NAME="geodb"
DB_USER="postgres"
DB_HOST="localhost"
BACKUP_DIR="/backup/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Full backup
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME | gzip > $BACKUP_DIR/backup_full_$DATE.sql.gz

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_full_*.sql.gz" -mtime +7 -delete

echo "Backup completed: backup_full_$DATE.sql.gz"
```

### Recovery Procedures

#### Restore from Backup

```bash
# Restore from compressed backup
gunzip -c backup_full_20240316_120000.sql.gz | psql -h localhost -U postgres -d geodb

# Restore to new database
createdb geodb_restore
gunzip -c backup_full_20240316_120000.sql.gz | psql -h localhost -U postgres -d geodb_restore
```

#### Point-in-Time Recovery

```bash
# Initialize recovery
pg_ctl start -D /var/lib/postgresql/data -c recovery_target_time="2024-03-16 12:00:00"
```

## Monitoring and Maintenance

### Performance Monitoring

```sql
-- Query performance analysis
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

### Maintenance Tasks

#### Vacuum and Analyze

```sql
-- Vacuum and analyze tables
VACUUM ANALYZE users;
VACUUM ANALYZE donation_centers;
VACUUM ANALYZE donations;

-- Auto-vacuum configuration
ALTER TABLE users SET (
    autovacuum_vacuum_scale_factor = 0.1,
    autovacuum_analyze_scale_factor = 0.05
);
```

#### Reindexing

```sql
-- Reindex fragmented indexes
REINDEX INDEX CONCURRENTLY idx_users_email;
REINDEX INDEX CONCURRENTLY idx_donation_centers_geom;
```

## Testing

### Test Database Setup

```sql
-- Create test database
CREATE DATABASE geodb_test OWNER postgres;

-- Clone structure
CREATE DATABASE geodb_test TEMPLATE geodb;
```

### Test Data Generation

```sql
-- Generate test users
INSERT INTO users (name, email, blood_type, city, state)
SELECT 
    'Test User ' || generate_series,
    'testuser' || generate_series || '@example.com',
    (ARRAY['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])[floor(random() * 8) + 1],
    (ARRAY['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'])[floor(random() * 3) + 1],
    (ARRAY['SP', 'RJ', 'MG'])[floor(random() * 3) + 1]
FROM generate_series(1, 1000);
```

## Best Practices

### Database Design

1. **Use appropriate data types** for each column
2. **Implement proper constraints** for data integrity
3. **Create indexes** based on query patterns
4. **Normalize** to 3NF but consider denormalization for performance
5. **Use UUID** for primary keys in distributed systems

### Query Optimization

1. **Use EXPLAIN ANALYZE** to understand query plans
2. **Avoid SELECT *** in production code
3. **Use prepared statements** for repeated queries
4. **Implement proper pagination** for large result sets
5. **Use appropriate isolation levels** for transactions

### Security

1. **Use parameterized queries** to prevent SQL injection
2. **Implement principle of least privilege** for database users
3. **Encrypt sensitive data** at rest
4. **Enable row-level security** where appropriate
5. **Regular security audits** and vulnerability assessments

## Troubleshooting

### Common Issues

#### Connection Issues

```bash
# Check PostgreSQL status
pg_isready -h localhost -p 5432

# Check connection limits
SELECT 
    datname,
    numbackends,
    xact_commit,
    xact_rollback
FROM pg_stat_database;
```

#### Performance Issues

```sql
-- Check long-running queries
SELECT 
    pid,
    now() - pg_stat_activity.query_start AS duration,
    query,
    state
FROM pg_stat_activity
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';

-- Check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

#### Disk Space Issues

```bash
# Check database size
psql -h localhost -U postgres -d geodb -c "SELECT pg_size_pretty(pg_database_size('geodb'));"

# Check table sizes
psql -h localhost -U postgres -d geodb -c "
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(tablename) DESC;
"
```

##  Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostGIS Documentation](https://postgis.net/documentation/)
- [Database Performance Tuning Guide](https://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Best_Practices)

---

**Note**: This database documentation is continuously updated. Check back regularly for the latest schema changes and optimizations.
