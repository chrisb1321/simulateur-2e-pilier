<?php
/**
 * Réception admin-ajax. E-mail uniquement : rien n’est écrit en base.
 *
 * @package Formulaire_Deuxieme_Pilier
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Envoi de la demande.
 */
class F2P_Ajax {

	const ACTION = 'f2p_submit';

	/**
	 * Hooks AJAX, visiteurs compris.
	 */
	public static function init() {
		add_action( 'wp_ajax_' . self::ACTION, array( __CLASS__, 'handle' ) );
		add_action( 'wp_ajax_nopriv_' . self::ACTION, array( __CLASS__, 'handle' ) );
	}

	/**
	 * Contrôle, puis wp_mail. Le numéro AVS ne sort du serveur que dans cet e-mail.
	 */
	public static function handle() {
		if ( ! check_ajax_referer( 'f2p_submit', 'nonce', false ) ) {
			wp_send_json_error(
				array(
					'message' => F2P_Validator::messages()['nonce'],
				),
				403
			);
		}

		$honeypot = isset( $_POST['f2p_company_url'] ) ? trim( (string) wp_unslash( $_POST['f2p_company_url'] ) ) : '';
		if ( '' !== $honeypot ) {
			wp_send_json_success( array( 'ok' => true ) );
		}

		$data   = self::collect();
		$errors = F2P_Validator::validate( $data );
		if ( ! empty( $errors ) ) {
			wp_send_json_error(
				array(
					'message' => F2P_Validator::messages()['banner'],
					'fields'  => $errors,
				),
				400
			);
		}

		$ip  = isset( $_SERVER['REMOTE_ADDR'] ) ? (string) $_SERVER['REMOTE_ADDR'] : '0';
		$key = 'f2p_lock_' . md5( $ip );
		if ( get_transient( $key ) ) {
			wp_send_json_error(
				array(
					'message' => F2P_Validator::messages()['rate'],
				),
				429
			);
		}

		$to = F2P_Settings::recipient();
		if ( ! is_email( $to ) ) {
			wp_send_json_error(
				array(
					'message' => F2P_Validator::messages()['recipient'],
				),
				500
			);
		}

		$binary = F2P_Validator::signature_binary( $data['signature'] );
		$png    = self::write_png( $binary );
		if ( '' === $png ) {
			wp_send_json_error(
				array(
					'message' => F2P_Validator::messages()['mail'],
				),
				500
			);
		}

		set_transient( $key, 1, 20 );

		$sent = self::send( $to, $data, $png );
		if ( file_exists( $png ) ) {
			wp_delete_file( $png );
		}

		if ( ! $sent ) {
			delete_transient( $key );
			wp_send_json_error(
				array(
					'message' => F2P_Validator::messages()['mail'],
				),
				500
			);
		}

		wp_send_json_success( array( 'ok' => true ) );
	}

	/**
	 * Lit les champs attendus. La signature n’est pas passée dans sanitize_text_field.
	 *
	 * @return array<string,string>
	 */
	private static function collect() {
		$keys = array(
			'civilite',
			'nom',
			'prenom',
			'email',
			'adresse',
			'numero',
			'code_postal',
			'ville',
			'pays',
			'nationalite',
			'indicatif',
			'telephone',
			'etat_civil',
			'avs',
			'date_naissance',
			'caisse',
			'emploi',
			'consentement',
		);

		$data = array();
		foreach ( $keys as $key ) {
			if ( ! isset( $_POST[ $key ] ) || is_array( $_POST[ $key ] ) ) {
				$data[ $key ] = '';
				continue;
			}
			$data[ $key ] = sanitize_text_field( wp_unslash( $_POST[ $key ] ) );
		}

		$data['email'] = sanitize_email( $data['email'] );

		$signature = '';
		if ( isset( $_POST['signature'] ) && is_string( $_POST['signature'] ) ) {
			$signature = wp_unslash( $_POST['signature'] );
			$signature = preg_replace( '/\s+/', '', $signature );
			if ( ! is_string( $signature ) ) {
				$signature = '';
			}
		}
		$data['signature'] = $signature;

		return $data;
	}

	/**
	 * Écrit le PNG dans le répertoire temporaire, le temps de l’envoi.
	 *
	 * @param string $binary Contenu PNG.
	 * @return string Chemin, ou vide.
	 */
	private static function write_png( $binary ) {
		if ( '' === $binary ) {
			return '';
		}
		$dir  = get_temp_dir();
		$name = 'f2p-signature-' . wp_generate_password( 12, false, false ) . '.png';
		$path = trailingslashit( $dir ) . $name;
		$bytes = file_put_contents( $path, $binary );
		if ( false === $bytes ) {
			return '';
		}
		return $path;
	}

	/**
	 * Compose et envoie l’e-mail. La pièce jointe est supprimée par l’appelant.
	 *
	 * @param string              $to   Destinataire.
	 * @param array<string,string> $data Champs déjà validés.
	 * @param string              $png  Chemin du PNG.
	 * @return bool
	 */
	private static function send( $to, $data, $png ) {
		$prenom = $data['prenom'];
		$nom    = $data['nom'];
		$phone  = F2P_Validator::format_phone(
			F2P_Validator::canonical_swiss_mobile( $data['telephone'], $data['indicatif'] )
		);

		$subject = F2P_Settings::subject();
		if ( '' === $subject ) {
			$subject = sprintf(
				'Recherche d’avoirs de libre passage — %s %s',
				$prenom,
				$nom
			);
		}
		$subject = str_replace( array( "\r", "\n" ), '', $subject );

		$rows = array(
			'Civilité'                    => $data['civilite'],
			'Nom'                         => $nom,
			'Prénom'                      => $prenom,
			'E-mail'                      => $data['email'],
			'Adresse'                     => $data['adresse'],
			'Numéro'                      => $data['numero'],
			'Code postal'                 => $data['code_postal'],
			'Ville'                       => $data['ville'],
			'Pays'                        => $data['pays'],
			'Nationalité'                 => $data['nationalite'],
			'Téléphone mobile'            => $phone,
			'État civil'                  => $data['etat_civil'],
			'Numéro AVS'                  => F2P_Validator::avs_format( $data['avs'] ),
			'Date de naissance'           => $data['date_naissance'],
			'Caisse de pension actuelle'  => '' !== $data['caisse'] ? $data['caisse'] : '—',
			'Emploi en Suisse'            => $data['emploi'],
		);

		$body  = '<p>Nouvelle demande de recherche d’avoirs de libre passage.</p>';
		$body .= '<table cellpadding="6" cellspacing="0" border="0">';
		foreach ( $rows as $label => $value ) {
			$body .= '<tr><th align="left" valign="top">' . esc_html( $label ) . '</th><td>' . esc_html( $value ) . '</td></tr>';
		}
		$body .= '</table>';
		$body .= '<p>La signature est jointe à cet e-mail (fichier PNG).</p>';

		$reply_name = str_replace( array( "\r", "\n", '<', '>' ), '', $prenom . ' ' . $nom );
		if ( function_exists( 'mb_encode_mimeheader' ) ) {
			$reply_name = mb_encode_mimeheader( $reply_name, 'UTF-8' );
		}

		$headers = array(
			'Content-Type: text/html; charset=UTF-8',
			'Reply-To: ' . $reply_name . ' <' . $data['email'] . '>',
		);

		return (bool) wp_mail( $to, $subject, $body, $headers, array( $png ) );
	}
}
