<?php
/**
 * Supprime uniquement les réglages du plugin.
 * Aucune demande (et donc aucun numéro AVS) n’est stockée en base.
 *
 * @package Formulaire_Deuxieme_Pilier
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

delete_option( 'f2p_settings' );
