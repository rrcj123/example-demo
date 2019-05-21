window.onload = function(){
    var bg = document.querySelector('.bg');
    var bgTop = bg.getBoundingClientRect().top;   //获取背景的坐标
    var bgLeft = bg.getBoundingClientRect().left;
    var canvas = document.querySelector('#canvas')
    var ctx = canvas.getContext('2d');
    var bgWidth = bg.offsetWidth;   //获取要盖住的背景的宽和高
    var bgHeight = bg.offsetHeight;
    var text = '奖品区';
    canvas.width = bgWidth;
    canvas.height = bgHeight;
    ctx.fillStyle= '#ABABAB';
    ctx.rect(0,0,bgWidth,bgHeight);
    ctx.fill();
    ctx.fillStyle = "blue";
    ctx.font="60px Arial";
    ctx.fillText(text, (bgWidth-ctx.measureText(text).width)/2, bgHeight/2);
    var kuai = 20; //默认刮开位置边长20px
    var pc = function () {    //pc端
        canvas.onmousedown = function(){
            canvas.onmousemove = function(e){
                ctx.clearRect(e.clientX-bgLeft-kuai/2,e.clientY-bgTop-kuai/2,kuai,kuai);
            };
        };
        window.onmouseup = function () {
            canvas.onmousemove = null;
        };
    };
    var phone = function () {
        canvas.ontouchstart = function(){
            canvas.ontouchmove = function(e){
                e.preventDefault();//阻止手机端屏幕滚动
                ctx.clearRect(e.touches[0].clientX-bgLeft-kuai/2,e.touches[0].clientY-bgTop-kuai/2,kuai,kuai);
            };
        };
        window.ontouchend = function(){
           canvas.ontouchmove = null;
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
    var arr = ['一个亿','一元钱','海景别墅','小草房','下次中奖'];
    bg.innerHTML = arr[Math.floor(Math.random()*arr.length)]
};