# API Documentation

## Overview

The Rede Vida Project REST API provides endpoints for managing users, donation centers, and blood donation operations. This document describes all available endpoints, request/response formats, authentication methods, and usage examples.

## Base URL

```
Development: http://localhost:8080/api/v1
Production: https://api.redevida.com/api/v1
```

## Authentication

Currently, the API uses basic authentication. Future implementations will include JWT and OAuth 2.0.

### Basic Authentication

```bash
# Using curl
curl -u username:password http://localhost:8080/api/v1/users

# Using headers
curl -H "Authorization: Basic $(echo -n 'username:password' | base64)" http://localhost:8080/api/v1/users
```

## API Endpoints

### Users API

#### Get All Users

Retrieve a list of all users.

```http
GET /api/v1/users
```

**Response:**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "bloodType": "O+",
    "createdAt": "2024-03-16T10:30:00Z",
    "updatedAt": "2024-03-16T10:30:00Z"
  }
]
```

**Status Codes:**
- `200 OK`: Users retrieved successfully
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions

---

#### Get User by ID

Retrieve a specific user by their UUID.

```http
GET /api/v1/users/{id}
```

**Path Parameters:**
- `id` (UUID): The user's unique identifier

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "bloodType": "O+",
  "createdAt": "2024-03-16T10:30:00Z",
  "updatedAt": "2024-03-16T10:30:00Z"
}
```

**Status Codes:**
- `200 OK`: User retrieved successfully
- `404 Not Found`: User not found
- `400 Bad Request`: Invalid ID format

---

#### Get User by Email

Retrieve a specific user by their email address.

```http
GET /api/v1/users/email/{email}
```

**Path Parameters:**
- `email` (String): The user's email address

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "bloodType": "O+",
  "createdAt": "2024-03-16T10:30:00Z",
  "updatedAt": "2024-03-16T10:30:00Z"
}
```

**Status Codes:**
- `200 OK`: User retrieved successfully
- `404 Not Found`: User not found
- `400 Bad Request`: Invalid email format

---

#### Create User

Create a new user account.

```http
POST /api/v1/users
```

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1234567890",
  "bloodType": "A+"
}
```

**Request Validation:**
- `name`: Required, max 255 characters
- `email`: Required, valid email format, unique
- `phone`: Optional, max 20 characters
- `bloodType`: Optional, valid blood type (A+, A-, B+, B-, O+, O-, AB+, AB-)

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1234567890",
  "bloodType": "A+",
  "createdAt": "2024-03-16T11:00:00Z",
  "updatedAt": "2024-03-16T11:00:00Z"
}
```

**Status Codes:**
- `201 Created`: User created successfully
- `400 Bad Request`: Invalid input data
- `409 Conflict`: Email already exists

---

#### Update User

Update an existing user's information.

```http
PUT /api/v1/users/{id}
```

**Path Parameters:**
- `id` (UUID): The user's unique identifier

**Request Body:**

```json
{
  "name": "Jane Smith Updated",
  "phone": "+1234567891",
  "bloodType": "A-"
}
```

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Jane Smith Updated",
  "email": "jane.smith@example.com",
  "phone": "+1234567891",
  "bloodType": "A-",
  "createdAt": "2024-03-16T11:00:00Z",
  "updatedAt": "2024-03-16T12:00:00Z"
}
```

**Status Codes:**
- `200 OK`: User updated successfully
- `404 Not Found`: User not found
- `400 Bad Request`: Invalid input data

---

#### Delete User

Delete a user account.

```http
DELETE /api/v1/users/{id}
```

**Path Parameters:**
- `id` (UUID): The user's unique identifier

**Response:**
Empty response body

**Status Codes:**
- `204 No Content`: User deleted successfully
- `404 Not Found`: User not found

---

### Donation Centers API

#### Get All Donation Centers

Retrieve a list of all donation centers.

```http
GET /api/v1/centers
```

**Response:**

```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Central Blood Bank",
    "address": "123 Main St, City, State",
    "latitude": -23.5505,
    "longitude": -46.6333,
    "phone": "+1234567890",
    "email": "central@bloodbank.com",
    "createdAt": "2024-03-16T10:30:00Z",
    "updatedAt": "2024-03-16T10:30:00Z"
  }
]
```

**Status Codes:**
- `200 OK`: Centers retrieved successfully

---

#### Get Nearest Donation Centers

Find donation centers near a specific location.

```http
GET /api/v1/centers/nearest?lat={latitude}&lng={longitude}&radius={radius}
```

**Query Parameters:**
- `lat` (Decimal): Latitude (required)
- `lng` (Decimal): Longitude (required)
- `radius` (Integer): Search radius in kilometers (optional, default: 10)

**Example Request:**

```bash
GET /api/v1/centers/nearest?lat=-23.5505&lng=-46.6333&radius=5
```

**Response:**

```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Central Blood Bank",
    "address": "123 Main St, City, State",
    "latitude": -23.5505,
    "longitude": -46.6333,
    "phone": "+1234567890",
    "email": "central@bloodbank.com",
    "distance": 2.5,
    "createdAt": "2024-03-16T10:30:00Z",
    "updatedAt": "2024-03-16T10:30:00Z"
  }
]
```

**Status Codes:**
- `200 OK`: Centers retrieved successfully
- `400 Bad Request`: Invalid coordinates

---

## Response Formats

### Success Response

All successful responses follow this structure:

```json
{
  "data": {
    // Response data
  },
  "timestamp": "2024-03-16T12:00:00Z"
}
```

### Error Response

Error responses follow this structure:

```json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User with specified ID not found",
    "details": "User ID '550e8400-e29b-41d4-a716-446655440000' does not exist"
  },
  "timestamp": "2024-03-16T12:00:00Z"
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `USER_NOT_FOUND` | 404 | User not found |
| `CENTER_NOT_FOUND` | 404 | Donation center not found |
| `INVALID_INPUT` | 400 | Invalid input data |
| `EMAIL_EXISTS` | 409 | Email already exists |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `INTERNAL_ERROR` | 500 | Internal server error |

## Usage Examples

### Using curl

```bash
# Get all users
curl -X GET "http://localhost:8080/api/v1/users" \
  -H "Authorization: Basic $(echo -n 'admin:password' | base64)"

# Create a new user
curl -X POST "http://localhost:8080/api/v1/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic $(echo -n 'admin:password' | base64)" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "bloodType": "O+"
  }'

# Find nearest centers
curl -X GET "http://localhost:8080/api/v1/centers/nearest?lat=-23.5505&lng=-46.6333" \
  -H "Authorization: Basic $(echo -n 'admin:password' | base64)"
```

### Using JavaScript/TypeScript

```javascript
// API client class
class RedeVidaAPI {
  constructor(baseURL, username, password) {
    this.baseURL = baseURL;
    this.auth = btoa(`${username}:${password}`);
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${this.auth}`,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API request failed');
    }

    return response.json();
  }

  // User methods
  async getUsers() {
    return this.request('/users');
  }

  async getUserById(id) {
    return this.request(`/users/${id}`);
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Donation center methods
  async getCenters() {
    return this.request('/centers');
  }

  async getNearestCenters(lat, lng, radius = 10) {
    return this.request(`/centers/nearest?lat=${lat}&lng=${lng}&radius=${radius}`);
  }
}

// Usage example
const api = new RedeVidaAPI('http://localhost:8080/api/v1', 'admin', 'password');

// Get all users
api.getUsers()
  .then(users => console.log('Users:', users))
  .catch(error => console.error('Error:', error));

// Create a new user
api.createUser({
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  phone: '+1234567890',
  bloodType: 'A+'
})
  .then(user => console.log('Created user:', user))
  .catch(error => console.error('Error:', error));

// Find nearest centers
api.getNearestCenters(-23.5505, -46.6333, 5)
  .then(centers => console.log('Nearest centers:', centers))
  .catch(error => console.error('Error:', error));
```

### Using Python

```python
import requests
from base64 import b64encode

class RedeVidaAPI:
    def __init__(self, base_url, username, password):
        self.base_url = base_url
        self.auth = b64encode(f"{username}:{password}".encode()).decode()
        self.headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Basic {self.auth}'
        }

    def request(self, endpoint, method='GET', data=None):
        url = f"{self.base_url}{endpoint}"
        
        if method == 'GET':
            response = requests.get(url, headers=self.headers)
        elif method == 'POST':
            response = requests.post(url, headers=self.headers, json=data)
        elif method == 'PUT':
            response = requests.put(url, headers=self.headers, json=data)
        elif method == 'DELETE':
            response = requests.delete(url, headers=self.headers)
        
        response.raise_for_status()
        return response.json()

    # User methods
    def get_users(self):
        return self.request('/users')

    def get_user_by_id(self, user_id):
        return self.request(f'/users/{user_id}')

    def create_user(self, user_data):
        return self.request('/users', 'POST', user_data)

    def update_user(self, user_id, user_data):
        return self.request(f'/users/{user_id}', 'PUT', user_data)

    def delete_user(self, user_id):
        return self.request(f'/users/{user_id}', 'DELETE')

    # Donation center methods
    def get_centers(self):
        return self.request('/centers')

    def get_nearest_centers(self, lat, lng, radius=10):
        return self.request(f'/centers/nearest?lat={lat}&lng={lng}&radius={radius}')

# Usage example
api = RedeVidaAPI('http://localhost:8080/api/v1', 'admin', 'password')

# Get all users
users = api.get_users()
print('Users:', users)

# Create a new user
new_user = api.create_user({
    'name': 'Jane Smith',
    'email': 'jane.smith@example.com',
    'phone': '+1234567890',
    'bloodType': 'A+'
})
print('Created user:', new_user)

# Find nearest centers
centers = api.get_nearest_centers(-23.5505, -46.6333, 5)
print('Nearest centers:', centers)
```

## Data Models

### User Model

```json
{
  "id": "UUID",
  "name": "String (max 255 chars)",
  "email": "String (valid email, unique)",
  "phone": "String (optional, max 20 chars)",
  "bloodType": "String (optional, valid blood types)",
  "createdAt": "ISO 8601 DateTime",
  "updatedAt": "ISO 8601 DateTime"
}
```

### Donation Center Model

```json
{
  "id": "UUID",
  "name": "String (max 255 chars)",
  "address": "String (max 500 chars)",
  "latitude": "Decimal (-90 to 90)",
  "longitude": "Decimal (-180 to 180)",
  "phone": "String (optional, max 20 chars)",
  "email": "String (optional, valid email)",
  "createdAt": "ISO 8601 DateTime",
  "updatedAt": "ISO 8601 DateTime"
}
```

## Pagination

For endpoints that return lists, pagination is supported:

```http
GET /api/v1/users?page=0&size=10&sort=name,asc
```

**Query Parameters:**
- `page` (Integer): Page number (default: 0)
- `size` (Integer): Page size (default: 10, max: 100)
- `sort` (String): Sort field and direction (format: field,direction)

**Response:**

```json
{
  "content": [
    // Array of items
  ],
  "pageable": {
    "page": 0,
    "size": 10,
    "sort": "name,asc"
  },
  "totalElements": 100,
  "totalPages": 10,
  "first": true,
  "last": false
}
```

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Anonymous requests**: 100 requests per hour
- **Authenticated requests**: 1000 requests per hour

Rate limit headers are included in responses:

```http
X-Rate-Limit-Limit: 1000
X-Rate-Limit-Remaining: 999
X-Rate-Limit-Reset: 1647427200
```

## SDKs and Libraries

### Official SDKs

- **JavaScript/TypeScript**: `npm install @redevida/api-client`
- **Python**: `pip install redevida-api`
- **Java**: `implementation 'com.redevida:api-client'`

### Third-Party Libraries

- **Postman Collection**: Available for import
- **OpenAPI Specification**: Available for code generation

## Versioning

The API uses semantic versioning:

- **Current version**: v1
- **Version format**: `/api/v{major}`
- **Backward compatibility**: Maintained within major versions

## Support

For API support and questions:

- **Documentation**: [API Documentation](./API.md)
- **Issues**: [GitHub Issues](../../issues)
- **Email**: api-support@redevida.com

## Testing

### Test Environment

```bash
# Test base URL
https://api-test.redevida.com/api/v1
```

### Test Credentials

```bash
# Test user
Username: testuser
Password: testpass123
```

### Test Data

The test environment is populated with sample data for testing purposes. All data is reset daily.

## Changelog

### v1.0.0 (2024-03-16)
- Initial API release
- User management endpoints
- Donation center endpoints
- Geospatial search functionality

---

**Note**: This API documentation is continuously updated. Check back regularly for the latest changes and improvements.
