const express = require('express');
const router = express.Router();

// Временное хранилище
let users = [
  { id: 1, name: 'Иван Петров', email: 'ivan@example.com', createdAt: new Date().toISOString() },
  { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', createdAt: new Date().toISOString() }
];

// GET все пользователи
router.get('/users', (req, res) => {
  res.json(users);
});

// POST создать пользователя
router.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Имя и email обязательны' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE удалить пользователя
router.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }
  
  users.splice(userIndex, 1);
  res.json({ message: 'Пользователь удален' });
});

module.exports = router;