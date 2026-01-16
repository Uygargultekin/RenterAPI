const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./src/config/db');
const kiralamaRoutes = require('./src/routes/rentalRoutes');
const aracRoutes = require('./src/routes/carRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/rentals', kiralamaRoutes);
app.use('/api/cars', aracRoutes);

db.sync({ alter: true })
    .then(() => {
        console.log('Veritabani senkronize edildi.');
        app.listen(PORT, () => {
            console.log(`Sunucu ${PORT} portunda calisiyor.`);
        });
    })
    .catch(hata => {
        console.error('Veritabani baglanti hatasi:', hata);
    });
