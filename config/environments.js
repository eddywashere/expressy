exports.development = {
  db: 'mongodb://localhost/test',
  cdn : ''
}

exports.production = {
  db: process.env.MDB || '',
  cdn : '' // http://expressy.ewh.jit.su/
}