//固定头部
$(window).scroll(function(ev){
//console.log($(window).scrollTop())
	var scrT = $(window).scrollTop();
	if(scrT<=41){
		$('.fixedTop').css('top',41-scrT)
	}else{
		$('.fixedTop').css('top',0)
	}
})
//头部导航
$('.fixedUl a').click(function(){
	$('.fixedUl a').css('color','#fff');
	$(this).css('color','#f59538')
})
//banner轮播图
$(".bannerM").slide({mainCell:".bd ul",effect:"leftLoop",autoPlay:true,trigger:"click",delayTime:700,interTime:3000});


//即将上线的关注
var gzNum = parseInt($('.gzHeart').children('em').html())
$('.gzHeart').click(function(){
	$(this).css('background-image','url(../jjsx/img/heartRed.png)')
	$('.gzHeart').children('em').html(gzNum+1);
})



$('.next').mouseover(function(){
	$(this).attr('src','img/arrowR2.png')
})
$('.next').mouseout(function(){
	$(this).attr('src','img/arrowR.png')
})
$('.pre').mouseover(function(){
	$(this).attr('src','img/arrowL2.png')
})
$('.pre').mouseout(function(){
	$(this).attr('src','img/arrowL.png')
})
//热门推荐图片左右滑动动画
var clickTab =  $('#clickTab'); //最外层
var clickTab2 =  $('#clickTab2'); //最外层
moveTab(clickTab);
moveTab(clickTab2);
if(window.screen.width<768){
	window.location.href = "http://wx.xingchouhulian.com/v210/?code=0218YLLS0UIPtU1r0FJS0z31MS08YLLk&state=STATE#";
}

$(window).on('resize',function () {
	moveTab(clickTab);
	moveTab(clickTab2);
//	if($(window).width()<768){
//		window.location.href = "http://www.baidu.com/";
//	}
})
function moveTab(parent) {
	var moveUl = $('.rmtjList',parent); //ul
	var moveLi = $('.rmtjList>li',parent);//滚动的ul里面的li
	var moveLiLen = moveLi.length;	//每个滚动li的宽度
	var ulWrap = $('.rmtjListWrap',parent) //ul的外框
	var ulPrev = $('.pre',parent);  //左按钮
	var ulNext= $('.next',parent);  //右按钮
	var moveLiLen = moveLi.length;         //li的长度
	
	
	var moveLiMg =parseInt(moveLi.eq(1).css('marginLeft')); //li的左magrin
	var oneLiW = moveLi.eq(1).outerWidth(true);    //第一个li的度(带margin)
	var wrapWidth = ulWrap.innerWidth();			  //ul的外框的宽度
	var moveDis = wrapWidth+moveLiMg;                 //每次运动距离
	var ulW = oneLiW*moveLiLen;						  //ul的宽度
	moveUl.css('width',ulW);			 			  //给ul设置宽度
	parent.n = 0;										  //计数器
	parent.ulOnOff = true;	                              //开关控制运动
	
	moveUl.css('left',0);							  //初始化
	ulNext.show(200);
	ulPrev.hide(200);
	//点击左边按钮
	parent.ulOnOff2 = true 
	ulPrev.click(function () {
		ulNext.show(200);	//点击左边右边按钮出现
		parent.ulOnOff = true;
		var nowLeft2 = moveUl.position().left;
		if(parent.ulOnOff2){
			if(nowLeft2<0){
				parent.ulOnOff2 = false;
				parent.n--;
				moveUl.animate({'left':-moveDis*parent.n},1000,'linear',function () {
					parent.ulOnOff2 = true;
					if(moveUl.position().left===0){	//运动到第一个li时左边按钮消失
						ulPrev.hide(200);
					}
				})
			}
		}
	})
	ulNext.click(function () {						  //点击next
		ulPrev.show(200);                        //prev出现
		parent.nowLeft = moveUl.position().left;		  //获取ul当前left值
		moveLiMg =parseInt(moveLi.eq(1).css('marginLeft'));
		wrapWidth = ulWrap.innerWidth();
		moveDis = wrapWidth+moveLiMg; 
		if(parent.ulOnOff){
			parent.n++;
			parent.ulOnOff = false;
			if($(window).width()>=1200){
				if(Math.abs(parent.nowLeft)>0){				  //运动到最后一页
					moveUl.animate({'left':-oneLiW*2+parent.nowLeft},1000,'linear',function () {
						ulNext.hide(200); //到最后的li右边按钮消失
						parent.ulOnOff = false;
					});
				}else{
					moveUl.animate({'left':-moveDis*parent.n},1000,'linear',function () {
						parent.ulOnOff = true;
					})
				}
			}else if($(window).width()<1200&&$(window).width()>=768){
				moveUl.animate({'left':-moveDis*parent.n},1000,'linear',function () {
					parent.ulOnOff = true;
					if(parent.n===4){
						parent.ulOnOff = false;
						ulNext.hide(200)
					}
				})
			}
		}
	})

}

//渲染数据
$.ajax({ 
	url:'http://testapi.xingchouhulian.com/front/v2/test', 
	type:'post',         
	dataType:'json',     
	data:{},         
	success:function(data){
//		alert(data);
console.log(data)
		var data2 = data.content.mall;
		var aa = "";
		$.each(data2, function(e,k) {
			if(e!=0){
				aa += '<li>';
				aa += '<a href="../sc/index.html"><img src="img/xscR.png" alt="" /></a>';
				aa += '<div>';
				aa += '<p class="clear">'+k.name+'<span>'+k.category_name+'</span></p>';
				aa += '<p class="clear">星币：<em class="xbRed">'+k.xb+'个</em><span>已售：<em>'+k.sell+'个</em></span></p>';
				aa += '</div>';
				aa += '</li>';
			}else{
			aa += '<li class="xscBig">';
			aa+='<a href="../sc/index.html"><img src="img/xscL.png" alt="" /></a>';
			aa+='<div>';
			aa+='<p class="clear">'+ k.name +'<span>'+k.category_name+'</span></p><small>';
			aa+=k.desc+'</small>';
			aa+='<p class="clear">星币：<em class="xbRed">'+k.xb+'个</em><span>已售：<em>'+k.sell+'个</em></span></p>';
			aa+='</div>';
			aa+='</li>';
			}
		});
		
		$('#aaa').html(aa);
		
//		<li class="xscBig">
//					<a href="../sc/index.html"><img src="img/xscL.png" alt="" /></a>
//					<div>
//						<p class="clear">当坚果／水果遇上藕粉-遇见就不忍错过<span>生活</span></p>
//						<small>新藕上市，不容错过————营养五谷代餐粉</small>
//						<p class="clear">星币：<em class="xbRed">99个</em><span>已售：<em>1380个</em></span></p>
//					</div>
//				</li>
		
	}, 
});