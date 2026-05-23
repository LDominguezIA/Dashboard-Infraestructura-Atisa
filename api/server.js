const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app      = express();
const PORT     = process.env.PORT || 3001;
const DATA_DIR = process.env.DATA_DIR || '/data';
const DB_FILE  = path.join(DATA_DIR, 'sla_bd.json');

app.use(express.json({ limit: '10mb' }));

// Servir el HTML estático
app.use(express.static(path.join(__dirname, 'public')));

// GET /api/data — cargar BD
app.get('/api/data', (req, res) => {
  try {
    if (!fs.existsSync(DB_FILE)) return res.json(null);
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    res.json(data);
  } catch (err) {
    console.error('Error leyendo BD:', err.message);
    res.status(500).json({ error: 'Error leyendo datos' });
  }
});

// POST /api/data — guardar BD
app.post('/api/data', (req, res) => {
  try {
    if (!req.body || !req.body.allData) {
      return res.status(400).json({ error: 'allData requerido' });
    }
    const payload = { ...req.body, savedAt: new Date().toISOString(), v: '5' };
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), 'utf8');
    res.json({ ok: true, savedAt: payload.savedAt });
  } catch (err) {
    console.error('Error guardando BD:', err.message);
    res.status(500).json({ error: 'Error guardando datos' });
  }
});

// GET /api/export — descarga backup JSON
app.get('/api/export', (req, res) => {
  try {
    if (!fs.existsSync(DB_FILE)) return res.status(404).json({ error: 'Sin datos' });
    const fecha = new Date().toISOString().slice(0, 10);
    res.setHeader('Content-Disposition', `attachment; filename="SLA_BD_${fecha}.json"`);
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(DB_FILE);
  } catch (err) {
    res.status(500).json({ error: 'Error exportando' });
  }
});

// Health check para Docker
app.get('/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

// SPA fallback — todas las rutas sirven el HTML
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => console.log(`SLA API corriendo en puerto ${PORT}`));
