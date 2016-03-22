exports.database = {
  url: 'mongodb://127.0.0.1:27017/vaananba-dev',
  options: {
    db: { native_parser: true,safe:true },
    server: { poolSize: 10 }
  }
}


exports.cloudinary = {
  cloud_name: 'dkvhjc3ia',
  api_key: '227654598675717',
  api_secret: 'UkKXDY51kw6d4cMOf-qX7BqM5Fk'
}
