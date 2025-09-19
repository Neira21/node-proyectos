import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;



app.use(cors(
  {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['*']
  }
))



app.get('/', (req, res) => {
  res.send('Hello World!');

});

app.post('/send-email', (req: Request, res: Response) => {
  const { recipient, subject, text } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.correo,
      pass: process.env.nodemailer, // Usar la App Password correcta
    },
    tls: {
      rejectUnauthorized: false // Ignorar problemas de certificados SSL
    }
  });

  const mailOptions = {
    from: "Alvaro Neira", // Usar el email real como remitente
    to: recipient,
    subject: subject,
    text: text,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      console.log("Error sending email:", error)
      res.status(500).send('Error sending email');
    } else {
      console.log("Email sent successfully:", info.response);
      res.status(200).send('Email sent successfully');
    }
  });

});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


