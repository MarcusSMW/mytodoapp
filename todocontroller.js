var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://test:test12@ds063889.mlab.com:63889/testdbmarcusw');

//Create schema (blueprint)
var todoSchema = new mongoose.Schema({
  item: String
});

var todoo = mongoose.model('todoo', todoSchema);


// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'learn code'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
  // get data from mongodb and pass it to view
  todoo.find({}, function(err, data){
  if (err) throw err;
  res.render('todo', {todos: data});
});

});

app.post('/todo', urlencodedParser, function(req, res){
  // get data from the view and add it to mongodb
  var newtodo = todoo(req.body).save(function(err,data){
    if (err) throw err;
    res.json(data);
  })
});

app.delete('/todo/:item', function(req, res){
  // delete requested item from mongodb
  todoo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
    if (err) throw err;
    res.json(data)
  });

});

};
