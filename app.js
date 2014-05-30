var co = require('co');
var fs = require('fs');
var thunkify = require('thunkify');
var thunkReadFile = thunkify(fs.readFile);
var formParser = require('co-multiparty');

var app = require('express')();
app.post('/vp', function(req, res) {
    co(function *(){
      var fields = yield formParser.parse(req);
      var text = yield thunkReadFile('./mail.txt', 'utf8');
      var sender = fields.fields.from;
      var subject = fields.fields.subject;
      sendmail(sender, 'Re: ' + subject, text);
    })();
});

app.listen(process.env.PORT || 7076);

function sendmail(to, subject, text) {

    require('dotenv').load();
    var sendgrid_username = process.env.SENDGRID_USERNAME;
    var sendgrid_password = process.env.SENDGRID_PASSWORD;
    var from = process.env.FROM;
    var from_name = process.env.FROM_NAME;
    var reg = /[A-Za-z0-9\-\.\_]+@[A-Za-z0-9\-\_]+\.[A-Za-z0-9\-\.\_]+/;
    var email = to.match(reg);
    var sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);
    var sgMail = new sendgrid.Email();
    sgMail.addTo(email);
    sgMail.setFrom(from);
    sgMail.fromname = from_name;
    sgMail.setSubject(subject);
    sgMail.setText(text + '\r\n' + from_name + '\r\n' + from);
    sendgrid.send(sgMail, function(err, json) {
        if (err) { return console.error(err);}
        console.log(json);
    });
}
