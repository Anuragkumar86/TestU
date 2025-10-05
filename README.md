# 🎓 Thinklix: The Modern Full-Stack Quiz Platform

Thinklix is a cutting-edge, feature-rich web application designed for creating, taking, and managing timed quizzes. Built with the **Next.js App Router** and the **T3 Stack** (Next.js, TypeScript, Tailwind CSS, Prisma), Thinklix provides a fast, responsive, and engaging learning environment.

---

## ✨ Features

Thinklix is engineered to deliver a clean user experience for both administrators (quiz creators) and students (quiz takers).

### 1. Competitive & Community Features
- **Global Leaderboard**: Ranks users based on their `totalScore` derived from all quiz attempts, fostering a competitive environment and enabling users to track their progress.
- **User Coins System**: Each user starts with a default 1000 coins, ready for future features like purchasing attempts or power-ups.

### 2. Robust Quiz Engine & UX
- **Optimized Rendering**: Utilizes Next.js Server Components for fast initial loads and type-safe data fetching.
- **Dynamic Layout**: Handles large, multi-line questions (like code blocks) using `white-space: pre-wrap` and vertical scrolling (`overflow-y-auto`) for comfortable viewing.
- **Optimized Navigation**: Uses `new Array(length).fill(0)` for predictable question navigation button creation.
- **Global Search**: Debounced search bar for fast topic search and navigation.

### 3. High-Integrity Test Environment (Proctoring)
- **Time Management**: Real-time visible timer with strict time limits.
- **Fullscreen Lock**: Enforces fullscreen during the test. Exiting fullscreen triggers overlay warnings and violation tracking.
- **Auto-Submission**: Quizzes auto-submit when time expires or fullscreen violations exceed the limit.
- **Detailed Tracking**: Logs `score`, `timeTaken`, and user-specific `userAnswers` for result review.

### 4. Scalable Content Management (Admin)
- **Hierarchical Navigation**: Three-tier content structure:
  - **Field** (e.g., Computer Science, Mathematics)
  - **Topic** (e.g., DSA, Calculus)
  - **Quiz** (e.g., Trees & Graphs Fundamentals)
- **Bulk Question Importer**: Supports multi-line, delimited format (`QUESTION || OPTION_A | OPTION_B | ... | ANSWER---`) for fast quiz creation.

---

## ⚙️ Technology Stack

| Category    | Technology        | Purpose                                                 |
|------------|-----------------|---------------------------------------------------------|
| Framework  | Next.js (App Router) | React framework for Server Components and routing      |
| Language   | TypeScript       | Strong type safety across the application             |
| Styling    | Tailwind CSS     | Utility-first CSS for rapid, responsive UI            |
| Database   | PostgreSQL       | Robust relational database                             |
| ORM        | Prisma           | Type-safe database toolkit                              |

---

## 🔗 Project Links

| Resource          | Link |
|------------------|------|
| Live Demo        | **https://thinklix-web.vercel.app/** |
| Video Explanation| **https://youtu.be/LC4QgRFJCTU**    |

---

## 🛠️ Installation and Setup

### Prerequisites
- Node.js v18+
- pnpm (recommended) or npm/yarn
- PostgreSQL Database (local or cloud)

### Steps

**1. Clone the Repository**
```bash
git clone [https://github.com/Anuragkumar86/Thinklix.git]
cd Thinklix
```

2. **Install Dependencies**
```
npm install
```

**3. Configure Environment Variables**
Create .env in the root directory:
```
# Database Configuration
DATABASE_URL="postgres://USER:PASSWORD@HOST:PORT/DATABASE"

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="YOUR_SECURE_SECRET"

# Google OAuth (if used)
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

# Cloudinary (for image uploads)
CLOUD_NAME="YOUR_CLOUD_NAME"
UPLOAD_PRESET_NAME="YOUR_UPLOAD_PRESET_NAME"

# Gemini API
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Redis (for rate limiting)
REDIS_URL="redis://USER:PASSWORD@HOST:PORT"
```


**4.  Setup Database and Run Migrations**
```
# Apply schema changes, including Field/Topic linking
npx prisma migrate dev --name init_full_schema

# Generate Prisma Client
npx prisma generate


Run the Development Server

npm run dev
```

Visit **http://localhost:3000**
 to view the app.

## 📸 Screenshots

Below are some screenshots of the application in action:

### 🏠 Homepage  
![Homepage Screenshot](./public/homepage.png)

### ✅ Main-Quiz-Layout  
![Dashboard Screenshot](./public/main_quiz.png)

### 📊 Dashboard  
![Dashboard Screenshot](./public/dashboard.png)

### 📝 Topics  
![Topics Screenshot](./public/all_topics.png)

### ❓ Quizzes  
![Quiz Screenshot](./public/quiz.png)

### 🏆 Leaderboard  
![Leaderboard Screenshot](./public/leaderboard.png)

### 🏆 Login  
![Leaderboard Screenshot](./public/login.png)

> **Tip:** Put your images in a `public/screenshots` folder (or any folder in your repo) and update the paths above accordingly.


**5. 🤝 Contribution**

This project is maintained by **Anurag Kumar**.
Feel free to open an issue or submit a pull request for bug fixes or feature suggestions.
