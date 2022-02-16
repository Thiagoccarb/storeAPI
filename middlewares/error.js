module.exports = (err, _req, res, _next) => {
  const INTERNAL_SERVER_ERROR = 500;
  console.error(err);
  res.status(INTERNAL_SERVER_ERROR).json({
    message: 'internal server error',
  });
};
