module.exports = (err, _req, res, _next) => {
  const INTERNAL_SERVER_ERROR = 500;
  console.error(err);
  // if (err.isJoi) {
  // const { details: [{ type }] } = err;
  // if (type === 'number.base' || 'number.min') {
  //   return res.status(statusCode.UNPROCESSABLE_ENTITY).json({
  //     message: '"quantity" must be a number larger than or equal to 1',
  //   });
  // }
  res.status(INTERNAL_SERVER_ERROR).json({
    message: 'internal server error',
  });
};
