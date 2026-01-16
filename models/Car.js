const Sequelize = require('sequelize');
const db = require('../config/db');

const Arac = db.define('Arac', {
    marka: {
        type: Sequelize.STRING
    },
    model: {
        type: Sequelize.STRING
    },
    plaka: {
        type: Sequelize.STRING,
        unique: true
    },
    gunlukUcret: {
        type: Sequelize.DECIMAL
    },
    durum: {
        type: Sequelize.ENUM('musait', 'kirada', 'bakimda'),
        defaultValue: 'musait'
    }
});

module.exports = Arac;
