const Arac = require('../models/Car');

exports.aracListele = async (req, res) => {
    try {
        const araclar = await Arac.findAll();
        res.json(araclar);
    } catch (hata) {
        res.status(500).json({ mesaj: 'Sunucu hatasi' });
    }
};

exports.aracEkle = async (req, res) => {
    try {
        const yeniArac = await Arac.create(req.body);
        res.status(201).json(yeniArac);
    } catch (hata) {
        res.status(500).json({ mesaj: 'Sunucu hatasi' });
    }
};

exports.aracSil = async (req, res) => {
    try {
        const arac = await Arac.findByPk(req.params.id);
        if (!arac) {
            return res.status(404).json({ mesaj: 'Arac bulunamadi' });
        }
        await arac.destroy();
        res.json({ mesaj: 'Arac basariyla silindi' });
    } catch (hata) {
        res.status(500).json({ mesaj: 'Sunucu hatasi' });
    }
};
