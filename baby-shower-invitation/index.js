const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
db.serialize(() => {
    db.run(`CREATE TABLE gifts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, selected INTEGER DEFAULT 0, selectedBy TEXT)`, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
  
    // Agrega el listado de regalos aquí como objetos con la propiedad 'name'
    const gifts = [
      { name: 'Regalo 1' },
      { name: 'Regalo 2' },
      // Añade más regalos aquí
    ];
  
    // Inserta los regalos en la tabla 'gifts'
    const insertGifts = db.prepare('INSERT INTO gifts (name) VALUES (?)');
    gifts.forEach(gift => {
      insertGifts.run(gift.name, (err) => {
        if (err) {
          console.error(err.message);
        }
      });
    });
    insertGifts.finalize();
  });
  app.get('/gifts', (req, res) => {
    db.all('SELECT id, name, selected FROM gifts', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });
  
  app.put('/gifts/:id', (req, res) => {
    const { id } = req.params;
    const { selected, selectedBy } = req.body;
  
    db.run('UPDATE gifts SET selected = ?, selectedBy = ? WHERE id = ?', [selected, selectedBy, id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Gift updated successfully.' });
    });
  });
  
  
  