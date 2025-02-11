<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php
	$args = array(
		'post_type'      => $attributes['postType'] ?? 'post',
		'posts_per_page' => $attributes['postsPerPage'] ?? 6,
		'orderby'        => $attributes['orderBy'] ?? 'date',
		'order'          => strtoupper( $attributes['order'] ?? 'desc' ),
		'post_status'    => 'publish',
	);

	if ( isset( $attributes['postType'] ) && $attributes['postType'] === 'page' &&
		isset( $attributes['parentPage'] ) && $attributes['parentPage'] !== '0' ) {
		$args['post_parent'] = intval( $attributes['parentPage'] );
	}

	$query = new WP_Query( $args );

	if ( ! $query->have_posts() ) {
		echo '<p>' . __( 'No posts found.', 'wondah-blocks' ) . '</p>';
	} elseif ( $attributes['layout'] === 'grid' ) {
		?>
			<div class="dynamic-content-grid columns-<?php echo esc_attr( $attributes['columns'] ?? 3 ); ?>">
				<?php
				while ( $query->have_posts() ) {
					$query->the_post();
					?>
					<div class="dynamic-content-item">
						<?php if ( ( $attributes['displayFeaturedImage'] ?? true ) && has_post_thumbnail() ) : ?>
							<div class="featured-image">
								<img src="<?php echo esc_url( get_the_post_thumbnail_url( null, 'large' ) ); ?>" 
									alt="<?php echo esc_attr( get_the_title() ); ?>">
							</div>
						<?php endif; ?>
						
						<div class="content">
							<h3><a href="<?php echo esc_url( get_permalink() ); ?>"><?php echo esc_html( get_the_title() ); ?></a></h3>
							
							<?php if ( $attributes['displayDate'] ?? true ) : ?>
								<div class="date"><?php echo esc_html( get_the_date() ); ?></div>
							<?php endif; ?>
							
							<?php if ( $attributes['displayExcerpt'] ?? true ) : ?>
								<div class="excerpt"><?php echo wp_kses_post( get_the_excerpt() ); ?></div>
							<?php endif; ?>
						</div>
					</div>
					<?php
				}
				?>
			</div>
			<?php
	} elseif ( $attributes['layout'] === 'modern' ) {
		?>
			<div class="dynamic-content-modern">
			<?php
			while ( $query->have_posts() ) {
				$query->the_post();
				?>
					<div class="dynamic-content-item">
						<div class="content">
							<h3><?php echo esc_html( get_the_title() ); ?></h3>
							
						<?php
						if ( $attributes['displayExcerpt'] ?? true ) :
							$excerpt = wp_strip_all_tags( get_the_excerpt() );
							$excerpt = substr( $excerpt, 0, 60 );
							$result  = substr( $excerpt, 0, strrpos( $excerpt, ' ' ) );
							?>
								<div class="excerpt"><?php echo esc_html( $result ); ?>...</div>
							<?php endif; ?>
							
							<a href="<?php echo esc_url( get_permalink() ); ?>" class="read-more">
								<?php echo esc_html__( 'Register', 'wondah-blocks' ); ?>
							</a>
						</div>
						
						<?php if ( ( $attributes['displayFeaturedImage'] ?? true ) && has_post_thumbnail() ) : ?>
							<div class="featured-image">
								<img src="<?php echo esc_url( get_the_post_thumbnail_url( null, 'large' ) ); ?>" 
									alt="<?php echo esc_attr( get_the_title() ); ?>">
							</div>
						<?php endif; ?>
					</div>
					<?php
			}
			?>
			</div>
			<?php

	}
	wp_reset_postdata();
	?>
</div>