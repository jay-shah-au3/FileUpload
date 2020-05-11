const router = require('express').Router();
const filesController = require('../controllers/files.controller');

router.post('/upload',  filesController.addFile);
router.get('/all', filesController.getAllFiles);
router.get('/:name', filesController.getFile);
// router.get('/search/:name', affiliationsController.searchAffiliate);

module.exports = router;