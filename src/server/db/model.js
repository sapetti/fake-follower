const { Schema, model } = require('mongoose')

const link = new Schema({
  url: {
    type: String,
  },
  count: {
    type: Number,
  }
})

module.exports.Link = model('Link', link)