

var post = document.getElementById('post_btn');

post.onclick = function(){
   
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i< names.length; i++){
                    
                    list += '<li>' + names[i]+'</li>';
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





