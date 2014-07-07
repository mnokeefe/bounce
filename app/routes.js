// Client
exports.index = function(req, res){
  res.render('index', { title: 'Bouncer' });
};

// Server
exports.server = function(req, res){
  res.render('server', { title: 'Active Bouncers' });
};

// Matter.js test
exports.matter = function(req, res){
  res.render('matter', { title: 'Matter test' });
};