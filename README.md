# SQL Sandbox 🚀

SQL Sandbox is a full-stack interactive SQL practice platform inspired by coding judges like LeetCode, built specifically for mastering database querying through real execution-based challenges.

Users can sign in, solve curated SQL assignments, run live PostgreSQL queries, submit official answers, track verdict history, and even restore unfinished drafts automatically.

---

# ✨ Core Features

## 🔐 Authentication System

* Secure user login/signup using Clerk
* Protected dashboard routes
* Personalized progress tracking per user

## 🧠 Interactive SQL Challenges

* Curated assignment collection with difficulty levels
* Real-world table schemas provided for every question
* Live PostgreSQL sandbox execution

## ⚡ Query Runner + Judge

* Users can run any SELECT query instantly
* Query output compared against expected result
* Verdict generated:

  * Solved
  * Wrong Answer
  * Runtime Error

## 📌 Official Submission Tracking

* Only submitted answers are stored officially
* Full submission history per problem
* Timestamp, verdict, query code, and error logging

## 💾 Smart Draft Autosave

* User SQL drafts autosave with debounce
* On revisit, unfinished code is restored automatically
* Similar to LeetCode draft persistence

## 📊 Progress Dashboard

* Solved / Attempted / Unsolved problem indicators
* Personalized challenge cards
* Accuracy and completion analytics ready

## 🌗 Theme Support

* Light / Dark mode UI
* Fully responsive modern design

---

# 🏗️ Tech Stack

## Frontend

* React + TypeScript
* React Router DOM
* Tailwind Utility Styling + CSS Variables
* Framer Motion
* Lucide React Icons
* Clerk Authentication

## Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* PostgreSQL (`pg`) sandbox execution engine

---

# ⚙️ System Workflow Diagram

```text
assets/sql-sandbox-workflow.png
```

## 🔍 Query Execution Internals

The SQL execution engine works like a mini online judge system:

1. User query is sent to the `/execute-query` API.
2. Backend fetches the selected assignment from MongoDB.
3. Temporary PostgreSQL tables are created dynamically using the assignment schema.
4. Sample rows are inserted into those temporary tables.
5. User SQL query executes inside an isolated PostgreSQL transaction sandbox.
6. Query result is compared against the predefined expected output.
7. Verdict is generated:

   * Solved
   * Wrong Answer
   * Runtime Error
8. On SUBMIT action, the official submission is stored in MongoDB.
9. Drafts and submission history are refreshed on frontend.

---

# 🧩 Database Architecture

## MongoDB Collections

### 1. Assignments Collection

Stores all SQL questions, schemas, sample rows, expected outputs.

### 2. Drafts Collection

Stores unfinished SQL query per user per assignment.

### 3. Submissions Collection

Stores official submitted answers:

* clerkUserId
* assignmentId
* query
* status
* errorMessage
* output
* createdAt

---

# 🚦 Query Execution Lifecycle

### RUN Button

* executes SQL
* returns result
* does NOT store official submission

### SUBMIT Button

* executes SQL
* evaluates correctness
* stores official submission record
* updates user progress

---

# 📁 Project Structure

```text
CipherSQLAssignment/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   └── App.tsx
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── db/
│   └── index.js
```

---

# ▶️ How to Run Locally

## Client

```bash
cd client
npm install
npm run dev
```

## Server

```bash
cd server
npm install
npm run dev
```

---

# 🌟 Future Enhancements

* SQL leaderboard
* User streak system
* AI-generated hints
* Difficulty wise filtering
* Company tagged interview SQL sets
* Admin panel for adding assignments

---

# 👨‍💻 Author

Built as a premium full-stack SQL coding judge platform for database interview preparation.
