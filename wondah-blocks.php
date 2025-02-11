<?php
/**
 * Plugin Name: Wondah Blocks
 * Description: Custom Gutenberg blocks for WordPress
 * Version: 1.0.0
 * Author: gblessylva
 * Author URI: https://profiles.wordpress.org/gblessylva
 * Text Domain: wondah-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function wondah_blocks_register() {
	// Get all block.json files
	$blocks_dir = glob( __DIR__ . '/build/blocks/*/block.json' );

	// Register each block found
	foreach ( $blocks_dir as $block ) {
		register_block_type( dirname( $block ) );
	}
}
add_action( 'init', 'wondah_blocks_register' );

function wondah_blocks_enqueue_assets() {
	wp_enqueue_style(
		'wondah-blocks-style',
		plugins_url( 'build/style-index.css', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/style-index.css' )
	);
}
add_action( 'enqueue_block_assets', 'wondah_blocks_enqueue_assets' );
