const errorTemplate = (res, err, message) => {
  return res.status(501).json({
    error: {
      message: message,
      status: err.status || 500,
    },
  });
};

module.exports = errorTemplate;
