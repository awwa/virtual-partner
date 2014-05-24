require('dotenv').load();
var fs = require('fs');
var sendgrid_username = process.env.SENDGRID_USERNAME;
var sendgrid_password = process.env.SENDGRID_PASSWORD;
var from = process.env.FROM;
var from_name = process.env.FROM_NAME;

var app = require('express')();
app.post('/vp', function(req, res) {
  var err;
  try {
    var multiparty = require('multiparty');
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        console.log(require('util').inspect(fields, false));

        fs.readFile('./あmail.txt', 'utf8', function(err, text) {
          var sender = fields.from[0];
          var subject = fields.subject;
          var reg = /[A-Za-z0-9\-\.\_]+@[A-Za-z0-9\-\_]+\.[A-Za-z0-9\-\.\_]+/;
          var email = sender.match(reg);
          var sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);
          var sgMail = new sendgrid.Email();
          sgMail.addTo(email);
          sgMail.setFrom(from);
          sgMail.fromname = from_name;
          sgMail.setSubject('Re: ' + subject);
          sgMail.setText(text + '\r\n' + from_name + '\r\n' + from);
          sendgrid.send(sgMail, function(err, json){
            if (err) { return console.error(err);}
            console.log(json);
          });
        });
    }); 
  } catch (e) {
    console.log(e);
    err = e;
  } finally {
    res.send(err);
  }
});

app.listen(process.env.PORT || 7076);
