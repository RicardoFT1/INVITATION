// Importando módulos necesarios
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path'); // Importando el módulo 'path' para trabajar con rutas de archivos

// Creando la instancia de Express
const app = express();

// Aplicando middleware
app.use(cors()); // Habilitando CORS para permitir solicitudes de origen cruzado
app.use(express.json()); // Parseando el cuerpo de las solicitudes entrantes como JSON
app.use(express.static(path.join(__dirname))); // Sirviendo archivos estáticos desde el directorio actual

// Conexión a la base de datos SQLite en memoria
const db = new sqlite3.Database('babyshower.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

// Estableciendo el puerto para el servidor
const PORT = process.env.PORT || 3000;

// Ruta principal para servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciando el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Creando la tabla 'gifts' en la base de datos
db.serialize(() => {
  db.run(`
    CREATE TABLE gifts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      selected INTEGER DEFAULT 0,
      selectedBy VARCHAR,
      reserved INTEGER DEFAULT 0
    )`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  // Comprobar si la tabla 'gifts' contiene datos
  db.get('SELECT COUNT(*) as count FROM gifts', (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (row.count === 0) {
      // Si la tabla 'gifts' no contiene datos, insertar los datos iniciales

      const gifts = [
        { name: 'Regalo 1' },
        { name: 'Regalo 2' },
        // Añade más regalos aquí
      ];

      const insertGifts = db.prepare('INSERT INTO gifts (name) VALUES (?)');
      gifts.forEach(gift => {
        insertGifts.run(gift.name, (err) => {
          if (err) {
            console.error(err.message);
          }
        });
      });
      insertGifts.finalize();
    }
  });
});

// Ruta para obtener la lista de regalos
app.get('/gifts', (req, res) => {
  db.all('SELECT id, name, selected, selectedBy, reserved FROM gifts', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


// función que verifique si el regalo ya existe en la base de datos antes de insertarlo
function giftExists(name, callback) {
  db.get('SELECT COUNT(*) as count FROM gifts WHERE name = ?', [name], (err, row) => {
    if (err) {
      console.error(err.message);
      callback(false);
    } else {
      callback(row.count > 0);
    }
  });
}

// Ruta para agregar un regalo (POST /gifts)
app.post('/gifts', (req, res) => {
  const { name } = req.body;

  // Verificar si el regalo ya existe en la base de datos
  giftExists(name, (exists) => {
    if (exists) {
      // Si el regalo ya existe, enviar un mensaje de error
      res.status(400).json({ error: 'El regalo ya existe en la lista.' });
    } else {
      // Si el regalo no existe, insertarlo en la base de datos
      db.run('INSERT INTO gifts (name) VALUES (?)', [name], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Regalo agregado exitosamente.' });
      });
    }
  });
});

app.put('/gifts/:id', (req, res) => {
  const { id } = req.params;
  const { selected, selectedBy, reserved } = req.body;

  console.log('Valores recibidos:', { id, selected, selectedBy, reserved });

  db.run('UPDATE gifts SET selected = ?, selectedBy = ?, reserved = ? WHERE id = ?', [selected, selectedBy, reserved, id], (err) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Gift updated successfully.' });
  });
});



// Ruta para inicio de sesion
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'RFT' && password === 'Alana') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});

// Ruta para el botón de administrador
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/gifts-all', (req, res) => {
  db.all('SELECT * FROM gifts', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

