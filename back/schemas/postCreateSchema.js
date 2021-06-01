module.exports = PostCreateSchema = {
    type: 'object',
    required: ['text', 'images'],
    properties: {
        title: { type: 'string' },
        text: { type: 'string' },
        comment: { type: 'string' },
    },
}

