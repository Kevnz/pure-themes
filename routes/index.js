exports.index = function(req, res){
  res.render('index', { title: 'Pure Styles', subtitle:'Styling Pure', css: req.params.theme || 'cerulean' });
};
