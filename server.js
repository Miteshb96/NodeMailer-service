var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.all("/*", function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
    });
    var port = 3001;
    app.get('/', function (req, res) {
      res.render('index');
    });
    app.post('/send-email', function (req, res) {
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'your_email_address@gmail.com',
              pass: 'googleAppGeneratedPassword'
          }
      });
      let mailOptions = {
          from: '"Senders Name" <Senders_email_add@gmail.com> ',
          to: "receivers_email@gmail.com", 
          subject: req.body.subject+ ": " + req.body.name, 
          text: "Nodemail service.", 
          html: "<b>Name: </b>"  + req.body.name + " <br/><b>EmailId: </b>" + req.body.email_id + "<br/><b> Contact no: </b>" + req.body.contact
                + " <p><b>Query: </b>" + req.body.query + " </p>" 
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
              res.render('index');
          });
      });
          app.listen(port, function(){
            console.log('Server is running at port: ', port);
          });
