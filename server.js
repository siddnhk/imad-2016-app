var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
 host: 'db.imad.hasura-app.io',
 user: 'siddnhk',
 password: process.env.DB_PASSWORD,
 port: '5432',
 database: 'siddnhk',
};

var app = express();
app.use(morgan('combined'));

var sidOne= {
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

var sidtwo= {
      title: 'Sid2', 
      heading: 'Sid2', 
      date: 'Sept29,2016', 
      content: ` <p> First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! </p> <p> First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! </p> <p> First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! First Article Biatch! </p>`
      
};

function createTemplate(data){
     var title = data.title;
     var date = data.date; 
     var heading = data.heading;
     var content = data.content;
     
     var htmlTemplate =`
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

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
  
  pool.query('SELECT date FROM articles', function(err,result){
         if(err){
       res.status(500).send(err.toString());
   }   else{
       
       res.send(JSON.stringify(result));
   }
  
  });

});



 
var names = []; 
app.get('/submit-name', function (req, res) {
  var name = req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});



app.get('/articles/:articleName', function (req, res) {
  
  pool.query("SELECT date FROM articles WHERE title ='", +req.params.articleName+"'",function(err,result){
    if(err){
       res.status(500).send(err.toString());
    } else{
        if (result.rows.length === 0){
           res.status(404).send('Article not found');
        } else{
            var articlesData = results.rows[0];
            res.send(createTemplate(articleData));
        }
    }
  }); 
  
  
});

app.get('/sid1', function (req, res) {
  res.send(createTemplate(sidOne));
});


app.get('/sid2', function (req, res) { 
    res.send(createTemplate(sidtwo)); 
});



app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
