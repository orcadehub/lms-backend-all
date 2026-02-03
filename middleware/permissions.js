const checkPermission = (permission) => {
  return (req, res, next) => {
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Access denied. Only instructors allowed.' });
    }

    if (!req.user.permissions || !req.user.permissions.includes(permission)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

module.exports = { checkPermission };