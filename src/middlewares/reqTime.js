const requestTime = (req, res, next) => {
  req.requestTime = new Date().toString();

  next();
};

export default requestTime;
