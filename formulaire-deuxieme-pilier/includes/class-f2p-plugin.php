<?php
/**
 * Amorçage du plugin.
 *
 * @package Formulaire_Deuxieme_Pilier
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Branche les hooks publics.
 */
class F2P_Plugin {

	/**
	 * Enregistre shortcode, réglages et envoi AJAX.
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'load_textdomain' ) );
		add_shortcode( 'formulaire_deuxieme_pilier', array( 'F2P_Form', 'shortcode' ) );
		add_filter( 'plugin_action_links_' . plugin_basename( F2P_FILE ), array( __CLASS__, 'action_links' ) );
		F2P_Settings::init();
		F2P_Ajax::init();
	}

	/**
	 * Charge le domaine de traduction.
	 */
	public static function load_textdomain() {
		load_plugin_textdomain( F2P_TD, false, dirname( plugin_basename( F2P_FILE ) ) . '/languages' );
	}

	/**
	 * Lien vers la page de réglages depuis la liste des extensions.
	 *
	 * @param array $links Liens existants.
	 * @return array
	 */
	public static function action_links( $links ) {
		$url  = admin_url( 'options-general.php?page=formulaire-deuxieme-pilier' );
		$link = '<a href="' . esc_url( $url ) . '">' . esc_html__( 'Réglages', F2P_TD ) . '</a>';
		array_unshift( $links, $link );
		return $links;
	}
}
