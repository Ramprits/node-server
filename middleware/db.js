module.exports = {
  url: 'mongodb://localhost:27017/Adventure',
  proUrl:
    'mongodb://ramprit:ramprit123456@ds227332.mlab.com:27332/rampritsahaniblog',
  jwtTken: '$2b$10$4eYrC9tfsnxnhc0gn5jOa7TqBFa9n4c5CpaqR7te1H1ye2'
};

// document
// sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p
//sudo kill `sudo lsof -t -i:5000`