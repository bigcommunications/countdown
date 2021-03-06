<?php
/**
 * Scripts and stylesheets
 *
 * Enqueue following stylesheets:
 * 1. /theme/assets/css/screen.css (preprocessed and compressed)
 * 2. /theme/assets/css/print.css
 * 3. /child-theme/style.css (if a child theme is activated)
 *
 * Enqueue scripts in the following order:
 * 1. /theme/assets/js/vendor/modernizr-2.6.2.min.js  (in head.php)
 * 2. jquery-1.8.2.min.js via Google CDN              (in head.php)
 * 3. /theme/assets/js/plugins-min.js
 * 4. /theme/assets/js/main-min.js
 */

function roots_scripts() {
  wp_enqueue_style('roots_foundation', get_template_directory_uri() . '/css/screen.css', false, null, 'screen');

  // jQuery is loaded in header.php using the same method from HTML5 Boilerplate:
  // Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline
  // It's kept in the header instead of footer to avoid conflicts with plugins.
  if (!is_admin()) {
    wp_deregister_script('jquery');
    wp_register_script('jquery', '', '', '1.9.1', false);
  }

  if (is_single() && comments_open() && get_option('thread_comments')) {
    wp_enqueue_script('comment-reply');
  }

  wp_register_script('roots_plugins', get_template_directory_uri() . '/js/plugins-min.js', false, null, true);
  wp_register_script('roots_main', get_template_directory_uri() . '/js/main-min.js', false, null, true);
  wp_enqueue_script('roots_plugins');
  wp_enqueue_script('roots_main');
}

add_action('wp_enqueue_scripts', 'roots_scripts', 100);
