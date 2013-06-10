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

					countDownWrapper.append('<div class="large-3 columns end" data-title="'+dataTitle+'" data-color="'+dataColor+'" data-deal="'+dataDeal+'">' +

						'<h3>'+dataTitle+'</h3>'

					+ '</div>').children().hide();

				});

			},
			complete: function(){
				i = 0;
				countDownWrapper.children().each(function(){
					var item = $(this);
					setTimeout(function(){
						item.fadeIn(800);
					}, 800*i++);
				});

			},
			error: function(){

			}
});