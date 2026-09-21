# QUALICOM-CI — Site institutionnel

Site vitrine de **QUALICOM – Côte d'Ivoire sarl**, intégrateur de solutions informatiques,
télécoms et second œuvre depuis 2012, présent à Abidjan (Côte d'Ivoire) et à Bamako (Mali).

Site en ligne : **https://qualicom.myoctogone.com/**

## Stack

HTML / CSS / JavaScript statiques, sans framework ni étape de build. Aucune dépendance à
installer — le site s'ouvre et se déploie tel quel.

- `assets/css/style.css` — design system (couleurs, typographie, composants réutilisables :
  header, cartes, grilles, formulaires, footer...)
- `assets/js/main.js` — interactions (menu mobile, header sticky, animations au scroll,
  compteurs, galerie/lightbox, formulaire de contact)
- `assets/img/` — logo, photos, logos clients et partenaires

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | Accueil |
| `qui-sommes-nous.html` | Présentation, valeurs, direction, implantations |
| `services.html` | Vue d'ensemble des 3 pôles de services |
| `services-informatique.html` | Détail des services informatiques |
| `services-telecoms.html` | Détail des services télécoms |
| `services-second-oeuvre.html` | Génie civil, sécurité électronique, électricité, climatisation |
| `realisations.html` | Galerie de réalisations |
| `nos-references.html` | Clients et projets réalisés |
| `partenaires.html` | Partenaires techniques et représentations officielles |
| `contact.html` | Coordonnées, plans d'accès et formulaire de contact |

## Modifier le site

Aucun outil requis : ouvrez n'importe quel fichier `.html` dans un navigateur pour prévisualiser,
éditez le HTML/CSS/JS directement, puis publiez (le déploiement suit la branche `main`).

Pour ajouter une page, dupliquez une page existante et reprenez telle quelle la structure
`<header>` / menu mobile / `<footer>` (identique sur toutes les pages) afin de garder la
navigation cohérente.

Le fichier `CNAME` configure le nom de domaine personnalisé (`qualicom.myoctogone.com`) — ne
pas le supprimer.
