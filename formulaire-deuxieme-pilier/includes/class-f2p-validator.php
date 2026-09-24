<?php
/**
 * Validation partagée (navigateur et serveur).
 *
 * Le numéro AVS suisse est un EAN-13 : 756 + 9 chiffres + clé.
 *
 * @package Formulaire_Deuxieme_Pilier
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Listes autorisées et contrôles.
 */
class F2P_Validator {

	/**
	 * Traduit une chaîne si WordPress est chargé.
	 *
	 * @param string $text Texte français.
	 * @return string
	 */
	private static function t( $text ) {
		if ( function_exists( '__' ) ) {
			return __( $text, 'formulaire-deuxieme-pilier' );
		}
		return $text;
	}

	/**
	 * Messages affichés sous les champs et dans le bandeau.
	 *
	 * @return array<string,string>
	 */
	public static function messages() {
		return array(
			'banner'       => self::t( 'Attention : Certains champs sont manquants ou comportent des erreurs.' ),
			'civilite'     => self::t( 'Indiquez votre civilité.' ),
			'nom'          => self::t( 'Indiquez votre nom.' ),
			'prenom'       => self::t( 'Indiquez votre prénom.' ),
			'email'        => self::t( 'Indiquez une adresse e-mail valide.' ),
			'adresse'      => self::t( 'Indiquez le nom de votre rue.' ),
			'numero'       => self::t( 'Indiquez le numéro.' ),
			'postal_ch'    => self::t( 'Le code postal suisse doit comporter 4 chiffres.' ),
			'postal'       => self::t( 'Indiquez le code postal.' ),
			'ville'        => self::t( 'Indiquez la ville.' ),
			'pays'         => self::t( 'Indiquez le pays.' ),
			'nationalite'  => self::t( 'Indiquez la nationalité.' ),
			'telephone'    => self::t( 'Indiquez un numéro de mobile suisse valide (07x xxx xx xx ou +41 7x xxx xx xx).' ),
			'etat_civil'   => self::t( 'Indiquez votre état civil.' ),
			'avs'          => self::t( 'Indiquez votre numéro AVS.' ),
			'avs_invalid'  => self::t( 'Le numéro AVS est invalide. Il doit commencer par 756 et avoir une clé de contrôle correcte (format 756.xxxx.xxxx.xx).' ),
			'date'         => self::t( 'Indiquez une date de naissance valide (jj/mm/aaaa).' ),
			'date_invalid' => self::t( 'Cette date de naissance n’est pas acceptée.' ),
			'caisse'       => self::t( 'Le nom de la caisse de pension est trop long.' ),
			'emploi'       => self::t( 'Indiquez si vous avez un emploi en Suisse.' ),
			'signature'    => self::t( 'La signature est obligatoire.' ),
			'consent'      => self::t( 'Cochez la case pour confirmer l’exactitude des informations.' ),
			'mail'         => self::t( 'L’envoi a échoué. Veuillez réessayer dans un instant.' ),
			'nonce'        => self::t( 'Session expirée. Rechargez la page puis réessayez.' ),
			'recipient'    => self::t( 'Le destinataire du formulaire n’est pas configuré. Contactez l’administrateur du site.' ),
			'rate'         => self::t( 'Veuillez patienter quelques secondes avant un nouvel envoi.' ),
		);
	}

	/**
	 * Pays proposés. Suisse est épinglée en tête à l’affichage.
	 *
	 * @return string[]
	 */
	public static function countries() {
		return array(
			'Afghanistan',
			'Afrique du Sud',
			'Albanie',
			'Algérie',
			'Allemagne',
			'Argentine',
			'Australie',
			'Autriche',
			'Autre',
			'Belgique',
			'Bosnie-Herzégovine',
			'Brésil',
			'Bulgarie',
			'Cameroun',
			'Canada',
			'Chine',
			'Colombie',
			'Corée du Sud',
			'Croatie',
			'Danemark',
			'Égypte',
			'Érythrée',
			'Espagne',
			'États-Unis',
			'Éthiopie',
			'Finlande',
			'France',
			'Grèce',
			'Hongrie',
			'Inde',
			'Irak',
			'Iran',
			'Irlande',
			'Italie',
			'Japon',
			'Kosovo',
			'Liban',
			'Liechtenstein',
			'Luxembourg',
			'Macédoine du Nord',
			'Maroc',
			'Mexique',
			'Monténégro',
			'Nigéria',
			'Norvège',
			'Pakistan',
			'Pays-Bas',
			'Pérou',
			'Philippines',
			'Pologne',
			'Portugal',
			'République démocratique du Congo',
			'Roumanie',
			'Royaume-Uni',
			'Russie',
			'Sénégal',
			'Serbie',
			'Slovaquie',
			'Slovénie',
			'Somalie',
			'Sri Lanka',
			'Suède',
			'Suisse',
			'Syrie',
			'Tchéquie',
			'Thaïlande',
			'Tunisie',
			'Turquie',
			'Ukraine',
			'Viêt Nam',
		);
	}

	/**
	 * Liste déroulante : Suisse d’abord, puis le reste.
	 *
	 * @return string[]
	 */
	public static function countries_for_select() {
		$rest = array();
		foreach ( self::countries() as $country ) {
			if ( 'Suisse' !== $country ) {
				$rest[] = $country;
			}
		}
		array_unshift( $rest, 'Suisse' );
		return $rest;
	}

	/**
	 * Nationalités.
	 *
	 * @return string[]
	 */
	public static function nationalities() {
		return array(
			'Suisse',
			'Afghane',
			'Albanaise',
			'Algérienne',
			'Allemande',
			'Américaine',
			'Argentine',
			'Australienne',
			'Autrichienne',
			'Autre',
			'Belge',
			'Bosniaque',
			'Britannique',
			'Brésilienne',
			'Bulgare',
			'Camerounaise',
			'Canadienne',
			'Chinoise',
			'Colombienne',
			'Congolaise (RDC)',
			'Croate',
			'Danoise',
			'Égyptienne',
			'Érythréenne',
			'Espagnole',
			'Éthiopienne',
			'Finlandaise',
			'Française',
			'Grecque',
			'Hongroise',
			'Indienne',
			'Irakienne',
			'Iranienne',
			'Irlandaise',
			'Italienne',
			'Japonaise',
			'Kosovare',
			'Libanaise',
			'Liechtensteinoise',
			'Luxembourgeoise',
			'Macédonienne',
			'Marocaine',
			'Mexicaine',
			'Monténégrine',
			'Néerlandaise',
			'Nigériane',
			'Norvégienne',
			'Pakistanaise',
			'Péruvienne',
			'Philippine',
			'Polonaise',
			'Portugaise',
			'Roumaine',
			'Russe',
			'Sénégalaise',
			'Serbe',
			'Slovaque',
			'Slovène',
			'Somalienne',
			'Sri-lankaise',
			'Sud-coréenne',
			'Suédoise',
			'Syrienne',
			'Tchèque',
			'Thaïlandaise',
			'Tunisienne',
			'Turque',
			'Ukrainienne',
			'Vietnamienne',
		);
	}

	/**
	 * États civils usuels en Suisse.
	 *
	 * @return string[]
	 */
	public static function civil_statuses() {
		return array(
			'Célibataire',
			'Marié(e)',
			'Partenariat enregistré',
			'Séparé(e)',
			'Divorcé(e)',
			'Veuf/Veuve',
			'Partenariat dissous',
		);
	}

	/**
	 * Réponses à la question d’emploi.
	 *
	 * @return string[]
	 */
	public static function employment_options() {
		return array(
			'Oui, j’ai un emploi en Suisse',
			'Non, je n’ai pas d’emploi en Suisse',
		);
	}

	/**
	 * Indicatifs du sélecteur. La validation du numéro reste suisse.
	 *
	 * @return array<string,string>
	 */
	public static function phone_codes() {
		return array(
			'+41'  => '🇨🇭 +41',
			'+33'  => '🇫🇷 +33',
			'+49'  => '🇩🇪 +49',
			'+39'  => '🇮🇹 +39',
			'+43'  => '🇦🇹 +43',
			'+423' => '🇱🇮 +423',
			'+34'  => '🇪🇸 +34',
			'+351' => '🇵🇹 +351',
			'+32'  => '🇧🇪 +32',
			'+44'  => '🇬🇧 +44',
			'+352' => '🇱🇺 +352',
			'+31'  => '🇳🇱 +31',
			'+48'  => '🇵🇱 +48',
			'+90'  => '🇹🇷 +90',
			'+383' => '🇽🇰 +383',
			'+381' => '🇷🇸 +381',
			'+385' => '🇭🇷 +385',
			'+1'   => '🇺🇸 +1',
		);
	}

	/**
	 * @param array<string,mixed> $data   Données.
	 * @param string              $key    Clé.
	 * @return string
	 */
	public static function val( $data, $key ) {
		if ( ! isset( $data[ $key ] ) || is_array( $data[ $key ] ) ) {
			return '';
		}
		return trim( (string) $data[ $key ] );
	}

	/**
	 * @param string $value Texte.
	 * @return int
	 */
	private static function length( $value ) {
		if ( function_exists( 'mb_strlen' ) ) {
			return (int) mb_strlen( $value );
		}
		return strlen( $value );
	}

	/**
	 * Chiffres AVS, sans points ni espaces.
	 *
	 * @param string $value Saisie.
	 * @return string
	 */
	public static function avs_digits( $value ) {
		$digits = preg_replace( '/\D+/', '', (string) $value );
		return is_string( $digits ) ? $digits : '';
	}

	/**
	 * Clé EAN-13. Le numéro doit commencer par 756 et compter 13 chiffres.
	 *
	 * @param string $value Saisie.
	 * @return bool
	 */
	public static function avs_is_valid( $value ) {
		$digits = self::avs_digits( $value );
		if ( 13 !== strlen( $digits ) || '756' !== substr( $digits, 0, 3 ) ) {
			return false;
		}

		$sum = 0;
		for ( $i = 0; $i < 12; $i++ ) {
			$n    = (int) $digits[ $i ];
			$sum += ( 0 === $i % 2 ) ? $n : ( $n * 3 );
		}
		$check = ( 10 - ( $sum % 10 ) ) % 10;
		return $check === (int) $digits[12];
	}

	/**
	 * @param string $value Saisie.
	 * @return string
	 */
	public static function avs_format( $value ) {
		$digits = self::avs_digits( $value );
		if ( 13 !== strlen( $digits ) ) {
			return $digits;
		}
		return substr( $digits, 0, 3 ) . '.' . substr( $digits, 3, 4 ) . '.' . substr( $digits, 7, 4 ) . '.' . substr( $digits, 11, 2 );
	}

	/**
	 * Ramène un mobile suisse à +41 suivi de 9 chiffres, ou chaîne vide.
	 *
	 * Accepte 07x xxx xx xx et +41 7x xxx xx xx (aussi 0041).
	 *
	 * @param string $telephone Numéro saisi.
	 * @param string $indicatif Indicatif du sélecteur.
	 * @return string
	 */
	public static function canonical_swiss_mobile( $telephone, $indicatif ) {
		$compact = preg_replace( '/[\s.\-\/()]/', '', trim( (string) $telephone ) );
		if ( ! is_string( $compact ) || '' === $compact ) {
			return '';
		}
		if ( 0 === strpos( $compact, '00' ) ) {
			$compact = '+' . substr( $compact, 2 );
		}

		if ( '+' !== substr( $compact, 0, 1 ) ) {
			$prefix = preg_replace( '/\s+/', '', trim( (string) $indicatif ) );
			if ( ! is_string( $prefix ) || '' === $prefix ) {
				$prefix = '+41';
			}
			if ( '0' === substr( $compact, 0, 1 ) ) {
				$compact = '+41' . substr( $compact, 1 );
			} else {
				$compact = $prefix . $compact;
			}
		}

		if ( 0 === strpos( $compact, '+410' ) ) {
			$compact = '+41' . substr( $compact, 4 );
		}

		if ( ! preg_match( '/^\+417[0-9]\d{7}$/', $compact ) ) {
			return '';
		}
		return $compact;
	}

	/**
	 * @param string $compact Forme +41XXXXXXXXX.
	 * @return string
	 */
	public static function format_phone( $compact ) {
		if ( ! preg_match( '/^\+41(\d{2})(\d{3})(\d{2})(\d{2})$/', $compact, $matches ) ) {
			return $compact;
		}
		return '+41 ' . $matches[1] . ' ' . $matches[2] . ' ' . $matches[3] . ' ' . $matches[4];
	}

	/**
	 * @param string $email Adresse.
	 * @return bool
	 */
	public static function email_is_valid( $email ) {
		$email = trim( (string) $email );
		if ( function_exists( 'is_email' ) ) {
			return (bool) is_email( $email );
		}
		return (bool) filter_var( $email, FILTER_VALIDATE_EMAIL );
	}

	/**
	 * @param string $name Nom ou prénom.
	 * @return bool
	 */
	public static function name_is_valid( $name ) {
		$name = trim( (string) $name );
		$len  = self::length( $name );
		if ( $len < 1 || $len > 80 ) {
			return false;
		}
		return (bool) preg_match( "/^[\\p{L}][\\p{L}\\s'’\\-]{0,79}$/u", $name );
	}

	/**
	 * @param string $street Rue.
	 * @return bool
	 */
	public static function street_is_valid( $street ) {
		$street = trim( (string) $street );
		$len    = self::length( $street );
		if ( $len < 2 || $len > 120 ) {
			return false;
		}
		return (bool) preg_match( "/^[\\p{L}0-9][\\p{L}0-9\\s'’.,\\-]{1,119}$/u", $street );
	}

	/**
	 * @param string $number Numéro de rue.
	 * @return bool
	 */
	public static function street_number_is_valid( $number ) {
		$number = trim( (string) $number );
		return (bool) preg_match( '/^[0-9][0-9A-Za-z\/\-\s]{0,11}$/', $number );
	}

	/**
	 * @param string $city Ville.
	 * @return bool
	 */
	public static function city_is_valid( $city ) {
		$city = trim( (string) $city );
		$len  = self::length( $city );
		if ( $len < 2 || $len > 80 ) {
			return false;
		}
		return (bool) preg_match( "/^[\\p{L}][\\p{L}\\s'’.\-]{1,79}$/u", $city );
	}

	/**
	 * @param string $postal  Code postal.
	 * @param string $country Pays.
	 * @return bool
	 */
	public static function postal_is_valid( $postal, $country ) {
		$postal = trim( (string) $postal );
		if ( 'Suisse' === $country ) {
			return (bool) preg_match( '/^\d{4}$/', $postal );
		}
		return (bool) preg_match( '/^[A-Za-z0-9][A-Za-z0-9 \-]{1,11}$/', $postal );
	}

	/**
	 * @param string $value Date jj/mm/aaaa.
	 * @return string Clé de message, ou chaîne vide si la date est acceptée.
	 */
	public static function date_error( $value ) {
		$value = trim( (string) $value );
		if ( ! preg_match( '/^(\d{2})\/(\d{2})\/(\d{4})$/', $value, $matches ) ) {
			return 'date';
		}
		$day   = (int) $matches[1];
		$month = (int) $matches[2];
		$year  = (int) $matches[3];
		if ( ! checkdate( $month, $day, $year ) ) {
			return 'date';
		}

		$today = new DateTimeImmutable( 'today' );
		$born  = DateTimeImmutable::createFromFormat( '!d/m/Y', $value );
		if ( ! $born || $born > $today ) {
			return 'date_invalid';
		}
		$age = $today->diff( $born )->y;
		if ( $age < 15 || $age > 120 ) {
			return 'date_invalid';
		}
		return '';
	}

	/**
	 * Décode une signature PNG (data URL). Chaîne vide si le contenu est refusé.
	 *
	 * @param string $data_url Data URL.
	 * @return string Binaire PNG, ou vide.
	 */
	public static function signature_binary( $data_url ) {
		$data_url = trim( (string) $data_url );
		if ( ! preg_match( '#^data:image/png;base64,#i', $data_url ) ) {
			return '';
		}
		$comma = strpos( $data_url, ',' );
		if ( false === $comma ) {
			return '';
		}
		$raw = substr( $data_url, $comma + 1 );
		$raw = str_replace( ' ', '+', $raw );
		$bin = base64_decode( $raw, true );
		if ( ! is_string( $bin ) || strlen( $bin ) < 32 || strlen( $bin ) > 1500000 ) {
			return '';
		}
		if ( "\x89PNG\r\n\x1a\n" !== substr( $bin, 0, 8 ) ) {
			return '';
		}
		if ( function_exists( 'getimagesizefromstring' ) ) {
			$info = @getimagesizefromstring( $bin );
			if ( ! is_array( $info ) || ! isset( $info[2] ) || IMAGETYPE_PNG !== $info[2] ) {
				return '';
			}
			if ( $info[0] < 20 || $info[1] < 20 || $info[0] > 4000 || $info[1] > 2000 ) {
				return '';
			}
		}
		if ( function_exists( 'imagecreatefromstring' ) && ! self::png_has_ink( $bin ) ) {
			return '';
		}
		return $bin;
	}

	/**
	 * Vrai si le PNG contient autre chose qu’un fond blanc.
	 *
	 * @param string $binary PNG.
	 * @return bool
	 */
	public static function png_has_ink( $binary ) {
		if ( ! function_exists( 'imagecreatefromstring' ) ) {
			return true;
		}
		$image = @imagecreatefromstring( $binary );
		if ( ! $image ) {
			return false;
		}
		$width  = imagesx( $image );
		$height = imagesy( $image );
		$step   = ( $width * $height > 500000 ) ? 2 : 1;
		$ink    = 0;
		for ( $y = 0; $y < $height; $y += $step ) {
			for ( $x = 0; $x < $width; $x += $step ) {
				$rgb = imagecolorat( $image, $x, $y );
				$r   = ( $rgb >> 16 ) & 255;
				$g   = ( $rgb >> 8 ) & 255;
				$b   = $rgb & 255;
				if ( $r < 245 || $g < 245 || $b < 245 ) {
					$ink++;
					if ( $ink > 20 ) {
						imagedestroy( $image );
						return true;
					}
				}
			}
		}
		imagedestroy( $image );
		return false;
	}

	/**
	 * Valide l’ensemble de la demande.
	 *
	 * @param array<string,mixed> $data Champs.
	 * @return array<string,string> Champ => message. Vide si tout est valable.
	 */
	public static function validate( $data ) {
		$messages = self::messages();
		$errors   = array();

		$civilite = self::val( $data, 'civilite' );
		if ( ! in_array( $civilite, array( 'Monsieur', 'Madame' ), true ) ) {
			$errors['civilite'] = $messages['civilite'];
		}

		if ( ! self::name_is_valid( self::val( $data, 'nom' ) ) ) {
			$errors['nom'] = $messages['nom'];
		}
		if ( ! self::name_is_valid( self::val( $data, 'prenom' ) ) ) {
			$errors['prenom'] = $messages['prenom'];
		}
		if ( ! self::email_is_valid( self::val( $data, 'email' ) ) ) {
			$errors['email'] = $messages['email'];
		}

		if ( ! self::street_is_valid( self::val( $data, 'adresse' ) ) ) {
			$errors['adresse'] = $messages['adresse'];
		}
		if ( ! self::street_number_is_valid( self::val( $data, 'numero' ) ) ) {
			$errors['numero'] = $messages['numero'];
		}

		$pays = self::val( $data, 'pays' );
		if ( ! in_array( $pays, self::countries(), true ) ) {
			$errors['pays'] = $messages['pays'];
		}

		$postal = self::val( $data, 'code_postal' );
		if ( ! isset( $errors['pays'] ) && ! self::postal_is_valid( $postal, $pays ) ) {
			$errors['code_postal'] = ( 'Suisse' === $pays ) ? $messages['postal_ch'] : $messages['postal'];
		} elseif ( isset( $errors['pays'] ) && '' === $postal ) {
			$errors['code_postal'] = $messages['postal'];
		}

		if ( ! self::city_is_valid( self::val( $data, 'ville' ) ) ) {
			$errors['ville'] = $messages['ville'];
		}

		$nationalite = self::val( $data, 'nationalite' );
		if ( ! in_array( $nationalite, self::nationalities(), true ) ) {
			$errors['nationalite'] = $messages['nationalite'];
		}

		$indicatif = self::val( $data, 'indicatif' );
		if ( '' === $indicatif ) {
			$indicatif = '+41';
		}
		if ( ! array_key_exists( $indicatif, self::phone_codes() ) || '' === self::canonical_swiss_mobile( self::val( $data, 'telephone' ), $indicatif ) ) {
			$errors['telephone'] = $messages['telephone'];
		}

		if ( ! in_array( self::val( $data, 'etat_civil' ), self::civil_statuses(), true ) ) {
			$errors['etat_civil'] = $messages['etat_civil'];
		}

		$avs = self::val( $data, 'avs' );
		if ( '' === self::avs_digits( $avs ) ) {
			$errors['avs'] = $messages['avs'];
		} elseif ( ! self::avs_is_valid( $avs ) ) {
			$errors['avs'] = $messages['avs_invalid'];
		}

		$date_error = self::date_error( self::val( $data, 'date_naissance' ) );
		if ( '' !== $date_error ) {
			$errors['date_naissance'] = $messages[ $date_error ];
		}

		$caisse = self::val( $data, 'caisse' );
		if ( '' !== $caisse && self::length( $caisse ) > 120 ) {
			$errors['caisse'] = $messages['caisse'];
		}

		if ( ! in_array( self::val( $data, 'emploi' ), self::employment_options(), true ) ) {
			$errors['emploi'] = $messages['emploi'];
		}

		$consent = self::val( $data, 'consentement' );
		if ( '1' !== $consent && 'on' !== $consent ) {
			$errors['consentement'] = $messages['consent'];
		}

		if ( '' === self::signature_binary( self::val( $data, 'signature' ) ) ) {
			$errors['signature'] = $messages['signature'];
		}

		return $errors;
	}
}
