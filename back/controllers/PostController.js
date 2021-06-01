const boom = require('boom')

const Posts = require('../models/PostModel')

exports.getPosts = async (req, reply) => {
  try {
    const id = req.user.user._id
    const posts = await Posts.find({publisher: id})
    return posts
  } catch (err) {
    throw boom.boomify(err)
  }
}


exports.getSinglePost = async (req, reply) => {
  try {
    const id = req.params.id
    const post = await Posts.findById(id)
    return {data: post}
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.addPost = async (req, reply) => {
  try {
    const post = new Posts({...req.body, publisher: req.user.user._id, user: req.user.user})
    return post.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.updatePost = async (req, reply) => {
  try {
    const id = req.params.id
    const post = req.body
    const { ...updateData } = post
    const update = await Posts.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.deletePost = async (req, reply) => {
  try {
    const id = req.params.id
    const userid = req.user.user._id
    const post = await Posts.findOne({_id: id, publisher: userid})
    await post.remove()
    return post
  } catch (err) {
    throw boom.boomify(err)
  }
}