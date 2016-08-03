# XebiaExerciceFront

Solution proposée pour la résolution de l'exercice front Harry Potier de Xebia

# Outils utilisés

    - Visual Studio Code
    - NodeJs version 6.2.0
    - npm package http-server
    - npm package gulp
    - npm package gulp-jasmine
    - npm package gulp-typescript
    - npm package gulp-browserify
    - npm package angular
    - npm package angular-route

# Build du projet

## Prerequis

    - installer le npm package gulp-cli pour executer gulp
        npm install gulp-cli -g
    
    - installer le npm package tsd pour télécharger les fichiers de déclation typescript
        npm install tsd -g

## Build

    - executer au sein du projet les commandes
        npm install (télécharger les dépendances locales pour mettre en place l'environnement de développement)
        tsd install (télécharger les fichiers de descriptions)
        gulp install (pour build les sources dans le répertoire target/build)

# Run du projet

    - se placer dans le répertoire target/build du projet
    - exécuter la commande http-server pour démarrer un serveur http permettant de servir les fichiers statiques du client
    - lancer un navigateur avec l'url http://localhost:8080

