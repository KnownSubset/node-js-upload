var express = require('express');
var app = express();
var fs = require('fs');
var sys = require('sys');
app.listen(80);
app.use(express.bodyParser({limit: "500mb"}));
app.post('/upload', function(req, res) {
    var fileKey = Object.keys(req.files)[0];
    var file = req.files[fileKey];
    fs.readFile(file.path, function(err, data) {
		var date = new Date();
		var timestamp = date.getMonth()+"-"+ date.getDate()+"-" + (1900+date.getYear())+"-" +date.getTime();
		var path = __dirname + '/' + timestamp + file.name;
        fs.writeFile(path, data, function(err) {
            res.send(err ? err: "AOK");
        });
    });
});