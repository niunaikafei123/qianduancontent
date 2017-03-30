
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}
function  GetNewPoint() {
    var width = $(document).width();
    var height = $(document).height();
    var point = { width: GetRandomNum(0, width-100), height: GetRandomNum(0, height)-100 };
    return point;
}

var first = setInterval(setNewPoint, 1000);
var second = false;
function setNewPoint() {    
    var imgs = $('.box');
    for (var i = 0; i < imgs.length; i++) {
        var point = GetNewPoint();
        $(imgs[i]).css({ 'transform': 'translate(' + point.width + 'px,' + point.height + 'px)' });
    }
    clearInterval(first);
    if (!second) {
        setInterval(setNewPoint, 6000);
        second = true;
    }
}

function setmainheight() {
    var height = $(document).height();
    $(".mainleft").height(height - 90);
    $(".mainright").height(height - 90);
}
$(window).resize(function () {
    setmainheight();
});
$(setmainheight);