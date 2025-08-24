require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Give access to static files from the project root
app.use(express.static(path.resolve(__dirname, '..')));

// Accept JSON and form-data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Form processing
app.post('/request', async (req, res) => {
  const { name, phone, issue } = req.body;

  if (!name || !phone) {
    return res.status(400).send('Заполните все поля');
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Заявка с сайта" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Заявка по ремонту машин',
      text: `Имя: ${name}\nТелефон: ${phone}\nПроблема: ${issue || 'не указана'}`
    });

    res.send('Заявка отправлена!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при отправке');
  }
});

// All other requests — serve index.html
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
