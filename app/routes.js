// Client
exports.index = function(req, res){
  res.render('index', { title: 'Bouncer' });
};

// Score Board
exports.scoreboard = function(req, res){
  res.render('scoreboard', { title: 'Active Bouncers' });
};