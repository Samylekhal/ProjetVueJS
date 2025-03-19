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
Plusieurs difficultés on été rencontré durant le developpement que ça soit par exemple le simple fait de comment faire un démineur dans un premier temps ou alors comment 
s'assurer que la première case cliqué soit forcément vide. Sans compté aussi l'apprentissage de firebase et comment enregistré et utiliser les données de la base de données. 


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
