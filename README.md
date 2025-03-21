# ProjetVueJS Samy Lekhal : Demineur

Le projet de démineur est une implémentation du jeu du démineur programmer via Vue.js et Firebase pour la gestion des scores. 

## Objectif du Projet
Ce projet visait à recréer le jeu classique de démineur avec une interface des fonctionnalités supplémentaires telles que la gestion des scores et l'authentification des utilisateurs. Le but est de permettre aux joueurs de s'affronter en enregistrant leurs meilleurs scores dans une base de données Firebase.


## Fonctionnalités Principales

Interface utilisateur : Grille de jeu interactive avec des cases cliquables.
Gestion des scores : Enregistrement des scores des joueurs dans Firebase.
Authentification : Connexion des utilisateurs via Firebase Authentication.
Timer : Chronomètre pour mesurer le temps de jeu.
Difficulté réglable : Niveaux de difficulté ajustables (facile, moyen, difficile).
Indicateurs visuels : Affichage des mines restantes et du temps écoulé

## Difficultés rencontré 
Plusieurs difficultés ont été rencontrées durant le développement que ça soit par exemple le simple fait de comment faire un démineur dans un premier temps ou alors comment s'assurer que la première case cliquée soit forcément vide. Sans compter aussi l'apprentissage de firebase et comment enregistrer et utiliser les données de la base de données. 

La conception du démineur et de l'utilisation de firebase a pu être réalisé en s'inspirant de certains codes et tutoriel permettant d'en faire un en javascript ce qui aura permis de scinder le jeu en trois composant un pour une case du jeu, un pour la grille et un autre pour le timer. Pour s'assurer que la grille commence toujours par une case vide, l'idée a été de faire en sorte que les mines soit placé en premier après que le joueur ait cliqué sur la première case, les mines sont répartis aléatoirement dans les cases de la grille à l'exception de celle sur laquelle le joueur à cliqué et ses cases adjacentes. 


Certaines fonctionalités n'ont malheureusement pas pu être finalisé par manque de temps comme l'idée de l'ajout d'un niveau personalisé ou encore le décochage automatique des cases vides.

## Installation

### Récupérer le code
Extraire le fichier .zip reçu ou cloner le depot github du projet avec la commade suivante:

```sh
git clone https://github.com/Samylekhal/ProjetVueJS.git
```

### Installer les dépendances
```sh
npm install
```

### Configurer Firebase

Créer un projet de base de données avec firebase

- Dans régles modifié la 6 ligne du code présent "allow read, write: if false;" 
en remplaçant "false" par "true"

- Allez dans le fichier firebase.js présent dans le dossier src 
et remplacé les variables présentes dans firebaseConfig par celle de votre database.
Vous les trouverez dans les paramètres généraux de votre base de données en descendant la page.


### Lancer le site

Utiliser la commande "npm run dev" et cliquer sur le lien localhost vous avez désormais accès au site !
