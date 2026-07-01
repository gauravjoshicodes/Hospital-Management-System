# 🏥 Hospital Management System

A full-stack Hospital Management System built using **Node.js**, **Express.js**, **MongoDB Atlas**, and **Mongoose**. The application enables hospital staff to register patients, securely store patient information in a cloud database, and view all registered patients through a clean and responsive web interface.

---

## 📌 Project Overview

This project replaces traditional file-based storage with **MongoDB Atlas**, allowing patient records to be stored securely in the cloud. The application follows a simple client-server architecture using Express.js for the backend and HTML/CSS for the frontend.

---

## ✨ Features

* Register new patients
* Store patient records in MongoDB Atlas
* View all registered patients
* Responsive user interface
* Form validation
* Automatic timestamps using MongoDB
* Environment variable support using dotenv
* Simple and beginner-friendly project structure

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose ODM

### Other Packages

* dotenv

---

## 📂 Project Structure

```text
Hospital-Management-System/
│
├── app.js                 # Express server
├── models/
│   └── Patient.js         # Mongoose schema
├── index.html             # Patient registration page
├── patient.css            # Styling
├── .env                   # Environment variables (Not pushed to GitHub)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Hospital-Management-System.git
```

### 2. Open the project

```bash
cd Hospital-Management-System
```

### 3. Install dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
```

Example:

```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/HospitalManagement
```

> **Do not upload your `.env` file to GitHub.**

---

## ▶️ Run the Project

```bash
node app.js
```

Server starts at:

```
http://localhost:3000
```

---

## 📝 Application Workflow

1. Open the application.
2. Fill in:

   * Patient Name
   * Age
   * Mobile Number
   * Registration Date & Time
   * Disease
3. Click **Register Patient**.
4. Patient information is stored in MongoDB Atlas.
5. Click **View Registered Patients** to see all records.

---

## 📡 Routes

| Method | Route       | Description                  |
| ------ | ----------- | ---------------------------- |
| GET    | `/`         | Display registration form    |
| POST   | `/register` | Register a new patient       |
| GET    | `/patients` | View all registered patients |

---

## 💾 Database Schema

Each patient record contains:

* Patient Name
* Age
* Mobile Number
* Registration Date & Time
* Disease
* Created At
* Updated At

---

## 📦 Dependencies

* Express
* Mongoose
* dotenv

---

## 🔒 Security

The project uses environment variables to protect sensitive information such as the MongoDB connection string.

The `.env` file is excluded using `.gitignore`.

---

## 🚀 Future Improvements

* Login & Authentication
* Admin Dashboard
* Search Patients
* Update Patient Details
* Delete Patient Records
* Appointment Management
* Doctor Management
* Medical Reports Upload
* Pagination
* REST API Documentation
