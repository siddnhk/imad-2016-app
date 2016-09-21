var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var sid1= {
    title: 'Sid1',
    heading: 'Sid1',
    date: 'Sept21,2016',
    content: `
    <p> First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! 
    </p>
    <p> First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! 
    </p>
    <p> First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! 
    </p>`
};
function createTemplate(data){
     var title = data.title;
     var date = data.date; 
     var heading = data.heading;
     var content = data.content;
     
     var hatmlTemplate =`
         <html>
            <head>
              <title>
                  ${title}
              </title>
              <meta name= "viewport" content= "width=device-width, initial-scale= 1" />
              <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
               <div class="container">
                  <div>
                     <a href="/">Home</a>
                  </div>
                  <hr/>
                  <h3>
                     ${heading}
                  </h3>
                  <div>
                     ${date}
                  </div>
                  <div>
                     ${content}
                  </div>
               </div>
            </body>
        </html>    
        `;
     return htmlTemplate;
}
 



app.get('/sid1', function (req, res) {
  res.send(createTemplate(sid1));
});






app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
