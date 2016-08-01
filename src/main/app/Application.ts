/// <reference path="../../../typings/angularjs/angular.d.ts" />
import BookService from "./xebia/services/impl/BookService";
import MagasinController from "./magasin/controllers/MagasinController";
import PanierService from "./panier/services/impl/PanierService";
import CommandeController from "./commande/controllers/CommandeController";

/**
 * Application module
 */
angular.module("application", [ "ngRoute" ])
       .service("bookService", BookService)
       .service("panierService", PanierService)
       .component("magasin", {
           controller: MagasinController,
           templateUrl: "templates/magasin.html"
       })
       .component("commande", {
           controller: CommandeController,
           templateUrl: "templates/commande.html"
       })
       .config([ "$routeProvider" , function config($routeProvider) {
            $routeProvider.when("/magasin", {
                template: "<magasin></magasin>"
            })
            .when("/commande", {
                template: "<commande></commande>"
            })
            .otherwise("/magasin"); 
      }]);