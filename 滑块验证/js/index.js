window.onload=function(){
    //不考虑IE7以下   封装一个document.querySelector方法
    var fun = function(name){
        return document.querySelector(name)
    };
    var btn = fun('.btn');
    var box = fun('.box');
    var bg = fun('.bg');
    var text = fun('.text')
    var verification = false;//默认验证未通过
    var pc = function(){
        btn.onmousedown = function(event){
            var downX = event.clientX;
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
        };
        window.onmouseup = function(){
            window.onmousemove = null;
            if(!verification){
                btn.style.left =0;
                bg.style.width = 0;
            }
        }
    };
    var phone = function () {
        window.ontouchmove=function (e) {
            e.preventDefault();
        };
        console.log(111);
        btn.ontouchstart = function(event){
            var downX = event.touches[0].clientX;
            window.ontouchmove = function(event){
                event.preventDefault();//阻止手机端屏幕滚动
                var moveX = event.touches[0].clientX - downX;
                if(moveX>=0){
                    btn.style.left = moveX + 'px';
                    bg.style.width = moveX + 'px';
                    if(moveX >=box.offsetWidth - btn.offsetWidth){  //验证通过
                        verification = true;
                        btn.ontouchdown = null;  //清除鼠标事件
                        window.ontouchmove=function (e) {
                            e.preventDefault();
                        };
                        text.style.color = '#ffffff';
                        text.innerHTML = '验证通过'
                    }
                }
            }
        };
        window.ontouchend = function(){
            window.ontouchmove=function (e) {
                 e.preventDefault();
            };
            if(!verification){
                btn.style.left =0;
                bg.style.width = 0;
            }
        }
    };
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        phone()
    } else {
        pc()
    }
};