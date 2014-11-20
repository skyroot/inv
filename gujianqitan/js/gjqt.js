/**
 * Created by Json on 2014/9/3.
 */
(function () {
	var template = Z.HTMLTemplate( document.getElementById( "template" ) );
	var layout = document.querySelector( "#layout" );
	var ss;
	var layoutH = layout.offsetHeight;
	var pages = [];
	Z.ua.ios ? document.body.classList.add( "ios" ) : document.body.classList.add( "not-ios" );
	Z.loopArray( document.querySelectorAll( ".page" ), function ( page, i ) {
		i > 0 && pages.push( page );
	} );
	var page0 = document.querySelectorAll( ".page" )[0];
	Z.insertCSSRules( {
		".page-two .date-chart .item" : {
			height : layoutH * 0.443452 + "px",
			width : layoutH * 0.443452 * 1391 / 496 + "px"
		},
		".page-two .date-chart" : {
			top : layoutH * 0.36309 + "px",
			height : layoutH * 0.443452 + "px"
		},
		".page-three .pie-chart" : {
			height : layoutH * 0.59375 > layout.offsetWidth ? layout.offsetWidth * 0.59375 + "px" : layoutH * 0.37996 + "px",
			width : layoutH * 0.59375 > layout.offsetWidth ? layout.offsetWidth * 0.59375 + "px" : layoutH * 0.37996 + "px"
		},
		".page-one-title" : {
			width : layoutH * 0.1537698 * 512 / 155 + "px"
		},
		".page-two-title" : {
			width : layoutH * 0.19940 * 518 / 201 + "px"
		},
		".page-three-title" : {
			width : layoutH * 0.144404 * 502 / 160 + "px"
		},
		".page-four-title" : {
			width : layoutH * 0.1666667 * 432 / 168 + "px"
		},
		".page-five-title" : {
			width : layoutH * 0.25198 * 258 / 254 + "px"
		},
		".page-six-title" : {
			width : layoutH * 0.15278 * 515 / 154 + "px"
		},
		".page-seven-title" : {
			width : layoutH * 0.2113 * 544 / 213 + "px"
		},
		".page-eight-title" : {
			width : layoutH * 0.1865 * 476 / 188 + "px"
		},
		".page-nine-title" : {
			width : layoutH * 0.15873 * 495 / 159 + "px"
		},
		".page-ten-title" : {
			width : layoutH * 0.20634 * 569 / 208 + "px"
		},
		".page-eight ul li" : {
			width : layout.offsetWidth + "px"
		},
		".page-eight ul" : {
			height : layoutH * 0.3968 + "px"
		},
		".page-eight .banner" : {
			height : layoutH * 0.3968 + "px"
		}
	} );

	//  第2页折线图的横滑
	Z.SwipeListPanel( document.querySelector( ".date-chart" ) );

	// 第3页饼状图数据
	var pcData = [
		{
			value : 0.37,
			color : "#217aa1"
		},
		{
			value : 0.63,
			color : "#fff600"
		}
	];

	var mobileData = [
		{
			value : 0.4,
			color : "#fff600"
		},
		{
			value : 0.6,
			color : "#fcdd30"
		}
	];
	var pieCanvas = document.querySelector( ".pie-chart" );
	pieCanvas.width = layout.offsetWidth * 0.59375;
	pieCanvas.height = layout.offsetWidth * 0.59375;
	var pieAnimate = null;

	// 第0页
	page0.classList.add( "no-visit" );
	page0.onCut = function () {
		page0.classList.add( "animate" );
	};
	page0.onRemove = function () {
		page0.classList.remove( "animate" );
		page0.classList.remove( "no-visit" );
	};

	// 第1页
	pages[0].onCut = function () {
		pages[0].classList.add( "animate" );
	};
	pages[0].onRemove = function () {
		pages[0].classList.remove( "animate" );
	};

	var page2Animate;
	// 第2页
	pages[1].onCut = function () {
		pages[1].classList.add( "animate" );
		// 折线图动画,延迟2秒再做
		var dataChart = pages[1].querySelector( ".date-chart" );
		dataChart.classList.add( "lock" );
		setTimeout( function () {
			var totalSteps = 240;
			var curStep = 0;
			var scrollContent = pages[1].querySelector( ".scroll-content" );
			var width = scrollContent.offsetWidth;
			var width2 = layout.offsetWidth;
			page2Animate = Z.requestAnimate( function () {
				if ( curStep > totalSteps ) {
					dataChart.classList.remove( "lock" );
					page2Animate.stop();
				}
				else {
					Z.css( scrollContent, {
						"-webkit-transform" : "translate3d(" + ((-width + width2 - 48) * curStep / totalSteps ) + "px, 0px, 0px)",
						"transform" : "translate3d(" + ((-width + width2 - 48) * curStep / totalSteps ) + "px, 0px, 0px)"
					} );
					scrollContent.zLeft = ((-width + width2 - 48) * curStep / totalSteps );
					curStep = curStep + 1;
				}
			} );
		}, 2000 );
	};

	pages[1].onRemove = function () {
		pages[1].classList.remove( "animate" );
		page2Animate && page2Animate.stop();
		Z.css( pages[1].querySelector( ".scroll-content" ), {
			"-webkit-transform" : "translate3d(0, 0, 0)",
			"transform" : "translate3d(0, 0, 0)"
		} );
		pages[1].querySelector( ".scroll-content" ).zLeft = 0;
		pages[1].querySelector( ".date-chart" ).classList.remove( "lock" );
	};

	var page2PieAnimateTimeID, page2PieAnimateTimeID2;
	pages[2].onCut = function () {
		page2PieAnimateTimeID = setTimeout( function () {
			pieAnimate = wq.chart.pieChart( pieCanvas, pcData, -Math.PI * 0.24, Math.PI * 2, null, function ( canvas ) {
				// 创建离屏canvas
				var offScreen = Z.element( "canvas" );
				offScreen.width = pieCanvas.width;
				offScreen.height = pieCanvas.height;
				offScreen.getContext( "2d" ).drawImage( canvas, 0, 0, canvas.width, canvas.height );
				page2PieAnimateTimeID2 = setTimeout( function () {
					wq.chart.pieChart( canvas, mobileData, Math.PI / 2, Math.PI * 1.26, offScreen );
				}, 1800 );
			} );
		}, 1000 );
		pages[2].classList.add( "animate" );
	};

	pages[2].onRemove = function () {
		pages[2].classList.remove( "animate" );
		pieAnimate && pieAnimate.stop();
		clearTimeout( page2PieAnimateTimeID );
		clearTimeout( page2PieAnimateTimeID2 );
		pieCanvas.getContext( "2d" ).clearRect( 0, 0, pieCanvas.width, pieCanvas.height );
	};

	pages[3].onCut = function () {
		pages[3].classList.add( "animate" );
	};
	pages[3].onRemove = function () {
		pages[3].classList.remove( "animate" );
	};

	// 第5页
	pages[4].onCut = function () {
		pages[4].classList.add( "animate" );
	};
	pages[4].onRemove = function () {
		pages[4].classList.remove( "animate" );
	};

	// 第6页
	pages[5].onCut = function () {
		pages[5].classList.add( "animate" );
	};
	pages[5].onRemove = function () {
		pages[5].classList.remove( "animate" );
	};

	// 第7页
	pages[6].onCut = function () {
		pages[6].classList.add( "animate" );
	};
	pages[6].onRemove = function () {
		pages[6].classList.remove( "animate" );
	};

	function presetPage7( page ) {
		// 图片点击，展示图片
		var path = "http://gujianqitan.qiniudn.com/page7-pic";
		var cache = [];
		Z.loopArray( page.querySelectorAll( ".page7-image" ), function ( btn, i ) {
			Z.onTap( btn, function () {
				if ( !cache[i] ) {
					// 如果没有缓存就重新生成
					var picWall = Z.element( "div", {
						"classList" : "pic-wall"
					}, document.body );
					var img = new Image();
					img.src = path + (i + 1) + ".jpg";
					picWall.appendChild( img );
					cache[i] = picWall;
					Z.onTap( img, function () {
						document.body.removeChild( picWall );
					} );
				}
				else {
					// 如果有缓存
					document.body.appendChild( cache[i] );
				}
			} );
		} );
	}

	presetPage7( pages[6] );

	// 第8页轮播图
	function page8BannerList() {
		( layoutH * 0.3968 / layout.offsetWidth > 399 / 612 ) && Z.insertCSSRules( {
			".page-eight ul li img.banner-img1" : {
				width : "90%",
				height : "auto"
			},
			".page-eight ul li img.banner-img2" : {
				width : "90%",
				height : "auto"
			}
		} );
	}

	var banner = page8BannerList();

	// 第8页
	pages[7].onCut = function () {
		pages[7].querySelector( ".banner ul" ).classList.remove( "lock" );
		pages[7].classList.add( "animate" );
	};
	pages[7].onRemove = function () {
		pages[7].classList.remove( "animate" );
	};

	// 第9页
	pages[8].onCut = function () {
		pages[8].classList.add( "animate" );
	};
	pages[8].onRemove = function () {
		pages[8].classList.remove( "animate" );
	};

	// 第10页
	pages[9].onCut = function () {
		pages[9].classList.add( "animate" );
	};
	pages[9].onRemove = function () {
		pages[9].classList.remove( "animate" );
	};


	//处理云起logo的问题
	if ( ( location.search.indexOf( "baidu" ) != -1) && (navigator.userAgent.indexOf( "MicroMessenger" ) === -1 ) ) {
		// 如果search中带有baidu，且不是在微信中,不直接显示云起的logo
		pages[9].querySelector( ".yunqi-logo" ).src = "img/open-yunqi-logo.png";
		// 更换图标
		var toYunQi = Z.element( "img", {
			src : "img/to-yunqi.png",
			classList : ["to-yunqi", "hide"]
		}, pages[9] );


		Z.onTap( toYunQi, function () {
			location.href = "http://www.cloud7.com.cn/";
		} );
		Z.onTap( pages[9].querySelector( ".yunqi-logo" ), function () {
			toYunQi.classList.toggle( "hide" );
		} );
		// 改变第10页上的图标
		pages[9].querySelector( ".page10-title" ).src = "img/page10-title-inbaidu.png";
		pages[9].querySelector( ".page-ten-no" ).style.display = "none";
	}
	else {
		// 如果不是在百度视频中打开，直接显示云起的logo
		Z.onTap( pages[9].querySelector( ".yunqi-logo" ), function () {
			location.href = "http://www.cloud7.com.cn/";
		} );
	}

	var downloadInIos = "http://mp.weixin.qq.com/mp/redirect?url=http://itunes.apple.com/cn/app/id588287777",
		downloadInAndroid = "http://baidu.app111.com/app?action=content#appid=588287777&ala";

	if ( (location.search.indexOf( "baidu" ) != -1) && (navigator.userAgent.indexOf( "MicroMessenger" ) === -1 ) ) {
		downloadInIos = "http://m.baidu.com/static/video/super_proxy.html?id=21308&type=tvplay&tonative=1";
		downloadInAndroid = "http://m.baidu.com/static/video/super_proxy.html?id=21308&type=tvplay&tonative=1";
	}
	else {

	}

	Z.onTap( pages[9].querySelector( ".page-ten-logo" ), function () {
		if ( Z.ua.ios ) {
			location.href = downloadInIos;
		}
		else {
			location.href = downloadInAndroid;
		}
	} );

	Z.onTap( pages[9].querySelector( ".page-ten-share" ), function () {
		if ( Z.ua.ios ) {
			location.href = downloadInIos;
		}
		else {
			location.href = downloadInAndroid;
		}
	} );

	function Canvas( width, height ) {
		var canvas = document.createElement( "canvas" );
		var gc = canvas.getContext( "2d" );
		var devicePixelRatio = window.devicePixelRatio || 1,
			backingStoreRatio = gc.webkitBackingStorePixelRatio ||
				gc.mozBackingStorePixelRatio ||
				gc.msBackingStorePixelRatio ||
				gc.oBackingStorePixelRatio ||
				gc.backingStorePixelRatio || 1,
			ratio = devicePixelRatio / backingStoreRatio;

		Z.css( canvas, {
			width : width + "px",
			height : height + "px",
			display : "block"
		} );
		canvas.width = width * ratio;
		canvas.height = height * ratio;
		gc.scale( ratio, ratio );

		canvas.gc = gc;
		return canvas;
	}

	function init() {
		// 如果是ios系统，则有擦屏页，反之没有
		if ( Z.ua.ios ) {
			page0.classList.remove( "animate" );
			var canvas = Canvas( layoutH, layoutH );
			canvas.classList.add( "cover" );
			document.querySelector( ".page-init" ).appendChild( canvas );
			var width = layoutH;
			var width2 = layout.offsetWidth;
			var ctx = canvas.getContext( "2d" );
			var image = new Image();
			image.src = "img/cover.jpg";
			image.onload = function () {
				ctx.drawImage( image, 0, 0, width, width );
				ctx.globalCompositeOperation = 'destination-out';
				document.body.removeChild( document.querySelector( ".page-loading" ) );
				ss = tc.ScreenSystem( document.getElementById( "layout" ) );
			};

			function drawPoint( x, y ) {
				ctx.beginPath();
				var Gradient = ctx.createRadialGradient( x, y, 0, x, y, 50 );
				Gradient.addColorStop( 0, 'rgba(0,0,0,1)' );
				Gradient.addColorStop( 1, 'rgba(0,0,0,1)' );
				ctx.fillStyle = Gradient;
				ctx.arc( x, y, 30, 0, Math.PI * 2, true );
				ctx.fill();
			}

			var touchTimes = 0;

			// 当涂抹面积超过20%、或者是涂抹三次、或者涂抹未满三次但是时间超过3s的话，启动end函数，撤销首页涂抹.
			// end只执行一次
			var isEnd = false;

			function end() {
				if ( isEnd ) {
					return;
				}
				isEnd = true;
				document.body.classList.add( "lock" );
				var totalSteps = 40;
				var curStep = 0;
				var animate = Z.requestAnimate( function () {
					curStep = curStep + 1;
					Z.css( canvas, "opacity", (1 - curStep / totalSteps) );
					if ( curStep > totalSteps ) {
						animate.stop();
						document.body.classList.remove( "lock" );
						layout.removeChild( document.querySelector( ".page-init" ) );
						page0.classList.add( "animate" );
					}
				} );
			}

			function getTransparentPercent( ctx, width, height ) {
				var imgData = ctx.getImageData( 0, 0, width, height ),
					pixles = imgData.data,
					count = 0;
				for ( var i = 0, j = pixles.length; i < j; i += 4 ) {
					if ( pixles[i + 3] < 128 ) {
						count = count + 1;
					}
				}
				return (count / (pixles.length / 4) * 100).toFixed( 2 );
			}

			Z.onTouchStart( canvas, function ( e ) {
				e.preventDefault();
				e.stopPropagation();
				touchTimes = touchTimes + 1;
				e.onTouchMove( function ( e, mx, my ) {
					drawPoint( mx + (width - width2) / 2, my );
				} );
				e.onTouchEnd( function () {
					if ( getTransparentPercent( ctx, width, width ) > 20 || touchTimes === 3 ) {
						// 进入终结模式
						end();
					}
					// 第1次涂抹3秒钟之后会撤销涂抹
					if ( touchTimes === 1 ) {
						setTimeout( function () {
							end();
						}, 3000 );
					}
				} );
			} );
		}
		else {
			// 去掉init页面
			layout.removeChild( document.querySelector( ".page-init" ) );

			setTimeout( function () {
				document.body.removeChild( document.querySelector( ".page-loading" ) );
				ss = tc.ScreenSystem( document.getElementById( "layout" ) );
				document.querySelector( ".page-zero" ).classList.remove( "animate" );
				setTimeout( function () {
					document.querySelector( ".page-zero" ).classList.add( "animate" );
				}, 0 );
			}, 3000 );
		}
	}

	init();
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