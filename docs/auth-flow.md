# Authentication Flow

## Registration Endpoint
**POST /api/auth/register**

### Request Body
```json
{
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "firstName": "string",
  "lastName": "string"
}
```

### Response
```json
{
  "token": "string",
  "email": "string",
  "role": "USER" | "ADMIN",
  "firstName": "string",
  "lastName": "string"
}
```

## Login Endpoint
**POST /api/auth/login**

### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

### Response
Same structure as registration response

## Frontend Implementation Guidelines

### JWT Token Handling
- Store JWT token (response.token) in localStorage or secure cookie
- Include token in Authorization header for all requests:
```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Protected Routes
- All endpoints except login/register require JWT token
- 401 Unauthorized response triggers redirect to login page
- Backend validates token on all protected routes

### User Information
Successful authentication provides:
- User's email
- User's role (USER/ADMIN)
- User's first and last name
- JWT token

### Error Handling

#### Registration Errors
- Email already exists
- Password mismatch
- Invalid email format
- Password length requirements (8-100 chars)

#### Login Errors
- Invalid credentials

## Example Authentication Service

```typescript
class AuthService {
  static async login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) throw new Error('Invalid credentials');
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  }

  static getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  static isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
```