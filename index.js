    function fontSize(){
        console.log(document.documentElement.clientWidth)
        var deviceWidth = document.documentElement.clientWidth<750?document.documentElement.clientWidth:750;
        document.documentElement.style.fontSize = deviceWidth /7.5 + 'px';
    }
    fontSize()
    window.onresize = function () {
        console.log('我被改变了');
        fontSize()
    }