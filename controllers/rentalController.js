const db = require('../config/db');
const Kiralama = require('../models/Rental');
const Arac = require('../models/Car');

exports.kiralamaOlustur = async (req, res) => {
    const t = await db.transaction();

    try {
        const { musteriIsim, musteriYas, baslangicTarihi, bitisTarihi, aracId } = req.body;

        if (musteriYas < 21) {
            await t.rollback();
            return res.status(400).json({ mesaj: 'Yas siniri 21' });
        }

        const arac = await Arac.findByPk(aracId, { transaction: t });

        if (!arac || arac.durum !== 'musait') {
            await t.rollback();
            return res.status(400).json({ mesaj: 'Arac musait degil' });
        }

        const baslangic = new Date(baslangicTarihi);
        const bitis = new Date(bitisTarihi);
        const gunSayisi = (bitis - baslangic) / (1000 * 60 * 60 * 24);
        const toplamTutar = gunSayisi * arac.gunlukUcret;

        const yeniKiralama = await Kiralama.create({
            musteriIsim,
            musteriYas,
            baslangicTarihi,
            bitisTarihi,
            toplamTutar,
            aracId
        }, { transaction: t });

        arac.durum = 'kirada';
        await arac.save({ transaction: t });

        await t.commit();
        res.status(201).json(yeniKiralama);
    } catch (hata) {
        await t.rollback();
        res.status(500).json({ mesaj: 'Sunucu hatasi' });
    }
};

exports.kiralamaIptal = async (req, res) => {
    const t = await db.transaction();

    try {
        const kiralama = await Kiralama.findByPk(req.params.id, { transaction: t });

        if (!kiralama) {
            await t.rollback();
            return res.status(404).json({ mesaj: 'Kiralama bulunamadi' });
        }

        const arac = await Arac.findByPk(kiralama.aracId, { transaction: t });

        if (arac) {
            arac.durum = 'musait';
            await arac.save({ transaction: t });
        }

        await kiralama.destroy({ transaction: t });

        await t.commit();
        res.json({ mesaj: 'Kiralama iptal edildi ve arac durumu guncellendi' });
    } catch (hata) {
        await t.rollback();
        res.status(500).json({ mesaj: 'Sunucu hatasi' });
    }
};
