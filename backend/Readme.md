# Authenticator App API Documentation

This document provides an overview of all the API routes available in the Authenticator App backend.

---

## Base URL

**http://localhost:5000**


---

## Authentication Routes

### 1. **Check Authentication**
**Endpoint:** `/auth/check-auth`  
**Method:** `GET`  
**Middleware:** `verifyToken`  
**Description:** Checks if the user is authenticated.  
**Headers:**  
- `Cookie`: `token` (JWT token)  

**Response:**
- **200 OK**: Returns the authenticated user's details.
- **401 Unauthorized**: If the user is not authenticated.

---

### 2. **Sign Up**
**Endpoint:** `/auth/signup`  
**Method:** `POST`  
**Description:** Creates a new user account.  

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response**:

- **201 Created**: User created successfully, and a verification email is sent.
- **400 Bad Request**: If required fields are missing or the user already exists.

---

### 3. **Log In**
**Endpoint:** /auth/login
**Method:** POST
**Description:** Logs in a user and sets a JWT token in the cookie.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

- **200 OK:** Login successful, and user details are returned.
- **400 Bad Request:** If credentials are invalid or the email is not verified.


---


### 4. **Log Out**
**Endpoint:** /auth/logout
**Method:** POST
**Description:** Logs out the user by clearing the JWT token from the cookie.

**Response:**

- **200 OK:** Logout successful.


---


### 5. **Verify Email**
**Endpoint:** /auth/verify-email
**Method:** POST
**Description:** Verifies the user's email using a verification code.

**Request Body:**

```json
{
  "code": "123456"
}
```

**Response:**

- **200 OK:** Email verified successfully.
- **400 Bad Request:** If the verification code is invalid or expired.


---


### 6. **Forgot Password**
**Endpoint:** /auth/forgot-password
**Method:** POST
**Description:** Sends a password reset link to the user's email.

**Request Body:**
```json
{
  "email": "user@example.com"
}

```

**Response:**

- **200 OK:** Password reset email sent successfully.
- **400 Bad Request:** If the email is not associated with any account.


---


### 7. **Reset Password**
**Endpoint:** /auth/reset-password/:token
Method: POST
**Description:** Resets the user's password using a reset token.

**Request Body:**
```json
{
  "password": "newpassword123"
}
```

**Response:**

- **200 OK:** Password reset successfully.
- **400 Bad Request:** If the reset token is invalid or expired.
