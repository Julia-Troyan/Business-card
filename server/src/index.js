const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const apiRoutes = require('./routes/api'); 
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Сервер работает!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    message: 'Привет от сервера!',
    data: {
      id: 1,
      name: 'Тестовые данные',
      description: 'Это данные с бэкенда'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Что-то пошло не так!',
    message: err.message 
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📡 API доступен по адресу http://localhost:${PORT}/api`);
});