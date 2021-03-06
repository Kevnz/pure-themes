var express = require('express'),
    exphbs  = require('express3-handlebars'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    app = express(),
    expstate = require('express-state');

expstate.extend(app);

app.configure(function(){
    app.set('port', process.env.PORT || 3344);
    app.set('views', __dirname + '/views'); 
    app.engine('handlebars', exphbs({defaultLayout: 'main', helpers : {
        activeLink: function (name, element) { 
            return name === element ? 'pure-menu-active' :'el-' + name + '-' + element;
        }
    }}));
    app.set('view engine', 'handlebars');

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
    app.locals.pretty = true;
});

app.get('/', routes.index);
app.get('/:theme', routes.index);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port') + " in " + app.get('env') +" mode");
});

