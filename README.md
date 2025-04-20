# Simple Blog REST API

A simple blog backend built with **Node.js**, **Express**, **PostgreSQL**, and **Prisma**.  
It supports user authentication using **JWT**, allowing users to create, read, update, and delete their own blog posts.

---

## Tech Stack

- **Backend Framework**: Node.js + Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt

---

## Project Structure

```
blog-api/
├── controllers/
│   ├── authController.js
│   └── postController.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── postRoutes.js
├── prisma/
│   └── schema.prisma
├── .env
├── server.js
├── package.json
└── README.md
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blog-api.git
cd blog-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create PostgreSQL Database

Ensure PostgreSQL is running. Create a database named `blog_appdb` (or any name you prefer):

```bash
createdb blog_appdb
```

### 4. Configure `.env`

Create a `.env` file in the root folder:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/blog_db"
JWT_SECRET="your_jwt_secret"
```

> Replace `postgres`, `yourpassword`, and `blog_db` with your actual credentials.

---

### 5. Set Up Prisma

#### Run Prisma migration:

```bash
npx prisma migrate dev --name init
```

#### Generate Prisma Client:

```bash
npx prisma generate
```

---

### 6. Start the Server

```bash
npm run dev
```

The API will be available at:  
 `http://localhost:5000`

---

## Authentication

JWT is used for protected routes.  
Add this to request headers when logged in:

```
Authorization: Bearer <your-token-here>
```

---

## API Endpoints

### Auth Routes

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| POST   | `/api/auth/register` | Register new user    |
| POST   | `/api/auth/login`    | Login and receive JWT|

---

### Blog Post Routes

| Method | Endpoint              | Auth Required | Description                     |
|--------|-----------------------|----------------|---------------------------------|
| POST   | `/api/posts`          | Yes              | Create a new blog post          |
| GET    | `/api/posts`          | No              | View all blog posts             |
| GET    | `/api/posts/:id`      | No              | View single blog post by ID     |
| PUT    | `/api/posts/:id`      | Yes (author only) | Update blog post                |
| DELETE | `/api/posts/:id`      | Yes (author only) | Delete blog post                |

---

## Testing in Postman

1. Register a user via `POST /api/auth/register`
2. Login via `POST /api/auth/login` to receive a JWT token
3. Copy the token and use it as:

```
Authorization: Bearer <your-token>
```

4. Use the token to access protected routes (create, update, delete post)

---

## Assumptions / Notes

- Passwords are hashed using bcrypt before storing
- JWT is used for stateless authentication
- A user can only update or delete their own posts
- Prisma is used to communicate with PostgreSQL
- Error handling and status codes are implemented correctly

---
