var session = module.exports = {};

session.get = function( req, res, next ){
  res.json({ data: req.session });
};

session.del = function( req, res, next ){
  delete req.session;
  res.status(204).send();
};