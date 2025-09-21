<div align="center">
  <img alt="Logo" src="public/soliloquy-pen.png" width="50" />
</div>
<h1 align="center">
  Soliloquy
</h1>

<h3 align="center">
  <strong> Capture Your Thoughts with <a href="https://soliloquyy.vercel.app/" target="_blank">Soliloquy</strong>
</h3>

![Soliloquy Demo](public/demo.png)  

## 𓂃🪶 Features

**Core Features**

- **Easy Journal Entry Creation** – Create beautiful, customizable journal entries with a rich text editor.  
- **Organize with Moods** – Keep your entries organized with mood tags.  
- **Mood Analytics** – Visualize your mood with beautiful graphs.  
- **Mood Summary** – Get a summary calculating the mood score of your entries.  
- **Powerful Search** – Instantly find notes by title, mood, or date of creation.  
- **Secure Data** – Your entries are private and protected.  
- **Responsive Design** – Works seamlessly on desktop and mobile devices.  
- **User Authentication** – Secure authentication powered by Clerk.  

## </> Technologies Used

**Frontend**

- React 19  
- Next.js 15  
- Tailwind CSS v4  
- Zod 3  
- React Router v7  
- Lucide React (icons)  
- Arcjet  
- date-fns (date formatting)
- UI Library - shadcn/ui

**Backend**

- Prisma 6  
- NeonDB  
- Clerk

## 📜 Prerequisites

- Node.js (v18 or higher)  
- npm or yarn  


## 🔧 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yuvikaKathaith/Soliloquy.git
   cd Soliloquy
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with your credentials
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = your_clerk_publishable_key
   CLERK_SECRET_KEY = your_clerk_api_key

   NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up

   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL = /dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL = /dashboard

   DATABASE_URL = your_neonDB_api_key

   ARCJET_KEY = Your_arcjet_api_key

   PIXABAY_API_KEY = your_pixabay_api_key
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Building for Production
  ```bash
  npm run build
  # or
  yarn build
  ```

## 🖳 Usage

### Creating a New Entry
1. Sign in to your account
2. Navigate to "Write New"
3. Fill in the title, mood, content and choose a collection
5. Click "Publish"

### 🔍︎ Searching Notes
- Use the search bar to find notes by title, date, or mood

## 🗝 Authentication

Soliloquy uses Clerk for authentication. Users can:
- Sign-in / Sign-up with username, email and password
- Sign-in / Sign-up with Google
- Edit credentials
