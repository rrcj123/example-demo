window.onload = function(){
    var bg = document.querySelector('.bg');
    var bgTop = bg.getBoundingClientRect().top;   //获取背景的坐标
    var bgLeft = bg.getBoundingClientRect().left;
    var canvas = document.querySelector('#canvas')
    var ctx = canvas.getContext('2d');
    var bgWidth = bg.offsetWidth;   //获取要盖住的背景的宽和高
    var bgHeight = bg.offsetHeight;
    canvas.width = bgWidth;
    canvas.height = bgHeight;
    ctx.fillStyle= '#ABABAB';
    ctx.rect(0,0,bgWidth,bgHeight);
    ctx.fill();
    var kuai = 10; //默认刮开位置边长10px
    canvas.onmousedown = function(){
        canvas.onmousemove = function(e){
            ctx.clearRect(e.clientX-bgLeft-kuai/2,e.clientY-bgTop-kuai/2,kuai,kuai);
        };
    };
    var arr = ['一个亿','一元钱','海景别墅','小草房','下次中奖'];
    bg.innerHTML = arr[Math.floor(Math.random()*arr.length)]
    window.onmouseup = function () {
        canvas.onmousemove = null;
    }
};