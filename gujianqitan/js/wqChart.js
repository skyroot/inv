/**
 * Created by Json on 2014/9/2.
 */

// 对zMobile.js、easingTable.js有依赖
(function () {
	// 画一个扇形的完备要素：圆心，半径，起始角度，终止角度
	// 可选参数： 填充色
	function drawPie( context, x, y, r, startDangle, dAngle, fillstyle ) {
		context.beginPath();
		context.lineWidth = 0;
		context.fillStyle = fillstyle;
		context.moveTo( x, y );
		// 圆弧的起始点
		context.lineTo( x + r * Math.cos( startDangle ) << 0, y + r * Math.sin( startDangle ) << 0 );
		context.arc( x, y, r, startDangle, startDangle + dAngle );
		context.lineTo( x, y );
		context.fill();
	}

	// 画一个扇形图的必备元素：数据、圆心、半径、偏移角度、总角度
	function drawPieChart( context, date, x, y, r, startAngle, angle ) {
		// 根据数据中的value决定每个扇形所占比例
		var offset = 0;
		date.forEach( function ( item ) {
			// 绘制每一个扇形
			drawPie( context, x, y, r, startAngle + offset, angle * item.value, item.color );
			offset = offset + angle * item.value;
		} );
		offset = 0;
	}


	function pieChart( canvas, date, startAngle, totalAngle, offscreen, callback ) {
		var context = canvas.getContext( "2d" );

		function clear() {
			context.clearRect( 0, 0, canvas.width, canvas.height );
		}

		var x = canvas.width / 2, y = canvas.width / 2, r = canvas.width / 2;
		var curStep = 0, totalSteps = 120;
		var animate = Z.requestAnimate( function () {
			curStep = curStep + 1;
			if ( curStep > totalSteps ) {
				animate.stop();
				callback && callback( canvas );
				return;
			}
			clear();
			offscreen && context.drawImage( offscreen, 0, 0, canvas.width, canvas.height );
			drawPieChart( context, date, x, y, r, startAngle, totalAngle * wq.easingEffects.easeOutBounce( curStep / totalSteps ) );
		} );
		return animate;
	}

	!window.wq && (window.wq = {});
	wq.chart = {};
	wq.chart.pieChart = pieChart;

})();