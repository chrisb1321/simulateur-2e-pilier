<?php
/**
 * Marquage du formulaire. Variables : $id, $ajax, $nonce, $messages.
 *
 * @package Formulaire_Deuxieme_Pilier
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$fid = function ( $name ) use ( $id ) {
	return $id . '-' . $name;
};

$steps = array(
	1 => __( 'Identité', F2P_TD ),
	2 => __( 'Adresse', F2P_TD ),
	3 => __( 'Situation', F2P_TD ),
	4 => __( 'Signature', F2P_TD ),
);

$req = '<abbr class="f2p-req" title="' . esc_attr__( 'obligatoire', F2P_TD ) . '">*</abbr>';
?>
<div
	class="f2p"
	id="<?php echo esc_attr( $id ); ?>"
	lang="fr"
	data-label-next="<?php echo esc_attr__( 'Suivant', F2P_TD ); ?>"
	data-label-submit="<?php echo esc_attr__( 'Envoyer', F2P_TD ); ?>"
	data-label-sending="<?php echo esc_attr__( 'Envoi…', F2P_TD ); ?>"
>
	<h2 class="f2p-sr" id="<?php echo esc_attr( $fid( 'title' ) ); ?>"><?php echo esc_html__( 'Formulaire de recherche d’avoirs de libre passage', F2P_TD ); ?></h2>
	<p class="f2p-header"><?php echo esc_html__( 'Remplissez gratuitement ce formulaire en seulement 3 minutes pour retrouver vos avoirs égarés de libre passage auprès de plus de 1500 institutions de prévoyance en Suisse.', F2P_TD ); ?></p>
	<p class="f2p-kicker"><span><?php echo esc_html__( 'Étapes :', F2P_TD ); ?></span></p>
	<div class="f2p-progress" role="list" aria-label="<?php echo esc_attr__( 'Progression du formulaire', F2P_TD ); ?>">
		<?php foreach ( $steps as $number => $label ) : ?>
			<?php if ( $number > 1 ) : ?>
				<span class="f2p-bar" aria-hidden="true"></span>
			<?php endif; ?>
			<div class="f2p-progress-item" role="listitem">
				<span class="f2p-dot<?php echo 1 === $number ? ' is-current' : ''; ?>" <?php echo 1 === $number ? 'aria-current="step"' : ''; ?>><?php echo esc_html( (string) $number ); ?></span>
				<span class="f2p-sr"><?php echo esc_html( $label ); ?></span>
			</div>
		<?php endforeach; ?>
	</div>
	<p class="f2p-status f2p-sr" aria-live="polite"><?php echo esc_html__( 'Étape 1 sur 4', F2P_TD ); ?></p>
	<div class="f2p-banner" role="alert" hidden><?php echo esc_html( $messages['banner'] ); ?></div>

	<form class="f2p-form" method="post" action="<?php echo esc_url( $ajax ); ?>" novalidate data-ajax="<?php echo esc_url( $ajax ); ?>">
		<script type="application/json" class="f2p-i18n"><?php echo wp_json_encode( $messages ); ?></script>
		<input type="hidden" name="nonce" value="<?php echo esc_attr( $nonce ); ?>">
		<input type="hidden" name="signature" value="">
		<div class="f2p-hp" aria-hidden="true">
			<label for="<?php echo esc_attr( $fid( 'company' ) ); ?>"><?php echo esc_html__( 'Société', F2P_TD ); ?></label>
			<input type="text" id="<?php echo esc_attr( $fid( 'company' ) ); ?>" name="f2p_company_url" tabindex="-1" autocomplete="off" value="">
		</div>

		<div class="f2p-steps">
			<section class="f2p-step" data-step="1">
				<h3 class="f2p-sr"><?php echo esc_html__( 'Étape 1 sur 4, identité', F2P_TD ); ?></h3>
				<div class="f2p-grid">
					<fieldset class="f2p-field f2p-field--full" data-field="civilite">
						<legend class="f2p-label"><?php echo esc_html__( 'Civilité', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></legend>
						<div class="f2p-choices">
							<label class="f2p-choice">
								<input type="radio" name="civilite" value="Monsieur" data-initial-focus required>
								<span><?php echo esc_html__( 'Monsieur', F2P_TD ); ?></span>
							</label>
							<label class="f2p-choice">
								<input type="radio" name="civilite" value="Madame" required>
								<span><?php echo esc_html__( 'Madame', F2P_TD ); ?></span>
							</label>
						</div>
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'civilite-error' ) ); ?>"></p>
					</fieldset>

					<div class="f2p-field" data-field="nom">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'nom' ) ); ?>"><?php echo esc_html__( 'Nom', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<input class="f2p-input" id="<?php echo esc_attr( $fid( 'nom' ) ); ?>" name="nom" type="text" autocomplete="family-name" maxlength="80" required aria-required="true">
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'nom-error' ) ); ?>"></p>
					</div>

					<div class="f2p-field" data-field="prenom">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'prenom' ) ); ?>"><?php echo esc_html__( 'Prénom', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<input class="f2p-input" id="<?php echo esc_attr( $fid( 'prenom' ) ); ?>" name="prenom" type="text" autocomplete="given-name" maxlength="80" required aria-required="true">
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'prenom-error' ) ); ?>"></p>
					</div>

					<div class="f2p-field f2p-field--full" data-field="email">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'email' ) ); ?>"><?php echo esc_html__( 'E-mail', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<input class="f2p-input" id="<?php echo esc_attr( $fid( 'email' ) ); ?>" name="email" type="email" autocomplete="email" maxlength="120" required aria-required="true">
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'email-error' ) ); ?>"></p>
					</div>
				</div>
			</section>

			<section class="f2p-step" data-step="2" hidden>
				<h3 class="f2p-sr"><?php echo esc_html__( 'Étape 2 sur 4, adresse', F2P_TD ); ?></h3>
				<p class="f2p-intro"><?php echo esc_html__( 'Votre adresse est indispensable pour retrouver vos avoirs auprès des institutions Suisses.', F2P_TD ); ?></p>
				<p class="f2p-secure"><?php echo esc_html__( 'Vos données sont 100 % sécurisées et ne seront jamais utilisées à d’autres fins.', F2P_TD ); ?></p>
				<div class="f2p-grid">
					<div class="f2p-field" data-field="adresse">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'adresse' ) ); ?>"><?php echo esc_html__( 'Adresse', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<input class="f2p-input" id="<?php echo esc_attr( $fid( 'adresse' ) ); ?>" name="adresse" type="text" autocomplete="address-line1" placeholder="<?php echo esc_attr__( 'nom de votre rue', F2P_TD ); ?>" maxlength="120" required aria-required="true" data-initial-focus>
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'adresse-error' ) ); ?>"></p>
					</div>
					<div class="f2p-field" data-field="numero">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'numero' ) ); ?>"><?php echo esc_html__( 'Numéro', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<input class="f2p-input" id="<?php echo esc_attr( $fid( 'numero' ) ); ?>" name="numero" type="text" inputmode="text" autocomplete="off" maxlength="12" required aria-required="true">
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'numero-error' ) ); ?>"></p>
					</div>
					<div class="f2p-field" data-field="code_postal">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'code_postal' ) ); ?>"><?php echo esc_html__( 'Code Postal', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<input class="f2p-input" id="<?php echo esc_attr( $fid( 'code_postal' ) ); ?>" name="code_postal" type="text" inputmode="numeric" autocomplete="postal-code" maxlength="4" required aria-required="true">
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'code_postal-error' ) ); ?>"></p>
					</div>
					<div class="f2p-field" data-field="ville">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'ville' ) ); ?>"><?php echo esc_html__( 'Ville', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<input class="f2p-input" id="<?php echo esc_attr( $fid( 'ville' ) ); ?>" name="ville" type="text" autocomplete="address-level2" maxlength="80" required aria-required="true">
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'ville-error' ) ); ?>"></p>
					</div>
					<div class="f2p-field" data-field="pays">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'pays' ) ); ?>"><?php echo esc_html__( 'Pays', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<select class="f2p-select" id="<?php echo esc_attr( $fid( 'pays' ) ); ?>" name="pays" autocomplete="country-name" required aria-required="true">
							<?php echo F2P_Form::options( F2P_Validator::countries_for_select(), 'Suisse' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</select>
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'pays-error' ) ); ?>"></p>
					</div>
					<div class="f2p-field" data-field="nationalite">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'nationalite' ) ); ?>"><?php echo esc_html__( 'Nationalité', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<select class="f2p-select is-placeholder" id="<?php echo esc_attr( $fid( 'nationalite' ) ); ?>" name="nationalite" required aria-required="true">
							<option value="" selected><?php echo esc_html__( 'Choisissez…', F2P_TD ); ?></option>
							<?php echo F2P_Form::options( F2P_Validator::nationalities() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</select>
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'nationalite-error' ) ); ?>"></p>
					</div>
					<div class="f2p-field f2p-field--full" data-field="telephone">
						<div class="f2p-phone-wrap">
							<label class="f2p-label" for="<?php echo esc_attr( $fid( 'telephone' ) ); ?>"><?php echo esc_html__( 'Téléphone mobile', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
							<div class="f2p-phone">
								<label class="f2p-sr" for="<?php echo esc_attr( $fid( 'indicatif' ) ); ?>"><?php echo esc_html__( 'Indicatif pays', F2P_TD ); ?></label>
								<select class="f2p-select f2p-phone-code" id="<?php echo esc_attr( $fid( 'indicatif' ) ); ?>" name="indicatif" autocomplete="tel-country-code">
									<?php echo F2P_Form::options( F2P_Validator::phone_codes(), '+41' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								</select>
								<input class="f2p-input" id="<?php echo esc_attr( $fid( 'telephone' ) ); ?>" name="telephone" type="tel" inputmode="tel" autocomplete="tel" placeholder="078 123 45 67" aria-describedby="<?php echo esc_attr( $fid( 'telephone-help' ) ); ?>" required aria-required="true">
								<button type="button" class="f2p-help-btn" data-f2p-focus="<?php echo esc_attr( $fid( 'telephone-help' ) ); ?>" aria-label="<?php echo esc_attr__( 'Aide sur le numéro de téléphone', F2P_TD ); ?>">?</button>
							</div>
							<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'telephone-error' ) ); ?>"></p>
						</div>
						<p class="f2p-note" id="<?php echo esc_attr( $fid( 'telephone-help' ) ); ?>" tabindex="-1"><?php echo esc_html__( 'Attention : Un numéro de téléphone mobile valide est nécessaire pour finaliser votre demande et recevoir le SMS de sécurité.', F2P_TD ); ?></p>
					</div>
				</div>
			</section>

			<section class="f2p-step" data-step="3" hidden>
				<h3 class="f2p-sr"><?php echo esc_html__( 'Étape 3 sur 4, situation', F2P_TD ); ?></h3>
				<div class="f2p-grid">
					<div class="f2p-field" data-field="etat_civil">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'etat_civil' ) ); ?>"><?php echo esc_html__( 'État civil', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<select class="f2p-select is-placeholder" id="<?php echo esc_attr( $fid( 'etat_civil' ) ); ?>" name="etat_civil" data-initial-focus required aria-required="true">
							<option value="" selected><?php echo esc_html__( 'Choisissez…', F2P_TD ); ?></option>
							<?php echo F2P_Form::options( F2P_Validator::civil_statuses() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</select>
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'etat_civil-error' ) ); ?>"></p>
					</div>
					<div class="f2p-field" data-field="avs">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'avs' ) ); ?>"><?php echo esc_html__( 'Numéro AVS', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<input class="f2p-input" id="<?php echo esc_attr( $fid( 'avs' ) ); ?>" name="avs" type="text" inputmode="numeric" autocomplete="off" spellcheck="false" placeholder="756.xxxx.xxxx.xx" maxlength="16" required aria-required="true" aria-describedby="<?php echo esc_attr( $fid( 'avs-help' ) ); ?>">
						<button type="button" class="f2p-link" data-f2p-toggle="<?php echo esc_attr( $fid( 'avs-help' ) ); ?>" aria-expanded="false" aria-controls="<?php echo esc_attr( $fid( 'avs-help' ) ); ?>"><?php echo esc_html__( 'Où trouver mon numéro AVS ?', F2P_TD ); ?></button>
						<div class="f2p-popover" id="<?php echo esc_attr( $fid( 'avs-help' ) ); ?>" role="note" tabindex="-1" hidden>
							<?php echo esc_html__( 'Le numéro AVS (AHV) figure sur votre carte d’assurance-maladie suisse et sur votre certificat d’assurance. Il comporte 13 chiffres et commence par 756, au format 756.xxxx.xxxx.xx.', F2P_TD ); ?>
						</div>
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'avs-error' ) ); ?>"></p>
					</div>
					<div class="f2p-field" data-field="date_naissance">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'date' ) ); ?>"><?php echo esc_html__( 'Date de naissance', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<div class="f2p-inline">
							<input class="f2p-input" id="<?php echo esc_attr( $fid( 'date' ) ); ?>" name="date_naissance" type="text" inputmode="numeric" autocomplete="off" placeholder="jj/mm/aaaa" maxlength="10" required aria-required="true" aria-describedby="<?php echo esc_attr( $fid( 'date-help' ) ); ?>">
							<button type="button" class="f2p-help-btn" data-f2p-toggle="<?php echo esc_attr( $fid( 'date-help' ) ); ?>" aria-expanded="false" aria-controls="<?php echo esc_attr( $fid( 'date-help' ) ); ?>" aria-label="<?php echo esc_attr__( 'Aide sur la date de naissance', F2P_TD ); ?>">?</button>
						</div>
						<div class="f2p-popover" id="<?php echo esc_attr( $fid( 'date-help' ) ); ?>" role="note" tabindex="-1" hidden>
							<?php echo esc_html__( 'Saisissez votre date de naissance au format jour/mois/année (jj/mm/aaaa).', F2P_TD ); ?>
						</div>
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'date-error' ) ); ?>"></p>
					</div>
					<div class="f2p-field" data-field="caisse">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'caisse' ) ); ?>"><?php echo esc_html__( 'Caisse de pension actuelle (optionnel)', F2P_TD ); ?></label>
						<input class="f2p-input" id="<?php echo esc_attr( $fid( 'caisse' ) ); ?>" name="caisse" type="text" maxlength="120">
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'caisse-error' ) ); ?>"></p>
					</div>
					<div class="f2p-field f2p-field--full" data-field="emploi">
						<label class="f2p-label" for="<?php echo esc_attr( $fid( 'emploi' ) ); ?>"><?php echo esc_html__( 'Avez-vous un emploi en Suisse ?', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
						<select class="f2p-select is-placeholder" id="<?php echo esc_attr( $fid( 'emploi' ) ); ?>" name="emploi" required aria-required="true">
							<option value="" selected><?php echo esc_html__( 'Choisissez…', F2P_TD ); ?></option>
							<?php echo F2P_Form::options( F2P_Validator::employment_options() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</select>
						<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'emploi-error' ) ); ?>"></p>
					</div>
				</div>
			</section>

			<section class="f2p-step" data-step="4" hidden>
				<h3 class="f2p-sr"><?php echo esc_html__( 'Étape 4 sur 4, signature', F2P_TD ); ?></h3>
				<div class="f2p-field" data-field="signature">
					<div class="f2p-sign-head">
						<p class="f2p-label" id="<?php echo esc_attr( $fid( 'sign-label' ) ); ?>"><?php echo esc_html__( 'Signature', F2P_TD ); ?><?php echo $req; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
						<button type="button" class="f2p-btn f2p-btn--clear" data-f2p-clear><?php echo esc_html__( 'Effacer', F2P_TD ); ?></button>
					</div>
					<p class="f2p-sign-hint"><?php echo esc_html__( 'Signez avec la souris ou le doigt dans le cadre.', F2P_TD ); ?></p>
					<canvas class="f2p-canvas" data-initial-focus width="640" height="130" tabindex="0" role="img" aria-labelledby="<?php echo esc_attr( $fid( 'sign-label' ) ); ?>"></canvas>
					<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'signature-error' ) ); ?>"></p>
				</div>
				<div class="f2p-field f2p-consent" data-field="consentement">
					<label class="f2p-check">
						<input type="checkbox" name="consentement" value="1" required aria-required="true">
						<span><?php echo esc_html__( 'Je certifie que les informations fournies sont exactes et j’accepte qu’elles soient utilisées uniquement pour rechercher mes avoirs de libre passage.', F2P_TD ); ?></span>
					</label>
					<p class="f2p-field-error" id="<?php echo esc_attr( $fid( 'consent-error' ) ); ?>"></p>
				</div>
			</section>
		</div>

		<div class="f2p-success" hidden>
			<p class="f2p-intro"><?php echo esc_html__( 'Merci. Votre demande a bien été envoyée.', F2P_TD ); ?></p>
			<p class="f2p-secure"><?php echo esc_html__( 'Elle sera traitée afin de rechercher vos avoirs de libre passage auprès des institutions de prévoyance en Suisse.', F2P_TD ); ?></p>
		</div>

		<div class="f2p-actions">
			<button type="button" class="f2p-btn f2p-btn--prev" hidden><?php echo esc_html__( '← Précédent', F2P_TD ); ?></button>
			<button type="submit" class="f2p-btn f2p-btn--next"><?php echo esc_html__( 'Suivant', F2P_TD ); ?></button>
		</div>
	</form>

	<ul class="f2p-trust">
		<li class="f2p-trust-item">
			<span class="f2p-trust-icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="18" height="18" focusable="false"><path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M14 3.5V8h4.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 13.2l2.1 2.1 4.2-4.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
			</span>
			<span class="f2p-trust-label"><?php echo esc_html__( 'Recherche', F2P_TD ); ?><br><?php echo esc_html__( 'gratuite', F2P_TD ); ?></span>
		</li>
		<li class="f2p-trust-item">
			<span class="f2p-trust-icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="18" height="18" focusable="false"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
			</span>
			<span class="f2p-trust-label"><?php echo esc_html__( 'En 3', F2P_TD ); ?><br><?php echo esc_html__( 'minutes', F2P_TD ); ?></span>
		</li>
		<li class="f2p-trust-item">
			<span class="f2p-trust-icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="18" height="18" focusable="false"><circle cx="12" cy="8" r="3.1" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5.6 19.2c1.1-3.2 3.3-4.7 6.4-4.7s5.3 1.5 6.4 4.7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
			</span>
			<span class="f2p-trust-label"><?php echo esc_html__( 'Simple', F2P_TD ); ?></span>
		</li>
		<li class="f2p-trust-item">
			<span class="f2p-trust-icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="18" height="18" focusable="false"><rect x="6" y="10.5" width="12" height="9" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
			</span>
			<span class="f2p-trust-label"><?php echo esc_html__( 'Sécurisé', F2P_TD ); ?></span>
		</li>
	</ul>
	<noscript>
		<p class="f2p-banner"><?php echo esc_html__( 'Activez JavaScript pour remplir ce formulaire.', F2P_TD ); ?></p>
	</noscript>
</div>
