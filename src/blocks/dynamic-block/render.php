<?php
function wondah_blocks_render_all_pages( $attributes ) {
	// Fetch all published pages
	$pages = get_posts(
		array(
			'post_type'      => 'page',
			'posts_per_page' => -1,
			'post_status'    => 'publish',
		)
	);

	if ( empty( $pages ) ) {
		return '<p>No pages found.</p>';
	}

	$output = '<ul class="wondah-pages-list">';
	foreach ( $pages as $page ) {
		$output .= sprintf( '<li><a href="%s">%s</a></li>', get_permalink( $page ), esc_html( $page->post_title ) );
	}
	$output .= '</ul>';

	return $output;
}
