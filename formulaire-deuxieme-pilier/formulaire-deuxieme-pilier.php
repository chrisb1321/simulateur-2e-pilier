<?php
/**
 * Plugin Name: Formulaire deuxième pilier
 * Plugin URI: https://github.com/chrisb1321/simulateur-2e-pilier
 * Description: Formulaire en 4 étapes pour la recherche d’avoirs de libre passage en Suisse.
 * Version: 1.0.0
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * Author: Formulaire deuxième pilier
 * Text Domain: formulaire-deuxieme-pilier
 * License: GPL-2.0-or-later
 *
 * @package Formulaire_Deuxieme_Pilier
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'F2P_VERSION', '1.0.0' );
define( 'F2P_FILE', __FILE__ );
define( 'F2P_DIR', plugin_dir_path( __FILE__ ) );
define( 'F2P_URL', plugin_dir_url( __FILE__ ) );
define( 'F2P_TD', 'formulaire-deuxieme-pilier' );

require_once F2P_DIR . 'includes/class-f2p-validator.php';
require_once F2P_DIR . 'includes/class-f2p-settings.php';
require_once F2P_DIR . 'includes/class-f2p-form.php';
require_once F2P_DIR . 'includes/class-f2p-ajax.php';
require_once F2P_DIR . 'includes/class-f2p-plugin.php';

add_action( 'plugins_loaded', array( 'F2P_Plugin', 'init' ) );
