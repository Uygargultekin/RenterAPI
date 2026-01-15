const Sequelize = require('sequelize');
const db = require('../config/db');
const Arac = require('./Car');

const Kiralama = db.define('Kiralama', {
    musteriIsim: {
        type: Sequelize.STRING
    },
    musteriYas: {
        type: Sequelize.INTEGER
    },
    baslangicTarihi: {
        type: Sequelize.DATE
    },
    bitisTarihi: {
        type: Sequelize.DATE
    },
    toplamTutar: {
        type: Sequelize.DECIMAL
    }
});

Arac.hasMany(Kiralama);
Kiralama.belongsTo(Arac, { foreignKey: 'aracId' });

module.exports = Kiralama;
