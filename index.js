const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const cors =require("cors")

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({origin:"*"}))

// Create a transporter using SMTP
const transport = {
  host: 'smtp.hostinger.com', // Hostinger SMTP server
  port: 465, // Use 465 for SSL or 587 for TLS
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'info@advotok.com', // your email address
    pass: 'Aman123@f24tech24' // your email password
  }
};

const transporter = nodemailer.createTransport(transport);

// Serve the static files from the React app (assuming your build is in the 'dist' folder)
// app.use(express.static(path.join(__dirname, 'dist')));

// API route to handle form submissions
app.post('/api/submit-query', async (req, res) => {
  const { name, email, expertise, message } = req.body;

  const mailOptions = {
    from: 'info@advotok.com',
    to: 'amanrajlahar@gmail.com',
    subject: `New Query: ${expertise}`,
    text: `
      Name: ${name}
      Email: ${email}
      Expertise Needed: ${expertise}
      Message: ${message}
    `,
    html: `
      <h1>New Query Received</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Expertise Needed:</strong> ${expertise}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Query submitted successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error submitting query' });
  }
});

// Catch all other routes and serve the React app's index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
