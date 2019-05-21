window.onload=function(){
    //不考虑IE7以下   封装一个document.querySelector方法
    var fun = function(name){
        return document.querySelector(name)
    }
    var btn = fun('.btn');
    var box = fun('.box');
    var bg = fun('.bg');
    var text = fun('.text')
    var verification = false;//默认验证未通过
    btn.onmousedown = function(event){
        var downX = event.clientX
        window.onmousemove = function(event){
            var moveX = event.clientX - downX;
            if(moveX>=0){
                btn.style.left = moveX + 'px';
                bg.style.width = moveX + 'px';
                if(moveX >=box.offsetWidth - btn.offsetWidth){  //验证通过
                    verification = true; 
                    btn.onmousedown = null;  //清除鼠标事件
                    window.onmousemove = null;  
                    text.style.color = '#ffffff';
                    text.innerHTML = '验证通过'
                }
            }
        }
    } 
    window.onmouseup = function(){
        window.onmousemove = null;  
        if(!verification){
            btn.style.left =0;
            bg.style.width = 0;
        }
    } 
}