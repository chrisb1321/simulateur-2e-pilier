<?php
/**
 * Shortcode et marquage du formulaire.
 *
 * @package Formulaire_Deuxieme_Pilier
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Affiche [formulaire_deuxieme_pilier].
 */
class F2P_Form {

	/**
	 * Compteur pour des identifiants uniques si le shortcode est répété.
	 *
	 * @var int
	 */
	private static $count = 0;

	/**
	 * @var bool
	 */
	private static $enqueued = false;

	/**
	 * Callback du shortcode.
	 *
	 * @return string
	 */
	public static function shortcode() {
		self::enqueue();
		return self::render();
	}

	/**
	 * CSS et JS limités aux pages qui contiennent le formulaire.
	 */
	public static function enqueue() {
		if ( self::$enqueued ) {
			return;
		}
		self::$enqueued = true;

		$css = F2P_DIR . 'assets/css/form.css';
		$js  = F2P_DIR . 'assets/js/form.js';

		wp_enqueue_style(
			'f2p-form',
			F2P_URL . 'assets/css/form.css',
			array(),
			file_exists( $css ) ? (string) filemtime( $css ) : F2P_VERSION
		);

		wp_enqueue_script(
			'f2p-form',
			F2P_URL . 'assets/js/form.js',
			array(),
			file_exists( $js ) ? (string) filemtime( $js ) : F2P_VERSION,
			true
		);
	}

	/**
	 * HTML du formulaire.
	 *
	 * @return string
	 */
	public static function render() {
		self::$count++;

		$id       = 'f2p-' . self::$count;
		$ajax     = admin_url( 'admin-ajax.php' );
		$nonce    = wp_create_nonce( 'f2p_submit' );
		$messages = F2P_Validator::messages();

		ob_start();
		include F2P_DIR . 'templates/form.php';
		return (string) ob_get_clean();
	}

	/**
	 * Options d’un select. Tableau liste ou code => libellé.
	 *
	 * @param array<int|string,string> $items    Options.
	 * @param string                   $selected Valeur sélectionnée.
	 * @return string
	 */
	public static function options( $items, $selected = '' ) {
		$html = '';
		foreach ( $items as $value => $label ) {
			if ( is_int( $value ) ) {
				$value = $label;
			}
			$html .= '<option value="' . esc_attr( $value ) . '"' . selected( $selected, (string) $value, false ) . '>' . esc_html( $label ) . '</option>';
		}
		return $html;
	}
}
