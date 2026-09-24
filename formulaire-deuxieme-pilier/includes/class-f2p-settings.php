<?php
/**
 * Page de réglages (Settings API).
 *
 * @package Formulaire_Deuxieme_Pilier
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Destinataire et sujet de l’e-mail. Aucune demande n’est enregistrée ici.
 */
class F2P_Settings {

	const OPTION = 'f2p_settings';

	/**
	 * Hooks d’administration.
	 */
	public static function init() {
		add_action( 'admin_init', array( __CLASS__, 'register' ) );
		add_action( 'admin_menu', array( __CLASS__, 'menu' ) );
	}

	/**
	 * Déclare l’option.
	 */
	public static function register() {
		register_setting(
			'f2p_settings_group',
			self::OPTION,
			array(
				'type'              => 'array',
				'sanitize_callback' => array( __CLASS__, 'sanitize' ),
				'default'           => array(
					'recipient' => '',
					'subject'   => '',
				),
			)
		);
	}

	/**
	 * Sous-menu Réglages.
	 */
	public static function menu() {
		add_options_page(
			__( 'Formulaire deuxième pilier', F2P_TD ),
			__( 'Formulaire 2e pilier', F2P_TD ),
			'manage_options',
			'formulaire-deuxieme-pilier',
			array( __CLASS__, 'render_page' )
		);
	}

	/**
	 * Nettoie l’e-mail destinataire et le sujet. N’accepte aucune donnée de formulaire.
	 *
	 * @param mixed $input Valeur brute.
	 * @return array
	 */
	public static function sanitize( $input ) {
		$previous = get_option( self::OPTION, array() );
		if ( ! is_array( $previous ) ) {
			$previous = array();
		}

		$output = array(
			'recipient' => isset( $previous['recipient'] ) ? sanitize_email( $previous['recipient'] ) : '',
			'subject'   => isset( $previous['subject'] ) ? sanitize_text_field( $previous['subject'] ) : '',
		);

		if ( ! is_array( $input ) ) {
			return $output;
		}

		if ( isset( $input['recipient'] ) && '' !== trim( (string) $input['recipient'] ) ) {
			$email = sanitize_email( $input['recipient'] );
			if ( is_email( $email ) ) {
				$output['recipient'] = $email;
			} else {
				add_settings_error(
					self::OPTION,
					'f2p_recipient',
					__( 'Adresse e-mail du destinataire invalide. La valeur précédente a été conservée.', F2P_TD )
				);
			}
		} else {
			$output['recipient'] = '';
		}

		if ( isset( $input['subject'] ) ) {
			$subject = sanitize_text_field( $input['subject'] );
			if ( function_exists( 'mb_substr' ) ) {
				$subject = mb_substr( $subject, 0, 180 );
			} else {
				$subject = substr( $subject, 0, 180 );
			}
			$output['subject'] = $subject;
		}

		return $output;
	}

	/**
	 * Destinataire effectif : réglage, sinon l’e-mail d’administration.
	 *
	 * @return string
	 */
	public static function recipient() {
		$options = get_option( self::OPTION, array() );
		$email   = '';
		if ( is_array( $options ) && ! empty( $options['recipient'] ) ) {
			$email = sanitize_email( $options['recipient'] );
		}
		if ( ! is_email( $email ) ) {
			$email = sanitize_email( get_option( 'admin_email' ) );
		}
		return is_email( $email ) ? $email : '';
	}

	/**
	 * Sujet configuré, ou chaîne vide pour laisser l’envoi appliquer le sujet par défaut.
	 *
	 * @return string
	 */
	public static function subject() {
		$options = get_option( self::OPTION, array() );
		if ( ! is_array( $options ) || empty( $options['subject'] ) ) {
			return '';
		}
		return sanitize_text_field( $options['subject'] );
	}

	/**
	 * Marquage de la page de réglages.
	 */
	public static function render_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$options   = get_option( self::OPTION, array() );
		$recipient = ( is_array( $options ) && isset( $options['recipient'] ) ) ? $options['recipient'] : '';
		$subject   = ( is_array( $options ) && isset( $options['subject'] ) ) ? $options['subject'] : '';
		$fallback  = sanitize_email( get_option( 'admin_email' ) );
		?>
		<div class="wrap">
			<h1><?php echo esc_html__( 'Formulaire deuxième pilier', F2P_TD ); ?></h1>
			<p>
				<?php echo esc_html__( 'Les demandes sont envoyées par e-mail uniquement. Le numéro AVS n’est pas enregistré dans la base de données.', F2P_TD ); ?>
			</p>
			<?php settings_errors(); ?>
			<form action="options.php" method="post">
				<?php settings_fields( 'f2p_settings_group' ); ?>
				<table class="form-table" role="presentation">
					<tr>
						<th scope="row">
							<label for="f2p-recipient"><?php echo esc_html__( 'E-mail du destinataire', F2P_TD ); ?></label>
						</th>
						<td>
							<input name="<?php echo esc_attr( self::OPTION ); ?>[recipient]" type="email" id="f2p-recipient" class="regular-text" value="<?php echo esc_attr( $recipient ); ?>" placeholder="<?php echo esc_attr( $fallback ); ?>">
							<p class="description">
								<?php
								echo esc_html(
									sprintf(
										/* translators: %s: admin email */
										__( 'Laisser vide pour utiliser l’adresse d’administration du site (%s).', F2P_TD ),
										$fallback
									)
								);
								?>
							</p>
						</td>
					</tr>
					<tr>
						<th scope="row">
							<label for="f2p-subject"><?php echo esc_html__( 'Sujet de l’e-mail', F2P_TD ); ?></label>
						</th>
						<td>
							<input name="<?php echo esc_attr( self::OPTION ); ?>[subject]" type="text" id="f2p-subject" class="regular-text" value="<?php echo esc_attr( $subject ); ?>" maxlength="180">
							<p class="description">
								<?php echo esc_html__( 'Facultatif. Si vide, le sujet indique le prénom et le nom de la personne.', F2P_TD ); ?>
							</p>
						</td>
					</tr>
				</table>
				<?php submit_button( __( 'Enregistrer', F2P_TD ) ); ?>
			</form>
		</div>
		<?php
	}
}
