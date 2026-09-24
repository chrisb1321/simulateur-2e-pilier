# Formulaire deuxième pilier

Extension WordPress : formulaire en 4 étapes pour une recherche d’avoirs de libre passage en Suisse. Aucune étape de compilation : PHP, CSS et JavaScript sont prêts à l’emploi.

Shortcode : `[formulaire_deuxieme_pilier]`

## Installation

1. Compressez le dossier `formulaire-deuxieme-pilier` (le zip doit contenir ce dossier à la racine), ou copiez-le dans `wp-content/plugins/`.
2. Dans l’administration WordPress, ouvrez **Extensions** et activez **Formulaire deuxième pilier**.
3. Créez ou éditez une page, puis collez le shortcode `[formulaire_deuxieme_pilier]`.
4. Ouvrez **Réglages → Formulaire 2e pilier**. Indiquez l’e-mail qui reçoit les demandes. Si le champ reste vide, l’adresse d’administration du site est utilisée. Le sujet de l’e-mail est facultatif.
5. Enregistrez la page et affichez-la : le formulaire rouge en 4 étapes est prêt.

## Étape 1 (hypothèse)

Les maquettes fournies commencent à l’adresse (étape 2). L’étape 1 reprend le même habillage et demande :

- **Civilité** — obligatoire, Monsieur ou Madame
- **Nom** — obligatoire
- **Prénom** — obligatoire
- **E-mail** — obligatoire

Si votre parcours doit commencer autrement, ces quatre champs se modifient dans `templates/form.php` et dans `includes/class-f2p-validator.php`.

## Étape 4

L’étape 4 est la signature. La personne signe dans le cadre (souris ou doigt), peut effacer, coche une case d’exactitude obligatoire, puis envoie la demande. Le bouton principal de cette étape envoie le formulaire.

## Données

Chaque demande part par `wp_mail` vers le destinataire configuré. La signature est jointe en PNG. Le numéro AVS figure dans cet e-mail et n’est pas enregistré en base (ni option, ni article, ni métadonnée). Les réglages ne conservent que l’e-mail destinataire et le sujet.

Le contrôle du numéro AVS reprend la clé EAN-13 (préfixe 756). Le mobile accepté est un numéro suisse au format `07x xxx xx xx` ou `+41 7x xxx xx xx`. Pour la Suisse, le code postal doit comporter 4 chiffres.
