$.ajax({
			type: 'GET',
			url: 'wp-content/themes/countdown/lib/countdown/get-countdown.php',
			dataType: 'json',
			beforeSend : function(){

			},
			success: function(data){
				(function() {
					function update() {
						today = new Date();
						document.getElementById('today').style.left = ((today.getTime()-oldest)/total_time*100) + '%';
					}
					var projects = [
								{
									'title': 'Montevallo', 'color': 'purple', 'start': new Date(2012, 9, 1), 'end': new Date(2013, 7, 5),
									'milestones': [new Date(2013, 4, 1), new Date(2013, 6, 14), new Date(2013, 7, 1)]
								},
								{
									'title': 'JNN', 'color': '#BF301A', 'start': new Date(2013, 1, 1), 'end': new Date(2013, 7, 14),
									'milestones': [new Date(2013, 4, 1), new Date(2013, 6, 14), new Date(2013, 7, 1)]
								},
								{
									'title': 'Big', 'color': '#FD7B07', 'start': new Date(2013, 5, 1), 'end': new Date(2014, 4, 1),
									'milestones': [new Date(2013, 8, 1), new Date(2013, 9, 20), new Date(2014, 2, 7)]
								},
								{
									'title': 'I Choose B', 'color': '#ED5C4B', 'start': new Date(2013, 4, 1), 'end': new Date(2014, 7, 1),
									'milestones': [new Date(2013, 5, 1), new Date(2013, 5, 20), new Date(2013, 7, 7)]
								}
							];
						var	container = document.getElementById('bars'),
						today = new Date(),
						oldest = new Date(),
						latest = new Date(),
						l = projects.length,
						c, project, el, total_time,
						mile_c, mile_l, mile_el;

					for(c = 0; c < l; c++) {
						project = projects[c];
						if(project.start < oldest) {
							oldest = project.start;
						}
						if(project.end > latest) {
							latest = project.end;
						}
					}

					total_time = latest.getTime()-oldest.getTime();

					for(c = 0; c < l; c++) {
						project = projects[c];
						el = document.createElement('div');
						el.className = 'bar';
						el.title = project.title;
						el.style.marginLeft = Math.round((project.start-oldest)/total_time*100) + '%';
						el.style.marginRight = Math.round((latest-project.end)/total_time*100) + '%';
						el.style.background = project.color;
						if(project.milestones) {
							for(mile_c = 0, mile_l = project.milestones.length; mile_c < mile_l; mile_c++) {
								if(project.milestones[mile_c] >= project.start && project.milestones[mile_c] <= project.end) {
									mile_el = document.createElement('div');
									mile_el.className = 'milestone';
									mile_el.style.left = Math.round((project.milestones[mile_c].getTime()-project.start)/(project.end-project.start)*100) + '%';
									el.appendChild(mile_el);
								}
							}
						}

						container.appendChild(el);
					}

					el = document.createElement('div');
					el.id = 'today';
					el.style.left = Math.round((today.getTime()-oldest)/total_time*100) + '%';
					el.innerHTML = '<span class="date">' + (today.getMonth()+1) + '/' + (today.getDate()) + '/' + (today.getFullYear()) + '</span>';
					container.appendChild(el);

					el = document.createElement('div');
					el.id = 'oldest';
					el.style.left = '0';
					el.innerHTML = '<span class="date">' + (oldest.getMonth()+1) + '/' + (oldest.getDate()) + '/' + (oldest.getFullYear()) + '</span>';
					container.appendChild(el);

					el = document.createElement('div');
					el.id = 'latest';
					el.style.right = '0';
					el.innerHTML = '<span class="date">' + (latest.getMonth()+1) + '/' + (latest.getDate()) + '/' + (latest.getFullYear()) + '</span>';
					container.appendChild(el);
					setInterval(update, 600000);
				})();
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