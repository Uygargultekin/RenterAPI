const db = require('../config/db');
const Arac = require('../models/Car');
const Kiralama = require('../models/Rental');

const araclar = [
    { marka: 'Fiat', model: 'Egea Cross', plaka: '34 AB 123', gunlukUcret: 1500, durum: 'musait' },
    { marka: 'Renault', model: 'Clio', plaka: '35 KA 3535', gunlukUcret: 1400, durum: 'kirada' },
    { marka: 'Hyundai', model: 'i20', plaka: '06 ANK 99', gunlukUcret: 1450, durum: 'musait' },
    { marka: 'Toyota', model: 'Corolla', plaka: '07 ANT 07', gunlukUcret: 2000, durum: 'bakimda' },
    { marka: 'Honda', model: 'Civic', plaka: '16 BUR 16', gunlukUcret: 2200, durum: 'musait' },
    { marka: 'Renault', model: 'Megane', plaka: '34 XYZ 789', gunlukUcret: 2100, durum: 'musait' },
    { marka: 'Peugeot', model: '3008', plaka: '34 SUV 01', gunlukUcret: 3000, durum: 'kirada' },
    { marka: 'Nissan', model: 'Qashqai', plaka: '34 QQ 202', gunlukUcret: 2900, durum: 'musait' },
    { marka: 'Dacia', model: 'Duster', plaka: '55 SAM 55', gunlukUcret: 1800, durum: 'musait' },
    { marka: 'Volkswagen', model: 'Passat', plaka: '34 VIP 99', gunlukUcret: 3500, durum: 'musait' },
    { marka: 'BMW', model: '320i', plaka: '34 BMW 34', gunlukUcret: 5000, durum: 'kirada' },
    { marka: 'Mercedes', model: 'C200', plaka: '34 MER 100', gunlukUcret: 5500, durum: 'musait' },
    { marka: 'Audi', model: 'A3 Sedan', plaka: '35 AUD 35', gunlukUcret: 4000, durum: 'bakimda' },
    { marka: 'Ford', model: 'Focus', plaka: '41 KOC 41', gunlukUcret: 1900, durum: 'musait' },
    { marka: 'Opel', model: 'Corsa', plaka: '26 ESK 26', gunlukUcret: 1350, durum: 'musait' }
];

async function verileriEkle() {
    try {
        await db.sync({ force: true });
        await Arac.bulkCreate(araclar);
        console.log('Veritabanina veriler eklendi.');
        process.exit();
    } catch (hata) {
        console.error('Veri ekleme hatasi:', hata);
        process.exit(1);
    }
}

verileriEkle();
