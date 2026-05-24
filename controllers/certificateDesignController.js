const CertificateDesign = require('../models/CertificateDesign');

// Create a new certificate design
exports.createDesign = async (req, res) => {
  try {
    const { name, designConfig, isDefault } = req.body;
    const tenantId = req.headers['x-tenant-id'] || req.user.tenantId;

    if (!name || !designConfig) {
      return res.status(400).json({ message: 'Name and design config are required' });
    }

    if (isDefault) {
      // Mark all other designs of this tenant as non-default
      await CertificateDesign.updateMany({ tenantId }, { isDefault: false });
    }

    const design = new CertificateDesign({
      name,
      tenantId,
      createdBy: req.user._id,
      designConfig,
      isDefault: !!isDefault
    });

    await design.save();

    res.status(201).json({
      message: 'Certificate design template saved successfully',
      design
    });
  } catch (error) {
    console.error('Error creating certificate design:', error);
    res.status(500).json({ message: 'Error saving certificate design template', error: error.message });
  }
};

// Get all certificate designs for the tenant
exports.getDesigns = async (req, res) => {
  try {
    const tenantId = req.headers['x-tenant-id'] || req.user.tenantId;
    const designs = await CertificateDesign.find({ tenantId })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(designs);
  } catch (error) {
    console.error('Error fetching certificate designs:', error);
    res.status(500).json({ message: 'Error fetching certificate designs', error: error.message });
  }
};

// Get a specific certificate design by ID
exports.getDesignById = async (req, res) => {
  try {
    const { id } = req.params;
    const design = await CertificateDesign.findById(id).populate('createdBy', 'name email');

    if (!design) {
      return res.status(404).json({ message: 'Certificate design not found' });
    }

    res.status(200).json(design);
  } catch (error) {
    console.error('Error fetching certificate design by ID:', error);
    res.status(500).json({ message: 'Error fetching certificate design', error: error.message });
  }
};

// Update an existing certificate design
exports.updateDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designConfig, isDefault } = req.body;
    const tenantId = req.headers['x-tenant-id'] || req.user.tenantId;

    const design = await CertificateDesign.findById(id);

    if (!design) {
      return res.status(404).json({ message: 'Certificate design not found' });
    }

    if (isDefault) {
      // Mark all other designs of this tenant as non-default
      await CertificateDesign.updateMany({ tenantId, _id: { $ne: id } }, { isDefault: false });
    }

    if (name) design.name = name;
    if (designConfig) design.designConfig = designConfig;
    if (isDefault !== undefined) design.isDefault = !!isDefault;

    await design.save();

    res.status(200).json({
      message: 'Certificate design template updated successfully',
      design
    });
  } catch (error) {
    console.error('Error updating certificate design:', error);
    res.status(500).json({ message: 'Error updating certificate design template', error: error.message });
  }
};

// Delete a certificate design
exports.deleteDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const design = await CertificateDesign.findByIdAndDelete(id);

    if (!design) {
      return res.status(404).json({ message: 'Certificate design not found' });
    }

    res.status(200).json({ message: 'Certificate design template deleted successfully' });
  } catch (error) {
    console.error('Error deleting certificate design:', error);
    res.status(500).json({ message: 'Error deleting certificate design template', error: error.message });
  }
};
