$.ajax({
			type: 'GET',
			url: 'wp-content/themes/countdown/lib/countdown/get-countdown.php',
			dataType: 'json',
			beforeSend : function(){

			},
			success: function(data){

				i = 0;
				$.each(data, function(index, p){

					countDownWrapper = $('.countdown-holster');

					dataTitle = p.project_title;
					dataColor = p.project_color;
					dataDeal = p.big_deal;
					dataDueDate = p.due_date;
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

					countDownWrapper.append('<div class="large-3 columns end" data-title="'+dataTitle+'" data-color="'+dataColor+'" data-deal="'+dataDeal+'">' +

						'<h4>'+dataTitle+'</h4>' + '<p>'+ days_left + ' days</p>' + '<p>'+  +' hours</p>' + '<p>'+ null +' minutes</p>' + '<p>'+ null +' seconds</p>' 

					+ '</div>').children().hide().each(
						function() {
							$(this).css('background-color',$(this).data('color'));
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