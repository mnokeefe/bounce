// Client
exports.index = function(req, res){
  res.render('index', { title: 'Crew Member' });
};

// Server
exports.server = function(req, res){
  res.render('server', { title: 'Stress Faker' });
};