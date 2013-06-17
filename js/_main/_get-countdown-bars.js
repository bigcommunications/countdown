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

					$.each(data, function(index, m){
						data[index].start = new Date(data[index].start);
						data[index].end = new Date(data[index].end);
						if(data[index].milestones.length > 0){
							$.each(data[index].milestones, function(subIndex, subM){
								data[index].milestones[subIndex].due_date = new Date(subM.due_date);
							});
						}
					});

					var projects = data;
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
						el.style.marginLeft = Math.round((project.start-oldest)/total_time*100) + '%';
						el.style.marginRight = Math.round((latest-project.end)/total_time*100) + '%';
						el.style.background = project.project_color;

							el.innerHTML = '<span class="start-date"><span class="date">'+(project.start.getMonth()+1) + '/' + project.start.getDate() + '/' + project.start.getFullYear()+'</span></span><span class="end-date"><span class="date">'+(project.end.getMonth()+1) + '/' + project.end.getDate() + '/' + project.end.getFullYear()+'</span></span>';

						if(project.milestones) {
							for(mile_c = 0, mile_l = project.milestones.length; mile_c < mile_l; mile_c++) {
								if(project.milestones[mile_c].due_date >= project.start && project.milestones[mile_c].due_date <= project.end) {
									mile_el = document.createElement('span');
									mile_el.innerHTML = '<span data-tooltip data-width="200" class="has-tip tip-top" title="'+(project.milestones[mile_c].due_date.getMonth()+1) + '/' + project.milestones[mile_c].due_date.getDate() + '/' + project.milestones[mile_c].due_date.getFullYear()+ ' ' + project.milestones[mile_c].milestone+'">.</span>';
									mile_el.className = 'milestone milestone-'+mile_c;
									mile_el.setAttribute('data-milestone', (project.milestones[mile_c].due_date.getMonth()+1) + '/' + project.milestones[mile_c].due_date.getDate() + '/' + project.milestones[mile_c].due_date.getFullYear());
									mile_el.style.left = Math.round((project.milestones[mile_c].due_date.getTime()-project.start)/(project.end-project.start)*100) + '%';
									mile_el.style.zIndex = (mile_c+1);
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
			//Bar Interaction
			var bar = $('.bar');
			bar.on('mouseover', function() {
				var dex = $(this).index();
				var cdown = $('.countdown-holster > div:not(div:nth-child('+(dex+1)+'))');
				cdown.animate({'opacity' : 0.4}, 500);
			});
			bar.on('mouseout', function() {
				var dex = $(this).index();
				var cdown = $('.countdown-holster > div:not(div:nth-child('+(dex+1)+'))');
				cdown.animate({'opacity' : 1}, 500);
			});
			$(document).foundation();
		},
		error: function(){

		}
});