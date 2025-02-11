<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// var_dump('hellos jhshshb jksjsj');
// function render_dynamic_content_block( $attributes ) {
//     var_dump($attributes);
// 	$attributes = wp_parse_args(
// 		$attributes,
// 		array(
// 			'layout'               => 'grid',
// 			'postType'             => 'post',
// 			'postsPerPage'         => 6,
// 			'columns'              => 3,
// 			'orderBy'              => 'date',
// 			'order'                => 'desc',
// 			'displayFeaturedImage' => true,
// 			'displayExcerpt'       => true,
// 			'displayDate'          => true,
// 			'parentPage'           => '0',
// 		)
// 	);

// 	// Setup the query
// 	$args = array(
// 		'post_type'      => $attributes['postType'],
// 		'posts_per_page' => $attributes['postsPerPage'],
// 		'orderby'        => $attributes['orderBy'],
// 		'order'          => strtoupper( $attributes['order'] ),
// 		'post_status'    => 'publish',
// 	);

// 	if ( $attributes['postType'] === 'page' && $attributes['parentPage'] !== '0' ) {
// 		$args['post_parent'] = intval( $attributes['parentPage'] );
// 	}

// 	$query  = new WP_Query( $args );
// 	$output = '';

// 	if ( ! $query->have_posts() ) {
// 		return '<p>No posts found.</p>';
// 	}

// 	if ( $attributes['layout'] === 'grid' ) {
// 		$output .= sprintf( '<div class="dynamic-content-grid columns-%s">', esc_attr( $attributes['columns'] ) );
// 		while ( $query->have_posts() ) {
// 			$query->the_post();
// 			$output .= '<div class="dynamic-content-item">';
// 			if ( $attributes['displayFeaturedImage'] && has_post_thumbnail() ) {
// 				$output .= sprintf(
// 					'<div class="featured-image"><img src="%s" alt="%s"></div>',
// 					esc_url( get_the_post_thumbnail_url( null, 'large' ) ),
// 					esc_attr( get_the_title() )
// 				);
// 			}
// 			$output .= '<div class="content">';
// 			$output .= sprintf(
// 				'<h3><a href="%s">%s</a></h3>',
// 				esc_url( get_permalink() ),
// 				get_the_title()
// 			);
// 			if ( $attributes['displayDate'] ) {
// 				$output .= sprintf( '<div class="date">%s</div>', get_the_date() );
// 			}
// 			if ( $attributes['displayExcerpt'] ) {
// 				$output .= sprintf( '<div class="excerpt">%s</div>', get_the_excerpt() );
// 			}
// 			$output .= '</div></div>';
// 		}
// 		$output .= '</div>';
// 	} elseif ( 'modern' === $attributes['layout'] ) {
// 		$output .= '<div class="dynamic-content-modern">';
// 		while ( $query->have_posts() ) {
// 			$query->the_post();
// 			$output .= '<div class="dynamic-content-item">';
// 			$output .= '<div class="content">';
// 			$output .= sprintf( '<h3>%s</h3>', get_the_title() );
// 			if ( $attributes['displayExcerpt'] ) {
// 				$excerpt = get_the_excerpt();
// 				$excerpt = substr( $excerpt, 0, 60 );
// 				$result  = substr( $excerpt, 0, strrpos( $excerpt, ' ' ) );

// 				$output .= sprintf( '<div class="excerpt">%s</div>', $result );
// 			}
// 			$output .= sprintf(
// 				'<a href="%s" class="read-more">%s</a>',
// 				esc_url( get_permalink() ),
// 				esc_html__( 'Register', 'wondah-blocks' )
// 			);
// 			$output .= '</div>';
// 			if ( $attributes['displayFeaturedImage'] && has_post_thumbnail() ) {
// 				$output .= sprintf(
// 					'<div class="featured-image"><img src="%s" alt="%s"></div>',
// 					esc_url( get_the_post_thumbnail_url( null, 'large' ) ),
// 					esc_attr( get_the_title() )
// 				);
// 			}
// 			$output .= '</div>';
// 		}
// 		$output .= '</div>';
// 	}

// 	wp_reset_postdata();
// 	return $output;
// }
