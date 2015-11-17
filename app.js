var express = require('express')
 , http = require('http')
 , path = require('path')
 , favicon = require('express-favicon')
 , ejs = require('ejs')
 , port = process.argv[2] || process.env.PORT || 3004;

var app = express();

app.set('port', port);
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.engine('.html', ejs.renderFile);


app.get('/', function(req, res) {
   res.render('index.html');
});

http.createServer(app).listen(app.get('port'), function() {
   console.log('Express server listening on port ' + app.get('port'));
});
