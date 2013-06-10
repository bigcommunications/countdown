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
					due_month = dataDueDate.substring(4,6);
					due_day = dataDueDate.substring(6);
					//console.log(due_yr + ' ' + due_month + ' ' + due_day);
					//Date + Time Right Now
					d = new Date();
					//Newly constructed Due Date
					x = new Date(due_yr,due_month,due_day, 00,00,00);
					//NEED MATH TO ACTUALLY GET THE RIGHT NUMBERS
					diff_days = Math.abs((d.getTime() - x.getTime())/(24*60*60*1000));
					//THIS IS WAY OFF. Trying to figure out how to turn the remainder of diff_days into hours.
					diff_hours = diff_days.toString().split('.')[1] / (24*60*60*1000);

					countDownWrapper.append('<div class="large-3 columns end" data-title="'+dataTitle+'" data-color="'+dataColor+'" data-deal="'+dataDeal+'">' +

						'<h4>'+dataTitle+'</h4>' + '<p>'+ Math.floor(diff_days) + ' days</p>' + '<p>'+ null +' hours</p>' + '<p>'+ null +' minutes</p>' + '<p>'+ null +' seconds</p>' 

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