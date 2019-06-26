window.onload=function(){
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
      }, {
        passive: false
      });
    var fun = function(name){  //不考虑IE7以下   封装一个document.querySelector方法
        return document.querySelector(name)
    };
    var btn = fun('.btn');
    var box = fun('.box');
    var bg = fun('.bg');
    var text = fun('.text')
    var verification = false;//定义全局变量，默认验证未通过 
       
    var sUserAgent = navigator.userAgent.toLowerCase();   //判断用户终端是移动端或者电脑端，并调用相应事件
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
    function pc(){  //pc端
        console.log('pc')
        btn.onmousedown = function(event){
            var downX = event.clientX;  //获取按住时x轴坐标
            window.onmousemove = function(event){
                var moveX = event.clientX - downX;  //获取移动时x轴坐标，并求出移动距离
                if(moveX>=0){                       //距离大于0时
                    btn.style.left = moveX + 'px';   //滑块移动的距离
                    bg.style.width = moveX + 'px';   //背景改变的距离
                    if(moveX >=box.offsetWidth - btn.offsetWidth){  //如果移动的距离大于总长度减去滑块的长度
                        verification = true;              //验证ok
                        btn.onmousedown = null;          //清除鼠标事件
                        window.onmousemove = null;      //清除鼠标事件
                        text.style.color = '#ffffff';    
                        text.innerHTML = '验证通过'
                    }
                }
            }
        };
        window.onmouseup = function(){               //松开
            window.onmousemove = null;                   //不管是否完成都清除移动事件  注：不清除按下事件
            if(!verification){                      //判断是否验证完成，若没有完成则滑块回到最左边
                btn.style.left =0;                                          
                bg.style.width = 0;
            }
        }
    };

    function phone() {    
        console.log('!pc')                          //移动端，参考pc端
        btn.ontouchstart = function(event){
            var downX = event.touches[0].clientX;
            window.ontouchmove = function(event){
                var moveX = event.touches[0].clientX - downX;
                if(moveX>=0){
                    btn.style.left = moveX + 'px';
                    bg.style.width = moveX + 'px';
                    if(moveX >=box.offsetWidth - btn.offsetWidth){  //验证通过
                        verification = true;
                        btn.ontouchdown = null;  //清除事件
                        window.ontouchmove=null;
                        text.style.color = '#ffffff';
                        text.innerHTML = '验证通过'
                    }
                }
            }
        };
        window.ontouchend = function(){
            window.ontouchmove=null;
            if(!verification){
                btn.style.left =0;
                bg.style.width = 0;
            }
        }
    }; 
};