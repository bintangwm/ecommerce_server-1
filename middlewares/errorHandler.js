module.exports = function (err, req, res, next) {
  // return res.status(500).json(err)
  let status = err.status || 500
  let msg = err.msg || 'internal server error'
  // console.log( err , '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

  if (err.name === 'JsonWebTokenError') {
    status = 401
    msg = 'token not valid!'
  } else if (err.errors) {
    if (err.errors[0].message === 'email must be unique') {
      status = 400
      msg = 'Email already exist!'
    } else
    if (err.name === "SequelizeValidationError") {
      status = 400
      msg = err.errors[0].message
    }
  }
  res.status(status).json({msg})
}