const fs = require('fs')
const util = require('util')
const { pipeline } = require('stream')
const pump = util.promisify(pipeline)
const url  = require('url');
const { HOME_URL } = require('../constants');

module.exports = async function (fastify, opts) {

    fastify.register(require('fastify-multipart'));
    fastify.post('/api/upload', async (request, reply) => {

        const data = await request.file()

        data.file // stream
        data.fields // other parsed parts
        data.fieldname
        data.filename
        data.encoding
        data.mimetype

        await pump(data.file, fs.createWriteStream('./files/' + data.fields.user.value + data.filename))

        reply.send(HOME_URL + '/files/' + data.fields.user.value + data.filename)

    })

}