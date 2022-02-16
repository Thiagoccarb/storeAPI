const router = require('express').Router({ mergeParams: true });
const { create, listAll, listById, updateSale, removeSaleById } = require('./sales');

router.post('/sales', create);
router.get('/sales/:id', listById);
router.get('/sales', listAll);
router.put('/sales/:id', updateSale);
router.delete('/sales/:id', removeSaleById);

module.exports = router;