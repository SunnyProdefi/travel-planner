const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "旅行标题不能为空"],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, "开始日期不能为空"]
  },
  endDate: {
    type: Date,
    required: [true, "结束日期不能为空"]
  },
  destination: {
    type: String,
    required: [true, "目的地不能为空"],
    trim: true
  },
  activities: [{
    title: String,
    date: Date,
    location: String,
    notes: String
  }],
  budget: {
    type: Number,
    min: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 验证结束日期不能早于开始日期
tripSchema.pre('save', function(next) {
  if (this.endDate < this.startDate) {
    next(new Error('结束日期不能早于开始日期'));
  }
  next();
});

module.exports = mongoose.model("Trip", tripSchema); 