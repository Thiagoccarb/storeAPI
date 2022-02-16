const router = require('express').Router({ mergeParams: true });
const { create, listAll, listById, update, remove } = require('./products');

router.post('/products', create);
router.get('/products/:id', listById);
router.get('/products', listAll);
router.put('/products/:id', update);
router.delete('/products/:id', remove);

module.exports = router;