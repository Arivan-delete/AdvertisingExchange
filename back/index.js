const customJwtAuth = require('./plugins/authPlugin')

const fs = require('fs')

const path = require('path')

const fastify = require('fastify')({
    logger: true
})

fastify.register(require('./plugins/userPlugin'))
fastify.register(require('fastify-cors'))
fastify.register(customJwtAuth)
fastify.register(require('./plugins/uploadHandler'))

const start = async () => {
    try {
      await fastify.listen(3000)
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
start()

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/react-twitter', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err))

const dir = './files';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'files'),
  prefix: '/files/', 
})