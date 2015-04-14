var express = require('express');
var app = express();
var AdmZip = require('adm-zip');
var multer = require('multer'); 
var done=false;

//var bodyParser = require('body-parser');
//app.use(bodyParser.json()); 
//app.use(bodyParser.urlencoded({ extended: true })); 

/* multer */

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  debugger;
  try{
    var zip = new AdmZip(file.path);
    zip.extractAllTo("./uploads/img/", true);
  }
  catch(e){
    console.log(e);
  }
    done=true;

}
}));



app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});


app.post('/api/photo',function(req,res){
  if(done==true){
    res.end("File uploaded.");
  }
});



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
