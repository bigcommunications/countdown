<?php while (have_posts()) : the_post(); ?>
  <?php the_content(); ?>
  <?php wp_link_pages(array('before' => '<nav class="pagination">', 'after' => '</nav>')); ?>
<?php endwhile; ?>


<aside id="sidebar" class="<?php echo roots_sidebar_class(); ?>" role="complementary">
  <?php //get_template_part('templates/sidebar'); ?>
</aside>
