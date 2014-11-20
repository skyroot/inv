/**
 * Created by Json on 2014/8/1.
 */
(function () {
	var pages = document.querySelectorAll( ".page" );
	var layout = document.querySelector( "#layout" );
	var template = Z.HTMLTemplate( document.getElementById( "template" ) );

	var audio = document.querySelector( "audio" );
	var audioLogo = document.querySelector( ".music-logo" );
	var isActiveStop = false;

	Z.onTouchStart( pages[0], function ( e ) {
		e.preventDefault();
		if ( !audio.classList.contains( "play" ) ) {
			// 如果还没有播放过，则播放
			audio.play();
			audioLogo.classList.add( "playing" );
			audio.classList.add( "play" );
		}
	} );

	Z.onTap( audioLogo, function () {
		if ( audioLogo.classList.contains( "playing" ) ) {
			// 如果正在播放则停止
			audioLogo.classList.remove( "playing" );
			audio.pause();
		}
		else {
			// 如果没有播放，则开始播放
			audioLogo.classList.add( "playing" );
			audio.play();
		}
	} );

	pages[0].onMove = function () {
		pages[0].querySelector( ".page1-cloud3" ).classList.add( "hide" );
	};

	Z.insertCSSRules( {
		".page4-thumbnail-item" : {
			width : layout.offsetHeight * 0.18 + "px"
		}
	} );

	Z.loopArray( pages, function ( page, i ) {
		page.onCut = function () {
			page.style.removeProperty( "z-index" );
			page.style.removeProperty( "-webkit-transform" );
			page.style.removeProperty( "transform" );
			i == 0 && page.querySelector( ".page1-cloud3" ).classList.remove( "hide" );
			page.classList.add( "animate" );
		};
		page.onRemove = function () {
			page.classList.remove( "animate" );
		};
	} );

	pages[0].onCut = function () {
		setTimeout( function () {
			pages[0].style.removeProperty( "z-index" );
			pages[0].style.removeProperty( "-webkit-transform" );
			pages[0].style.removeProperty( "transform" );
			pages[0].querySelector( ".page1-cloud3" ).classList.remove( "hide" );
			pages[0].classList.add( "animate" );
		}, 0 );
	};

	// 第四页的横向滑动
	var page4cache = [];
	var page4InnerData = [
		{
			backgroundImg : "img/page4-inner-bg1.jpg",
			intro : "img/page4-inner-intro1.png",
			klass : "page4-inner-intro1"
		},
		{
			backgroundImg : "img/page4-inner-bg2.jpg",
			intro : "img/page4-inner-intro2.png",
			klass : "page4-inner-intro2"
		},
		{
			backgroundImg : "img/page4-inner-bg3.jpg",
			intro : "img/page4-inner-intro3.png",
			klass : "page4-inner-intro3"
		},
		{
			backgroundImg : "img/page4-inner-bg4.jpg",
			intro : "img/page4-inner-intro4.png",
			klass : "page4-inner-intro4"
		},
		{
			backgroundImg : "img/page4-inner-bg5.jpg",
			intro : "img/page4-inner-intro5.png",
			klass : "page4-inner-intro5"
		}
	];

	function setPage4( page ) {
		var heads = [
			{
				img : "img/page4-head1.gif"
			},
			{
				img : "img/page4-head2.gif"
			},
			{
				img : "img/page4-head3.gif"
			},
			{
				img : "img/page4-head4.gif"
			},
			{
				img : "img/page4-head5.gif"
			}
		];
		template.makeList( "page4-thumbnail-item", heads, page.querySelector( ".scroll-content" ), function ( node, data, i ) {
			// 点击后打开内置的页面
			Z.onTap( node, function () {
				// 首先检查是否被缓存了
				if ( page4cache[i] == undefined ) {
					var page = template.make( "page4-inner-page", page4InnerData[i] );
					document.body.appendChild( page );
					page.classList.add( layout.offsetHeight / layout.offsetWidth > 1008 / 640 ? "higher" : "wider" );
					layout.classList.add( "lock" );
					Z.onTouchStart( page, function ( e ) {
						e.preventDefault();
					} );
					setTimeout( function () {
						page.classList.add( "show" );
					}, 0 );
					Z.onTap( page, function () {
						page.classList.remove( "show" );
						layout.classList.remove( "lock" );
						document.body.removeChild( page );
					} );
					page4cache[i] = page;
				}
				else {
					layout.classList.add( "lock" );
					document.body.appendChild( page4cache[i] );
					setTimeout( function () {
						page4cache[i].classList.add( "show" );
					}, 0 );
				}
			} );
		} );
		Z.SwipeListPanel( page.querySelector( ".page4-thumbnail" ) );
	}

	setPage4( pages[3] );

	function setPage5( page ) {
		var resource = ["img/page5-item-1.jpg", "img/page5-item-2.jpg",
			"img/page5-item-3.jpg", "img/page5-item-4.jpg",
			"img/page5-item-5.jpg", "img/page5-item-6.jpg",
			"img/page5-item-7.jpg", "img/page5-item-8.jpg",
			"img/page5-item-9.jpg", "img/page5-item-10.jpg"];
		var pic = page.querySelector( ".page5-pic" );
		Z.loopArray( resource, function ( src ) {
			var border = Z.element( "div", {
				classList : "page5-border"
			}, pic );
			var img = new Image();
			img.src = src;
			border.appendChild( img );
		} );

		Z.onSwipeStartH( document.body, function ( e ) {
			var borders = pic.querySelectorAll( ".page5-border" );
			if ( e.direction ) {
				// 向右滑
				borders[0].classList.add( "remove-right" );
				setTimeout( function () {
					pic.removeChild( borders[0] );
					pic.appendChild( borders[0] );
					borders[0].classList.remove( "remove-right" );
				}, 300 );
			}
			else {
				// 向左滑
				borders[0].classList.add( "remove-left" );
				setTimeout( function () {
					pic.removeChild( borders[0] );
					pic.appendChild( borders[0] );
					borders[0].classList.remove( "remove-left" );
				}, 300 );
			}
		}, {} );
	}

	setTimeout( function () {
		setPage5( pages[4] );
	}, 10 );

	Z.onTap( document.querySelector( ".page6-search" ), function () {
		location.href = "http://weibo.com/p/100808eae485331e4909bf12a827f64b1dc924?k=";
	} );

	setTimeout( function () {
		document.body.removeChild( document.querySelector( ".page-loading" ) );
		rs.ScreenSystem( document.getElementById( "layout" ) );
	}, 3500 );


	Z.onTap( document.querySelector( ".yunqi-logo" ), function () {
		location.href = "http://www.cloud7.com.cn/";
	} );

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

