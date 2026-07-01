const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

const patientSchema = new mongoose.Schema(
    {
        patientName: { type: String, required: true },
        age: { type: String, required: true },
        mobile: { type: String, required: true },
        registrationDateTime: { type: String, required: true },
        disease: { type: String, required: true },
    },
    { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/register", async (req, res) => {
    try {
        const { patientName, age, mobile, registrationDateTime, disease } = req.body;

        await Patient.create({
            patientName,
            age,
            mobile,
            registrationDateTime,
            disease,
        });

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
                        <p><strong>${patientName}</strong> has been registered successfully.</p>
                        <a href="/" class="view-btn">Register Another Patient</a>
                        <a href="/patients" class="view-btn">View Registered Patients</a>
                    </section>
                </main>
            </body>
            </html>
        `);
    } catch (err) {
        console.error("Error registering patient:", err);
        res.status(500).send("Something went wrong while registering the patient.");
    }
});

app.get("/patients", async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: 1 });

        const rows = patients
            .map((patient, index) => {
                const formattedDate = patient.registrationDateTime
                    ? patient.registrationDateTime.replace("T", " ")
                    : "Not recorded";

                return `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${patient.patientName}</td>
                        <td>${patient.age}</td>
                        <td>${patient.mobile}</td>
                        <td>${formattedDate}</td>
                        <td>${patient.disease}</td>
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
    } catch (err) {
        console.error("Error fetching patients:", err);
        res.status(500).send("Something went wrong while loading patients.");
    }
});

app.listen(3000, () => {
    console.log("Hospital Management System running on port 3000");
});