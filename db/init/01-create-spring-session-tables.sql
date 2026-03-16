-- Spring Session JDBC tables for PostgreSQL
-- This script creates the necessary tables for Spring Session management

-- Create spring_session table
CREATE TABLE IF NOT EXISTS spring_session (
    PRIMARY_KEY CHAR(36) NOT NULL,
    SESSION_ID CHAR(36) NOT NULL,
    CREATION_TIME BIGINT NOT NULL,
    LAST_ACCESS_TIME BIGINT NOT NULL,
    MAX_INACTIVE_INTERVAL INT NOT NULL,
    EXPIRY_TIME BIGINT NOT NULL,
    PRINCIPAL_NAME VARCHAR(100),
    CONSTRAINT SPRING_SESSION_PK PRIMARY KEY (PRIMARY_KEY)
);

-- Add unique constraint on session_id
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'spring_session_session_id_unique'
    ) THEN
        ALTER TABLE spring_session ADD CONSTRAINT spring_session_session_id_unique UNIQUE (session_id);
    END IF;
END
$$;

-- Create spring_session_attributes table
CREATE TABLE IF NOT EXISTS spring_session_attributes (
    PRIMARY_KEY CHAR(36) NOT NULL,
    SESSION_ID CHAR(36) NOT NULL,
    ATTRIBUTE_NAME VARCHAR(200) NOT NULL,
    ATTRIBUTE_BYTES BYTEA,
    CONSTRAINT SPRING_SESSION_ATTRIBUTES_PK PRIMARY KEY (PRIMARY_KEY),
    CONSTRAINT SPRING_SESSION_ATTRIBUTES_FK FOREIGN KEY (SESSION_ID) REFERENCES spring_session(SESSION_ID) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS spring_session_ix1 ON spring_session(EXPIRY_TIME);
CREATE INDEX IF NOT EXISTS spring_session_ix2 ON spring_session(SESSION_ID);
CREATE INDEX IF NOT EXISTS spring_session_attributes_ix1 ON spring_session_attributes(SESSION_ID);
