const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Serve CSS and other static files
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Register Patient
app.post("/register", (req, res) => {
    const patientData =
        `Patient Name: ${req.body.patientName}, Age: ${req.body.age}, Disease: ${req.body.disease}\n`;

    console.log(patientData);

    fs.appendFileSync("patient_registry.txt", patientData);

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="/patient.css">
            <title>Patient Registered</title>
        </head>
        <body>
            <div class="container">
                <h3>${req.body.patientName} has been registered successfully.</h3>
                <br>
                <a href="/" class="back-btn">Go Back</a>
            </div>
        </body>
        </html>
    `);
});

// View Patients
app.get("/patients", (req, res) => {
    if (fs.existsSync("patient_registry.txt")) {

        const patientsData = fs.readFileSync("patient_registry.txt", "utf8");

        const patients = patientsData
            .trim()
            .split("\n")
            .filter(patient => patient.trim() !== "")
            .map(patient => `<div class="patient-row">${patient}</div>`)
            .join("");

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Registered Patients</title>
                <link rel="stylesheet" href="/patient.css">
            </head>
            <body>
                <div class="container">
                    <h2>Registered Patients</h2>

                    <div class="patient-list">
                        ${patients}
                    </div>

                    <br>

                    <a href="/" class="back-btn">Go Back</a>
                </div>
            </body>
            </html>
        `);

    } else {

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Registered Patients</title>
                <link rel="stylesheet" href="/patient.css">
            </head>
            <body>
                <div class="container">
                    <h2>No patients registered yet.</h2>

                    <a href="/" class="back-btn">Go Back</a>
                </div>
            </body>
            </html>
        `);
    }
});

// Start Server
app.listen(3000, () => {
    console.log("Hospital Management System running on port 3000");
});