function handleUpdate(due_yr, due_month, due_day, dataID){
 setInterval(
 		function() {
 			var res = calctime(due_yr, due_month, due_day);
 			$('#counter-'+dataID+' .days').html(res.days);
 			$('#counter-'+dataID+' .hours').html(res.hours);
 			$('#counter-'+dataID+' .mins').html(res.minutes);
 			$('#counter-'+dataID+' .secs').html(res.seconds);
 		}, 1000
 );
}
function calctime(y, m, d) {
	var tod = new Date().getTime(),
		due = new Date(y, m, d, 17, 00, 00).getTime();
		days_left = Math.floor((due-tod)/(86400000)),
		hours_left = Math.floor(((due-tod)%(86400000))/(3600000)),
		minutes_left = Math.floor((((due-tod)%(86400000))%(3600000))/(60000)),
		seconds_left = Math.floor((((due-tod)%(86400000))%(3600000))%(60000)/1000);
	return {'days': days_left, 'hours': hours_left, 'minutes': minutes_left, 'seconds': seconds_left};
}
countDownWrapper = $('.countdown-holster');
$.ajax({
			type: 'GET',
			url: 'wp-content/themes/countdown/lib/countdown/get-countdown.php',
			dataType: 'json',
			beforeSend : function(){

			},
			success: function(data){
				i = 0;
				$.each(data, function(index, p){

					var due;
					var days_left;
					var hours_left;
					var minutes_left;
					var seconds_left;

					dataTitle = p.project_title;
					dataColor = p.project_color;
					dataDeal = p.big_deal;
					dataStartDate = new Date(p.start);
					dataDueDate = new Date(p.end);
					dataLink = p.link;
					dataID = p.project_id;
					//Break due date into Year, Month, Day
					due_yr = dataDueDate.getFullYear();
					due_month = dataDueDate.getMonth();
					due_day = dataDueDate.getDate();

					var calcDays = calctime(due_yr, due_month, due_day);
					countDownWrapper.append('<div id="counter-'+dataID+'" class="large-3 columns end" data-id="'+dataID+'" data-title="'+dataTitle+'" data-color="'+dataColor+'" data-deal="'+dataDeal+'">' +

						'<h4><a href="'+dataLink+'">'+dataTitle+'</a></h4>' + '<p><span class="days">'+ calcDays.days + '</span> days</p>' + '<p><span class="hours">'+ calcDays.hours +'</span> hours</p>' + '<p><span class="mins">'+ calcDays.minutes +'</span> minutes</p>' + '<p><span class="secs">'+ calcDays.seconds +'</span> seconds</p>'

					+ '</div>').children().hide().each(
						function() {
							var opacity = 1;
							$(this).find('span').each(function(){
								opacity = opacity-.15;
								$(this).css({
									'color' : $(this).parent().parent().data('color'),
									'opacity' : opacity
								});
							});
						});

						// Update time
						handleUpdate(due_yr, due_month, due_day, dataID);

				});

			},
			complete: function(){
				i = 0;
				countDownWrapper.children().each(function(){
					var item = $(this);
					setTimeout(function(){
						item.fadeIn(800);
						item.find('p').fitText(.65);
					}, 800*i++);
				});
			},
			error: function(){

			}
});