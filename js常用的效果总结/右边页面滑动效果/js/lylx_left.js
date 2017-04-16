//单页面左边导航
function oneLeftNav() {
	$("#one_left_nav").css( { "top": 0} );
    var $one_left_nav = $("#one_left_nav"),
	    
        t0, //导航条的上边距
        t1, //文档的垂直滚动上边距
        t2, //导航条父元素的上边距
        h0, //滚动条的高度
        h1;	//滚动条父元素的高度
        h0 = $one_left_nav.height();
        
    $(window).on("scroll", function() {
		
        t0 = $one_left_nav.offset().top;
        t1 = $(document).scrollTop();
        t2 = $one_left_nav.parent().offset().top;
        h1 = $one_left_nav.parent().height();
       
        if(t1 > t2 ) {
            if(t1 + h0 > t2 + h1) {
                setTimeout(function() {
                    $one_left_nav.stop().animate( {"top": h1 - h0} );
                }, 100);
            }
            else {
                setTimeout(function() {
                    $one_left_nav.stop().animate( { "top": t1 - t2} );
                }, 100);
            }
        }
        else {
            setTimeout(function() {
                $one_left_nav.stop().animate( { "top": 0} );
            }, 100);
        }
    });
}// JavaScript Document