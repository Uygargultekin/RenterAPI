const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function veritabaniOlustur() {
    try {
        const baglanti = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        await baglanti.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log('Veritabani kontrol edildi/olusturuldu.');
        await baglanti.end();
    } catch (hata) {
        console.error('Veritabani olusturma hatasi:', hata);
        process.exit(1);
    }
}

veritabaniOlustur();
