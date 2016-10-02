console.log('Loaded!');
var img= getElementById('madi');
var marginleft=0;
function moveright(){

       marginleft= marginleft+10;
       img.style.marginleft= marginleft+'px';
}

img.onclick = function(){
       var interval= setInterval(moveright,100);
};
