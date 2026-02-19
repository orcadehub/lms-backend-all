const express = require('express');
const router = express.Router();
const studyMaterialController = require('../controllers/studyMaterialController');

router.get('/', studyMaterialController.getAllMaterials);
router.get('/:id', studyMaterialController.getMaterialById);
router.post('/', studyMaterialController.createMaterial);
router.put('/:id', studyMaterialController.updateMaterial);
router.delete('/:id', studyMaterialController.deleteMaterial);

module.exports = router;
