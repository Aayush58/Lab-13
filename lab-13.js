const express = require('express');
const app = express();

let users = [
  { id: 1, name: "Mandeep", age: 19 },
  { id: 2, name: "Aaru", age: 20},
  { id: 3, name: "Rebika", age: 19 }
];

app.get('/users', (req, res) => {
  res.send(users);
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  console.log('Database updated');
  res.send('User created successfully');
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUserData = req.body;
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { id, ...updatedUserData };
    console.log('Database updated');
    res.send('User updated successfully');
  } else {
    res.status(404).send('User not found');
  }
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    console.log('Database updated');
    res.send('User deleted successfully');
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});