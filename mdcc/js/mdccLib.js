/**
 * Created by Json on 2014/8/1.
 */
(function () {
	function lock( flag ) {
		Z.switchClass( document.body, "lock", flag );
	}

	var scale = Z.TupleString( "scale" ), translate3d = Z.TupleString( "translate3d" );
	var endAction = {
		isExecute : false
	};

	function ScreenSystem( layout ) {
		var layoutHeight = layout.offsetHeight;
		var pages = [];
		var isToEnd = false; // 是否到过最后一张,如果没到过,不能从第一张直接切换到最后一张
		var curIndex = 0;

		Z.loopArray( layout.querySelectorAll( ".page" ), function ( page, i ) {
			page.index = i;
			pages.push( page );
			Z.removeNode( page );
		} );

		function getPage( index ) {
			index = ( index + pages.length ) % pages.length;
			return pages[index];
		}

		Z.onDragV( layout, layout, function ( event ) {
			var curPage = getPage( curIndex );
			var prePage = getPage( curIndex - 1 );
			var nextPage = getPage( curIndex + 1 );

			endAction.isExecute = false;
			layout.appendChild( prePage );
			layout.appendChild( nextPage );
			Z.translate( nextPage, 0, layoutHeight );
			Z.translate( prePage, 0, -layoutHeight );

			// 设置z-index,当前张最低
			Z.css( curPage, "z-index", 0 );
			Z.loopArray( [prePage, nextPage], function ( page ) {
				Z.css( page, "z-index", 1 );
			} );

			function rangeTargetPos( targetPos ) {
				return curIndex === 0 && targetPos > 0 && !isToEnd ? 0 : Z.range( targetPos, -layoutHeight, layoutHeight );
			}

			function move( targetPos ) {
				targetPos = rangeTargetPos( targetPos );

				var ratio = Math.abs( targetPos ) / layoutHeight / 3;
				Z.css( curPage, "transform", [scale( 1 - ratio ),
					translate3d( 0, targetPos < 0 ? -layoutHeight * ratio + "px" : -layoutHeight * ratio + targetPos + "px", 0 )].join( " " ) );
				Z.translate( nextPage, 0, layoutHeight + targetPos );
				Z.translate( prePage, 0, targetPos - layoutHeight );
			}

			event.setMove( move );
			event.onDragEnd( function ( event ) {
				if ( endAction.isExecute ) {
					return;
				}
				// 锁屏
				lock( true );

				// 计算比例,根据比例选择切到哪页
				var ratio = rangeTargetPos( event.targetPos ) / layoutHeight;
				ratio += event.speed > 0 ? 0.5 : -0.5;
				var sign = ratio <= -0.5 ? -1 : ratio <= 0.5 ? 0 : 1;

				Z.moveAnimate( {
					startPos : event.targetPos,
					endPos : sign * layoutHeight,
					duration : 0.2,
					onAnimate : move,
					onEnd : function () {
						curIndex = ( ( curIndex + -sign ) + pages.length ) % pages.length;
						// 仅将当且页留在DOM中,删除其他页
						Z.loopArray( [curPage, prePage, nextPage], function ( page ) {
							if ( page.index !== curIndex ) {
								page.onRemove && page.onRemove();
								Z.removeNode( page );
							}
							else {
								page.onCut && page.onCut();
							}
						} );

						if ( curIndex === pages.length - 1 ) {
							isToEnd = true;
						}
						// 结束锁屏
						lock( false );
					}
				} );

				endAction.isExecute = true;

			} );
		} );
		layout.appendChild( pages[0] );
		pages[0].onCut && pages[0].onCut();
		return{
			isToEnd : function () {
				return isToEnd;
			}
		}
	}

	window.mdcc = {
		ScreenSystem : ScreenSystem
	}
})();