'use strict';

// messages-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//post 增加记录， get获取记录
const messagesSchema = new Schema({
  name: { type: String, required: true},
  body: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const messagesModel = mongoose.model('messages', messagesSchema);

module.exports = messagesModel;
