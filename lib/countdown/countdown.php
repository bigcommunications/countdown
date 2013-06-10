<?php
/**
 *
 * Countdown
 *
 *
 * since: Countdown v 0.0.1
*/

function countdown() {

	$labels = array(
		'name' => _x('Countdown', 'post type general name'),
		'singular_name' => _x('Project', 'post type singular name'),
		'add_new' => _x('Add New Project', 'Project'),
		'add_new_item' => __('Projectd Projects'),
		'edit_item' => __('Edit Project'),
		'new_item' => __('New Project'),
		'view_item' => __('View Project'),
		'search_items' => __('Search Projects'),
		'not_found' =>  __('Nothing found'),
		'not_found_in_trash' => __('Nothing found in Trash'),
		'parent_item_colon' => '',
		'menu_name' => 'Countdown'
	);

	$args = array(
		'labels' => $labels,
		'public' => true,
		'publicly_queryable' => true,
		'show_ui' => true,
		'query_var' => true,
		'rewrite' => array('slug' => 'countdown/project'),
		'capability_type' => 'post',
		'hierarchical' => false,
		'supports' => array('title'),
        'show_in_nav_menus' => false,
        'exclude_from_search' => true
    //'show_in_menu' => 'main-options'
	  );

	register_post_type( 'countdown' , $args );
}
add_action('init', 'countdown');

/* ---------------------------------------------------------------------*/

//add filter to ensure the text Project, or Countdown, is displayed when user updates a Project
add_filter('post_updated_messages', 'countdown_updated_messages');
function countdown_updated_messages( $messages ) {
  global $post, $post_ID;

  $messages['countdown'] = array(
    0 => '', // Unused. Messages start at index 1.
    1 => sprintf( __('Project updated. <a href="%s">View Project</a>'), esc_url( get_permalink($post_ID) ) ),
    2 => __('Custom field updated.'),
    3 => __('Custom field deleted.'),
    4 => __('Project updated.'),
    /* translators: %s: date and time of the revision */
    5 => isset($_GET['revision']) ? sprintf( __('Project restored to revision from %s'), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
    6 => sprintf( __('Project published. <a href="%s">View Project</a>'), esc_url( get_permalink($post_ID) ) ),
    7 => __('Project saved.'),
    8 => sprintf( __('Project submitted. <a target="_blank" href="%s">Preview Project</a>'), esc_url( add_query_arg( 'preview', 'true', get_permalink($post_ID) ) ) ),
    9 => sprintf( __('Project scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Project</a>'),
      // translators: Publish box date format, see http://php.net/date
      date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( get_permalink($post_ID) ) ),
    10 => sprintf( __('Project draft updated. <a target="_blank" href="%s">Preview Project</a>'), esc_url( add_query_arg( 'preview', 'true', get_permalink($post_ID) ) ) ),
  );

  return $messages;
}

// changes the "Enter title here" to "Enter question here" for FAQs
add_filter('gettext', 'countdown_rewrites', 10, 4);
function countdown_rewrites($translation, $text, $domain) {
	global $post;
        if ( ! isset( $post->post_type ) ) {
            return $translation;
        }
	$translations = &get_translations_for_domain($domain);
	$translation_array = array();

	switch ($post->post_type) {
		case 'countdown': // enter your post type name here
			$translation_array = array(
				'Enter title here' => 'Project Title'
			);
			break;
	}

	if (array_key_exists($text, $translation_array)) {
		return $translations->translate($translation_array[$text]);
	}
	return $translation;
}
