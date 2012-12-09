exports.development = {
  db: 'mongodb://localhost/test',
  cdn : ''
}

exports.production = {
  db: process.env.MDB || '',
  cdn : process.env.CDN || '' // http://expressy.ewh.jit.su/
}