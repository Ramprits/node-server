const mongoose = require('mongoose');

// @ts-ignore
const ArticleSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, default: '' },
  author: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  url: { type: String, default: '' },
  urlToImage: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now() }
});

// @ts-ignore
const NewsSchema = mongoose.Schema({
  status: String,
  totalResults: Number
  // articles: Article[];
});

// @ts-ignore
const SourceSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('article', ArticleSchema);
module.exports = mongoose.model('news', NewsSchema);
module.exports = mongoose.model('source', SourceSchema);
