const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a BD (MongoDB)
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/portafolio';
mongoose.connect(DB_URI).then(() => console.log('BD Conectada')).catch(err => console.log(err));

// Esquema simple
const ProfileSchema = new mongoose.Schema({
    name: String,
    role: String
});
const Profile = mongoose.model('Profile', ProfileSchema);

// Rutas
app.get('/api/profile', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        res.json(profile || { name: "Habigail Mamani Gomez", role: "Full Stack Dev" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
}

module.exports = app;