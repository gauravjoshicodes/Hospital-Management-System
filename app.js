const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/register", (req, res) => {
    const patientData = `${req.body.patientName}|${req.body.age}|${req.body.mobile}|${req.body.registrationDateTime}|${req.body.disease}\n`;
    fs.appendFileSync("patient_registry.txt", patientData, "utf8");

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Patient Registered</title>
            <link rel="stylesheet" href="/patient.css">
        </head>
        <body>
            <main class="home-shell">
                <section class="form-card">
                    <h2>Patient Registered</h2>
                    <p><strong>${req.body.patientName}</strong> has been registered successfully.</p>
                    <a href="/" class="view-btn">Register Another Patient</a>
                    <a href="/patients" class="view-btn">View Registered Patients</a>
                </section>
            </main>
        </body>
        </html>
    `);
});

app.get("/patients", (req, res) => {
    const patientsData = fs.existsSync("patient_registry.txt")
        ? fs.readFileSync("patient_registry.txt", "utf8")
        : "";

    const rows = patientsData
        .split("\n")
        .filter(line => line.trim() !== "")
        .map((line, index) => {
            const [name = "", age = "", mobile = "", dateTime = "", disease = ""] = line.split("|");
            const formattedDate = dateTime ? dateTime.replace("T", " ") : "Not recorded";

            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${name}</td>
                    <td>${age}</td>
                    <td>${mobile}</td>
                    <td>${formattedDate}</td>
                    <td>${disease}</td>
                </tr>
            `;
        })
        .join("");

    const tableHtml = rows
        ? `
            <table class="patient-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient Name</th>
                        <th>Age</th>
                        <th>Mobile Number</th>
                        <th>Date & Time</th>
                        <th>Disease</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `
        : `<p class="empty-state">No registered patients found.<br>Please add a patient first.</p>`;

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registered Patients</title>
            <link rel="stylesheet" href="/patient.css">
        </head>
        <body>
            <main class="patient-shell">
                <section class="patient-card">
                    <h2>Registered Patients</h2>
                    ${tableHtml}
                    <a href="/" class="back-btn">Go Back</a>
                </section>
            </main>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Hospital Management System running on port 3000");
});
