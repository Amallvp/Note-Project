📘 Project Setup: Note Management System (Backend)
A Node.js + Express + MongoDB backend to manage user-authenticated notes with optional image uploads and soft delete support.

📁 Folder Structure (Overview)
bash
Copy
Edit
Note_Project_Backend/
│
├── config/
│   └── dbConnect.js          # MongoDB connection logic
│
├── controllers/
│   ├── noteController.js     # Create, update, get, delete notes
│   └── userController.js     # User registration/login
│
├── middleware/
│   └── upload.js             # Multer storage config
│
├── models/
│   ├── noteModel.js          # Mongoose schema for notes
│   └── userModel.js          # Mongoose schema for users
│
├── routes/
│   ├── noteRoute.js          # Note-related routes
│   └── userRoute.js          # User-related routes
│
├── uploads/                  # Static directory for uploaded files
│
├── .env                      # Environment variables
├── app.js                    # Main entry point
├── package.json
└── README.md

🚀 Installation & Setup
1. ✅ Clone the Repository
bash
Copy
Edit
git clone https://github.com/Amallvp/Note-Project.git
cd Note_Project_Backend
2. ✅ Install Dependencies
bash
Copy
Edit
npm install
3. ✅ Configure Environment Variables
4. ✅ Connect to MongoDB
5. ✅ Run the Server - npm run dev

Server running on port 5000
MongoDB connected

⚙️ Core Features
📝 Note Features
Create a note with optional image upload

Get all notes with pagination

Get a note by ID

Soft delete a note (isActive: false)

Update note (append new images)

👤 User Features
Register/Login with validations

Auth middleware with JWT token
