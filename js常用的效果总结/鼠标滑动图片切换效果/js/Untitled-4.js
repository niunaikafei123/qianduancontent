// JavaScript Document
$(document).ready(function(){
	var $tab_li = $('#tab2 ul li');
	$tab_li.hover(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		var index = $tab_li.index(this);
		$('div.tab_box > div').eq(index).show().siblings().hide();
	});	
});






$(document).ready(function(){
	var $tab_li = $('#tab5 ul li');
	$tab_li.click(function(){
		$(this).addClass('selected1').siblings().removeClass('selected1');
		var index = $tab_li.index(this);
		$('div.tab_box1> div').eq(index).show().siblings().hide();
	});	
});




$(document).ready(function(){
	var $tab_li = $('#tab7 ul li');
	$tab_li.click(function(){
		$(this).addClass('selected7').siblings().removeClass('selected7');
		var index = $tab_li.index(this);
		$('div.tab_box7> div').eq(index).show().siblings().hide();
	});	
});

$(document).ready(function(){
	var $tab_li = $('#tab8 ul li');
	$tab_li.click(function(){
		$(this).addClass('selected8').siblings().removeClass('selected8');
		var index = $tab_li.index(this);
		$('div.tab_box8> div').eq(index).show().siblings().hide();
	});	
});



$(document).ready(function(){
	var $tab_li = $('#tab9 ul li');
	$tab_li.click(function(){
		$(this).addClass('selected9').siblings().removeClass('selected9');
		var index = $tab_li.index(this);
		$('div.tab_box9> div').eq(index).show().siblings().hide();
	});	
});


