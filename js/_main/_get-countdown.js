$.ajax({
			type: 'GET',
			url: 'wp-content/themes/countdown/lib/countdown/get-countdown.php',
			dataType: 'json',
			beforeSend : function(){

			},
			success: function(data){
				var due;
				var days_left;
				var hours_left;
				var minutes_left;
				var seconds_left;
				i = 0;
				$.each(data, function(index, p){

					countDownWrapper = $('.countdown-holster');

					dataTitle = p.project_title;
					dataColor = p.project_color;
					dataDeal = p.big_deal;
					dataDueDate = p.due_date;
					dataLink = p.link;
					dataID = p.project_id;
					//Break due date into Year, Month, Day
					due_yr = dataDueDate.substring(0,4);
					due_month = dataDueDate.substring(4,6) - 1;
					due_day = dataDueDate.substring(6);
					function calctime(y, m, d, h, i, s) {
						var tod = new Date().getTime(),
							due = new Date(due_yr, due_month, due_day, 00, 00, 00).getTime();
							days_left = Math.floor((due-tod)/(86400000)),
							hours_left = Math.floor(((due-tod)%(86400000))/(3600000)),
							minutes_left = Math.floor((((due-tod)%(86400000))%(3600000))/(60000)),
							seconds_left = Math.floor((((due-tod)%(86400000))%(3600000))%(60000)/1000);
						return {'days': days_left, 'hours': hours_left, 'minutes': minutes_left, 'seconds': seconds_left};
					}

					// setInterval(
					// 		function() {
					// 			var res = calctime(2013, 5, 11, 18, 00, 00);
					// 			document.getElementById('days').innerHTML = res.days;
					// 			document.getElementById('hours').innerHTML = res.hours;
					// 			document.getElementById('minutes').innerHTML = res.minutes;
					// 			document.getElementById('seconds').innerHTML = res.seconds;
					// 		}, 1000
					// 	);

					countDownWrapper.append('<div class="large-3 columns end" data-id="'+dataID+'" data-title="'+dataTitle+'" data-color="'+dataColor+'" data-deal="'+dataDeal+'">' +

						'<h4><a href="'+dataLink+'">'+dataTitle+'</a></h4>' + '<p><span>'+ days_left + '</span> days</p>' + '<p><span>'+ null +'</span> hours</p>' + '<p><span>'+ null +'</span> minutes</p>' + '<p><span>'+ null +'</span> seconds</p>'

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