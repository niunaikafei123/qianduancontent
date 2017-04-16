/**
 * @classDescription 濡剝瀚橫arquee閿涘本妫ら梻瀛樻焽濠婃艾濮╅崘鍛啇
 * @author Aken Li(www.kxbd.com)
 * @DOM
 *  	<div id="marquee">
 *  		<ul>
 *   			<li></li>
 *   			<li></li>
 *  		</ul>
 *  	</div>
 * @CSS
 *  	#marquee {overflow:hidden;width:200px;height:50px;}
 * @Usage
 *  	$("#marquee").kxbdMarquee(options);
 * @options
 *		isEqual:true,		//閹碘偓閺堝绮撮崝銊ф畱閸忓啰绀岄梹鍨啍閺勵垰鎯侀惄鍝ョ搼,true,false
 *  	loop:0,				//瀵邦亞骞嗗姘З濞嗏剝鏆熼敍锟�0閺冭埖妫ら梽锟�
 *		direction:"left",	//濠婃艾濮╅弬鐟版倻閿涳拷"left","right","up","down"
 *		scrollAmount:1,		//濮濄儵鏆�
 *		scrollDelay:20		//閺冨爼鏆�
 */
(function($){
	$.fn.kxbdMarquee=function(options){
		var opts=$.extend({},$.fn.kxbdMarquee.defaults, options);

		return this.each(function(){
			var $marquee=$(this);				//濠婃艾濮╅崗鍐鐎圭懓娅�
			var _scrollObj=$marquee.get(0);		//濠婃艾濮╅崗鍐鐎圭懓娅扗OM
			var scrollW=$marquee.width();		//濠婃艾濮╅崗鍐鐎圭懓娅掗惃鍕啍鎼达拷
			var scrollH=$marquee.height();		//濠婃艾濮╅崗鍐鐎圭懓娅掗惃鍕彯鎼达拷
			var $element=$marquee.children();	//濠婃艾濮╅崗鍐
			var $kids=$element.children();		//濠婃艾濮╃€涙劕鍘撶槐 
			var scrollSize=0;					//濠婃艾濮╅崗鍐鐏忓搫顕�

			//濠婃艾濮╃猾璇茬€烽敍锟�1瀹革箑褰搁敍锟�0娑撳﹣绗�
			var _type=(opts.direction=="left"||opts.direction=="right") ? 1:0;

			//闂冨弶顒涘姘З鐎涙劕鍘撶槐鐘崇槷濠婃艾濮╅崗鍐鐎瑰€熲偓灞藉絿娑撳秴鍩岀€圭偤妾姘З鐎涙劕鍘撶槐鐘差啍鎼达拷
			$element.css(_type?"width":"height",10000);

			//閼惧嘲褰囧姘З閸忓啰绀岄惃鍕槀鐎碉拷
			if(opts.isEqual){
				scrollSize=$kids[_type?"outerWidth":"outerHeight"]()*$kids.length;
			}else{
				$kids.each(function(){
					scrollSize+=$(this)[_type?"outerWidth":"outerHeight"]();
				});
			};

			//濠婃艾濮╅崗鍐閹鏄傜€电鐨禍搴☆啇閸ｃ劌鏄傜€甸潻绱濇稉宥嗙泊閸旓拷
			if(scrollSize<(_type?scrollW:scrollH)){return;}; 

			//閸忓娈曞姘З鐎涙劕鍘撶槐鐘茬殺閸忚埖褰冮崗銉ュ煂濠婃艾濮╅崗鍐閸氬函绱濋獮鎯邦啎鐎规碍绮撮崝銊ュ帗缁辩姴顔旀惔锟�
			$element.append($kids.clone()).css(_type?"width":"height",scrollSize*2);

			var numMoved=0;
			function scrollFunc(){
				var _dir=(opts.direction=="left"||opts.direction=="right") ? "scrollLeft":"scrollTop";
				if (opts.loop>0) {
					numMoved+=opts.scrollAmount;
					if(numMoved>scrollSize*opts.loop){
						_scrollObj[_dir]=0;
						return clearInterval(moveId);
					};
				};

				if(opts.direction=="left"||opts.direction=="up"){
					var newPos=_scrollObj[_dir]+opts.scrollAmount;
					if(newPos>=scrollSize){
						newPos-=scrollSize;
					}
					_scrollObj[_dir]=newPos;
				}else{
					var newPos=_scrollObj[_dir]-opts.scrollAmount;
					if(newPos<=0){
						newPos += scrollSize;
					};
					_scrollObj[_dir]=newPos;
				};
			};

			//濠婃艾濮╁鈧慨锟�
			var moveId=setInterval(scrollFunc, opts.scrollDelay);

			//姒х姵鐖ｉ崚鎺曠箖閸嬫粍顒涘姘З
			$marquee.hover(function(){
				clearInterval(moveId);
			},function(){
				clearInterval(moveId);
				moveId=setInterval(scrollFunc, opts.scrollDelay);
			});
		});
	};

	$.fn.kxbdMarquee.defaults={
		isEqual:true,		//閹碘偓閺堝绮撮崝銊ф畱閸忓啰绀岄梹鍨啍閺勵垰鎯侀惄鍝ョ搼,true,false
		loop: 0,			//瀵邦亞骞嗗姘З濞嗏剝鏆熼敍锟�0閺冭埖妫ら梽锟�
		direction: "left",	//濠婃艾濮╅弬鐟版倻閿涳拷"left","right","up","down"
		scrollAmount:1,		//濮濄儵鏆�
		scrollDelay:70		//閺冨爼鏆�

	};

	$.fn.kxbdMarquee.setDefaults=function(settings) {
		$.extend( $.fn.kxbdMarquee.defaults, settings );
	};
})(jQuery);

