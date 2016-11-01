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
                     ${date.toDateString()}
                  </div>
                  <div>
                     ${content}
                  </div>
               </div>
               <div class="footer">
                 <input type="text" id="comments" placeholder="comments">
                 <input type="submit" id="post_btn" value="Post">
                 <ul id=commentlist>
                 </ul>
               </div>
               <script type="text/javascript" src="/ui/main.js">
               </script>
            </body>
        </html>    
        `;
     return htmlTemplate;
}

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
  
  pool.query('SELECT * FROM articles', function(err,result){
    if(err){
       res.status(500).send(err.toString());
    }
    else{
       
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

 
var comments = []; 
app.get('/post-comments', function (req, res) {
  var comment = req.query.comment;
  comments.push(comment);
  res.send(JSON.stringify(comments));
});


app.get('/articles/:articleName', function (req, res) {
  
  
  pool.query("SELECT * FROM articles WHERE title ='" + req.params.articleName +"'",function(err,result){
    if(err){
       res.status(500).send(err.toString());
    } else{
        if (result.rows.length === 0){
           res.status(404).send('Article not found');
        } else{
             
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        
        }    
    }

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



