<?php
include('../../../../../wp-load.php');

$args = array(
	'post_type' => 'countdown',
	'post_status' => 'publish',
	'posts_per_page' => -1,
	'orderby' => 'meta_value',
	'meta_key' => 'due_date',
	'order' => 'ASC'
);

$projects = new WP_Query($args);

if($projects->have_posts()):

$projectCountdown = array();

	while($projects->have_posts()):$projects->the_post();
		global $post;
		$title = get_the_title($post->ID);
		$big_deal = get_post_meta($post->ID, 'is_this_a_big_deal', true);
		$project_color = get_post_meta($post->ID, 'project_color', true);
		$start_date = date('r', strtotime(get_post_meta($post->ID, 'start_date', true)));
		$due_date = date('r', strtotime(get_post_meta($post->ID, 'due_date', true)));
		$milestones = get_field('milestones', $post->ID);

		foreach($milestones as $index => $value){
			$milestones[$index]["due_date"] = date('r', strtotime($value["due_date"]));
		}

		$projectCountdown[] = array(
			'project_title' => $title,
			'big_deal' => $big_deal,
			'project_color' => $project_color,
			'start' => $start_date,
			'end' => $due_date,
			'project_id' => $post->ID,
			'link' => get_permalink($post->ID),
			'milestones' => $milestones
		);

	endwhile;

	$projectCountdown = json_encode($projectCountdown);
	echo $projectCountdown;

endif;