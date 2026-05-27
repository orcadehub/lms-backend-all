const SiteConfig = require('../models/SiteConfig');

/**
 * Get current site configuration (public endpoint)
 */
exports.getConfig = async (req, res) => {
  try {
    const config = await SiteConfig.getConfig();
    res.json({
      subscriptionAmount: config.subscriptionAmount,
      subscriptionAmountRupees: config.subscriptionAmount / 100,
      isFreeAccess: config.isFreeAccess,
      updatedAt: config.updatedAt
    });
  } catch (error) {
    console.error('Get site config error:', error.message);
    res.status(500).json({ message: 'Failed to fetch site configuration' });
  }
};

/**
 * Update site configuration (admin only)
 */
exports.updateConfig = async (req, res) => {
  try {
    const { subscriptionAmountRupees, isFreeAccess } = req.body;
    
    const updates = {};
    
    if (subscriptionAmountRupees !== undefined) {
      const amountInPaise = Math.round(Number(subscriptionAmountRupees) * 100);
      if (isNaN(amountInPaise) || amountInPaise < 0) {
        return res.status(400).json({ message: 'Invalid subscription amount' });
      }
      updates.subscriptionAmount = amountInPaise;
      // If amount is 0, automatically enable free access
      if (amountInPaise === 0) {
        updates.isFreeAccess = true;
      }
    }
    
    if (isFreeAccess !== undefined) {
      updates.isFreeAccess = Boolean(isFreeAccess);
    }

    const adminId = req.userId || req.user?.id || req.user?._id;
    const config = await SiteConfig.updateConfig(updates, adminId);

    res.json({
      message: 'Site configuration updated successfully',
      subscriptionAmount: config.subscriptionAmount,
      subscriptionAmountRupees: config.subscriptionAmount / 100,
      isFreeAccess: config.isFreeAccess
    });
  } catch (error) {
    console.error('Update site config error:', error.message);
    res.status(500).json({ message: 'Failed to update site configuration' });
  }
};
