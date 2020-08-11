const express = require('express')
const session = require('express-session')
const stylus = require('stylus')
const nib = require('nib')
const pkg = require(__dirname + '/package.json')
const app = express()
const port = 80
const downloads = 'C:/Users/naufalh39/Downloads'

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}

function getFiles (dir, files_){
    const fs = require('fs');
    
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name.replace(downloads + '/', ''));
        }
    }
    return JSON.stringify(files_);
}

app.set('views', './views')
app.set('view engine', 'pug')

if (app.get('env') === 'development') {
  app.locals.pretty = false;
}

app.use(express.static('assets'))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

app.use(stylus.middleware({
    src: __dirname + '/assets',
    compile: compile
}))

app.use(function(req, res, next){
   res.locals.user = req.session
   next()
})

app.get('/blog', function (req, res) {
  res.render(req.path.substr(1))
})

app.get('/', function (req, res) {
  console.log(`[${req.ip}] Incoming connection`)
  res.render('home')
})

app.post('/', function (req, res) {
    if (req.session.login || req.body.pass && req.body.pass == `uwu`) {
        console.log(`[${req.ip}] Access granted: ${req.session.id}`)
        app.use('/downloads', express.static(downloads))
        req.session.login = true
        res.send(getFiles(downloads))
    } else
        res.status(403).end()
})

app.listen(port, () => console.log(`${pkg.name} ${pkg.version} listening at http://localhost:${port}`))