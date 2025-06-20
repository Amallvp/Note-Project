const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String], 
    default: [],
  },
  createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
  },
  modifiedBy: {
    type: String,
    allowNull: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

noteSchema.index({ createdAt: -1 }); 
noteSchema.index({ createdBy: 1 }); 

module.exports = mongoose.model("Note", noteSchema);
