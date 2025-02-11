<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Wondah_Blocks_Assets {
	public static function init() {
		add_action( 'enqueue_block_assets', array( __CLASS__, 'enqueue_assets' ) );
	}

	public static function enqueue_assets() {
		wp_enqueue_style(
			'wondah-blocks-style',
			WONDAH_BLOCKS_URL . 'build/style-index.css',
			array(),
			filemtime( WONDAH_BLOCKS_PATH . 'build/style-index.css' )
		);
	}
}
