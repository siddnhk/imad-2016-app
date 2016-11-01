var Pool = require('pg').Pool;

var config = {
 host: 'db.imad.hasura-app.io',
 user: 'siddnhk',
 password: process.env.DB_PASSWORD,
 port: '5432',
 database: 'siddnhk',
};
var pool = new Pool(config);

var post = document.getElementById('post_btn');

post.onclick = function(){
   
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var id=document.getElementById('articleId');
                var index=id.value;
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i< names.length; i++){
                    pool.query('INSERT INTO "comments" ("article id", "time", "content") VALUES ($1, now(), $2);' [id],[names[i]] );
                    list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('commentlist');
                ul.innerHTML = list;
            }
        }
     
    
    };
   
   var commentInput = document.getElementById('comments');
   var comment = commentInput.value;
    request.open('GET', 'http://siddnhk.imad.hasura-app.io/post-comments?comment=' + comment, true);
   request.send(null);
   
    
} ;





