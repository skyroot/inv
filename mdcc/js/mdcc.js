/**
 * Created by Json on 2014/9/3.
 */
(function () {
	var template = Z.HTMLTemplate( document.getElementById( "template" ) );
	var layout = document.querySelector( "#layout" );
	var pages = document.querySelectorAll( ".page" );
	var Height = layout.offsetHeight;
	var musicLogo = document.querySelector( ".music-logo" );
	var audio = document.querySelector( "audio" );
	Z.insertCSSRules( {
		".page-eleven-border" : {
			width : Height * 475 / 1136 + "px"
		},
		".page-thumbnail-item" : {
			width : layout.offsetWidth + "px"
		}
	} );


	function musicSwitch() {
		musicLogo.classList.contains( "playing" ) ? audio.pause() : audio.play();
		musicLogo.classList.toggle( "playing" );
	}

	var isStart = false;

	Z.onTouchStart( pages[0], function () {
		if ( !isStart ) {
			musicSwitch();
			isStart = true;
		}
	} );

	Z.onTap( musicLogo, function () {
		musicSwitch();
	}, {} );

	var page0animate;
	pages[0].onCut = function () {
		this.classList.add( "animate" );
		var step = 60;
		var curStep = 0;
		var word = pages[0].querySelector( ".page1-word" );
		setTimeout( function () {
			page0animate = Z.requestAnimate( function () {
				if ( curStep > step ) {
					return;
				}
				Z.css( word, {
					"-webkit-transform" : "translate3d(-50%, 0, 0) perspective(1000px) rotateX(" + (90 - 90 * wq.easingEffects.easeOutBounce( curStep / step )) + "deg)"
				} );
				curStep = curStep + 1;
			} );
		}, 500 );
	};
	pages[0].onRemove = function () {
		this.classList.remove( "animate" );
		page0animate && page0animate.stop();
		Z.css( pages[0].querySelector( ".page1-word" ), {
			"-webkit-transform" : "translate3d(-50%, 0, 0) perspective(1000px) rotateX(90deg)"
		} );
	};


	pages[1].onCut = function () {
		this.classList.add( "animate" );
	};
	pages[1].onRemove = function () {
		this.classList.remove( "animate" );
	};


	//	第3页
	var page3animate;
	pages[2].onCut = function () {
		this.classList.add( "animate" );
		var word = pages[2].querySelector( ".page3-word" );
		var address = pages[2].querySelector( ".page3-address" );
		var curStep = 0;
		var step = 40;
		page3animate = Z.requestAnimate( function () {
			if ( curStep > step ) {
				return;
			}
			Z.css( word, {
				"-webkit-transform" : "translate3d(" + (-150 + 100 * curStep / step ) + "%, 0, 0)"
			} );
			Z.css( address, {
				"-webkit-transform" : "translate3d(" + (-250 + 200 * curStep / step) + "%, " + (-150 + 150 * wq.easingEffects.easeOutBounce( curStep / step )) + "px, 0)  "
			} );
			curStep = curStep + 1;
		} );
	};
	pages[2].onRemove = function () {
		this.classList.remove( "animate" );
		var word = pages[2].querySelector( ".page3-word" );
		var address = pages[2].querySelector( ".page3-address" );
		page3animate && page3animate.stop();
		Z.css( word, {
			"-webkit-transform" : "translate3d(-250%, 0, 0)"
		} );
		Z.css( address, {
			"-webkit-transform" : "translate3d(-250%, 0, 0)"
		} );
	};

	pages[3].onCut = function () {
		this.classList.add( "animate" );
	};
	pages[3].onRemove = function () {
		this.classList.remove( "animate" );
	};


	pages[4].onCut = function () {
		this.classList.add( "animate" );
	};
	pages[4].onRemove = function () {
		this.classList.remove( "animate" );
	};


	function presetPage5() {
		var imgs = [
			{
				img : "img/page6-word1.jpg"
			},
			{
				img : "img/page6-word2.jpg"
			},
			{
				img : "img/page6-word3.jpg"
			},
			{
				img : "img/page6-word4.jpg"
			}
		];
		template.makeList( "page-thumbnail-item", imgs, pages[5].querySelector( ".scroll-content" ), function ( node, data ) {
		} );
		Z.SwipeListPanel( pages[5].querySelector( ".page6-thumbnail" ) );
	}

	presetPage5();

	pages[5].onCut = function () {
		this.classList.add( "animate" );

	};
	pages[5].onRemove = function () {
		this.classList.remove( "animate" );
	};


	pages[6].onCut = function () {
		this.classList.add( "animate" );
	};
	pages[6].onRemove = function () {
		this.classList.remove( "animate" );
	};


	function presetPage7() {
		var imgs = [
			{
				img : "img/page8-word1.jpg"
			},
			{
				img : "img/page8-word2.jpg"
			},
			{
				img : "img/page8-word3.jpg"
			}
		];
		template.makeList( "page-thumbnail-item", imgs, pages[7].querySelector( ".scroll-content" ), function ( node, data ) {
		} );
		Z.SwipeListPanel( pages[7].querySelector( ".page8-thumbnail" ) );
	}

	presetPage7();
	pages[7].onCut = function () {
		this.classList.add( "animate" );

	};
	pages[7].onRemove = function () {
		this.classList.remove( "animate" );
	};

	pages[8].onCut = function () {
		this.classList.add( "animate" );
	};
	pages[8].onRemove = function () {
		this.classList.remove( "animate" );
	};



	function presetPage9() {
		var imgs = [
			{
				img : "img/page10-title.jpg"
			},
			{
				img : "img/page10-title2.jpg"
			},
			{
				img : "img/page10-title3.jpg"
			},
			{
				img : "img/page10-title4.jpg"
			}
		];
		template.makeList( "page-thumbnail-item", imgs, pages[9].querySelector( ".scroll-content" ), function ( node, data ) {
		} );
		Z.SwipeListPanel( pages[9].querySelector( ".page10-thumbnail" ) );
	}

	presetPage9();
	pages[9].onCut = function () {
		this.classList.add( "animate" );

	};
	pages[9].onRemove = function () {
		this.classList.remove( "animate" );
	};

	pages[10].onCut = function () {
		this.classList.add( "animate" );
	};
	pages[10].onRemove = function () {
		this.classList.remove( "animate" );
	};

	Z.onTap( document.querySelector( ".page11-href" ), function () {
		location.href = "http://mdcc.csdn.net/";
	} );

	Z.onTap( document.querySelector( ".page11-href" ), function () {
		location.href = "http://mdcc.csdn.net/";
	} );
	Z.onTap( document.querySelector( ".yunqi-logo" ), function () {
		location.href = "http://www.cloud7.com.cn/";
	} );

	setTimeout( function () {
		document.body.removeChild( document.querySelector( ".page-loading" ) );
		mdcc.ScreenSystem( document.getElementById( "layout" ) );
		audio.src = "music/bg.mp3";
	}, 2500 );

})();


document.addEventListener( 'WeixinJSBridgeReady', function () {
	var WeixinJSBridge = window.WeixinJSBridge;

	// 发送给好友;
	WeixinJSBridge.on( 'menu:share:appmessage', function () {
		WeixinJSBridge.invoke( 'sendAppMessage', {
			"appid" : dataForWeixin.appId,
			"img_url" : dataForWeixin.picture,
			"img_width" : "120",
			"img_height" : "120",
			"link" : dataForWeixin.url,
			"desc" : dataForWeixin.desc,
			"title" : dataForWeixin.title
		}, function ( res ) {
		} );
	} );

	// 分享到朋友圈;
	WeixinJSBridge.on( 'menu:share:timeline', function () {
		WeixinJSBridge.invoke( 'shareTimeline', {
			"img_url" : dataForWeixin.picture,
			"img_width" : "120",
			"img_height" : "120",
			"link" : dataForWeixin.url,
			"desc" : dataForWeixin.desc,
			"title" : dataForWeixin.title
		}, function ( res ) {
		} );
	} );

	// 分享到微博;
	WeixinJSBridge.on( 'menu:share:weibo', function () {
		WeixinJSBridge.invoke( 'shareWeibo', {
			"content" : dataForWeixin.title + ' ' + dataForWeixin.url,
			"url" : dataForWeixin.url
		}, function ( res ) {
		} );
	} );

	// 分享到Facebook
	WeixinJSBridge.on( 'menu:share:facebook', function () {
		WeixinJSBridge.invoke( 'shareFB', {
			"img_url" : dataForWeixin.picture,
			"img_width" : "120",
			"img_height" : "120",
			"link" : dataForWeixin.url,
			"desc" : dataForWeixin.desc,
			"title" : dataForWeixin.title
		}, function ( res ) {
		} );
	} );
}, false );
