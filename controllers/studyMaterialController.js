const StudyMaterial = require('../models/StudyMaterial');

const studyMaterialController = {
  getAllMaterials: async (req, res) => {
    try {
      const { tenantId } = req.query;
      const materials = await StudyMaterial.find({ tenant: tenantId, isActive: true });
      res.json(materials);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  getMaterialById: async (req, res) => {
    try {
      const { id } = req.params;
      const material = await StudyMaterial.findById(id);
      if (!material) {
        return res.status(404).json({ message: 'Study material not found' });
      }
      res.json(material);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  createMaterial: async (req, res) => {
    try {
      const { name, description, category, icon, language, chapters, tenantId } = req.body;
      const material = new StudyMaterial({
        name,
        description,
        category,
        icon,
        language,
        chapters,
        tenant: tenantId
      });
      await material.save();
      res.status(201).json(material);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  updateMaterial: async (req, res) => {
    try {
      const { id } = req.params;
      const material = await StudyMaterial.findByIdAndUpdate(id, req.body, { new: true });
      if (!material) {
        return res.status(404).json({ message: 'Study material not found' });
      }
      res.json(material);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  deleteMaterial: async (req, res) => {
    try {
      const { id } = req.params;
      await StudyMaterial.findByIdAndDelete(id);
      res.json({ message: 'Study material deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = studyMaterialController;
