# Server Setup Instructions

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL database running locally or remotely

## Setup

1. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables**:
   - Rename or edit `.env` file
   - Update `DATABASE_URL` with your PostgreSQL connection string
   - Update `JWT_SECRET` with a secure secret key
   
   Example `.env`:
   ```env
   DATABASE_URL="postgresql://your-username:your-password@localhost:5432/your-database?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-here-change-in-production"
   ```

3. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

4. **Run database migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the server**:
   ```bash
   npm run dev
   ```

The server will start on http://localhost:5000
