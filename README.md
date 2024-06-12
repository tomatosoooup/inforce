# Inforce test task

# What has been done:
1. CRUD operations for boards on BACKEND and FRONTEND
2. Frontend table with 3 cells (TODO, IN_PROGRESS< DONE)
3. Uploading existing board with seacrhParams and "Load" button
4. CRUD operations for todos on BACKEND and FRONTEND
# What has'n been done
1. Didn't implement Dnd for todos
2. Adaptives (only desktop)


# How to launch 
(NOTE: I've used PostgreSQL database fron Neon.tech) You can try out app if u provide DATABASE_URL inside .env files. And NEXT_PUBLIC_ENDPOINT for frontend .env file - "http://localhost:8000/"
1. Clone repository with `git clone`
2. Navigate to `inforce/backend`, type in CMD  `npm i` + `npx prisma db push` + `npm run start:dev`. You will start BACKEND server on port :8000
3. Navigate to `inforce/todo_app`, type in CMD  `npm i`+ `npx prisma db push` + `npm run dev`. You will start FRONTEND server on port :3000
4. Now you can try out all implemented features
