# Hospital-Management-System

A simple Hospital Management System built using **Node.js**, **Express.js**, **HTML**, and **CSS**. The application allows hospital staff to register patients, store patient details, and view all registered patients in a structured table format.

## Features

* Register new patients
* Store patient information in a text file
* View all registered patients
* Clean and responsive user interface
* Table-based patient record display
* Express.js backend server
* File System (FS) based data storage

## Technologies Used

* Node.js
* Express.js
* HTML5
* CSS3
* JavaScript
* File System Module (fs)

## Project Structure

```text
Hospital-Management-System/
│
├── app.js
├── index.html
├── patient.css
├── patient_registry.txt
├── package.json
├── package-lock.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/gauravjoshicodes/Hospital-Management-System.git
```

Move into the project directory:

```bash
cd Hospital-Management-System
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
node app.js
```

## Usage

1. Open your browser.
2. Visit:

```text
http://localhost:3000
```

3. Register a patient by entering:

   * Patient Name
   * Age
   * Disease / Medical Condition

4. Click **Register Patient**.

5. Click **View Registered Patients** to see all saved records.

## Sample Record

```text
Patient Name: Manoj, Age: 25, Disease: Leg Fracture
Patient Name: Gaurav, Age: 30, Disease: Brain Hemorrhage
```

Patient records are stored locally in `patient_registry.txt`.

## Future Enhancements

* Edit patient records
* Delete patient records
* Search patients
* MongoDB database integration
* Authentication system
* Appointment management
* Doctor management
* Dashboard analytics

