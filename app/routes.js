// Client
exports.index = function(req, res){
  res.render('index', { title: 'Bouncer' });
};

// Score Board
exports.scoreboard = function(req, res){
  res.render('scoreboard', { title: 'Active Bouncers' });
};

// Matter.js test
exports.matter = function(req, res){
  res.render('matter', { title: 'Matter test' });
};