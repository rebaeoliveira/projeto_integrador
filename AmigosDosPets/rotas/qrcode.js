const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

router.get('/', async (req, res) => {
    try {
        const qrCodeData = req.query.data;
        const qrCodeImageUrl = await QRCode.toDataURL(qrCodeData);
        res.render('qrcode', { qrCodeImageUrl });
    } catch (error) {
        console.error('Erro ao gerar QRCode:', error);
        res.status(500).send('Erro ao gerar QRCode.');
    }
});

module.exports = router;
