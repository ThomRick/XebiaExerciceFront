/// <reference path="../../../typings/angularjs/angular.d.ts" />
import BookService from "./xebia/services/impl/BookService";
import PanierService from "./panier/services/impl/PanierService";
import OfferService from "./commande/services/impl/OfferService";
import MagasinController from "./magasin/controllers/MagasinController";
import CommandeController from "./commande/controllers/CommandeController";
import PanierController from "./panier/controllers/PanierController";

/**
 * Application module
 */
angular.module("application", [ "ngRoute" ])
       .service("bookService", BookService)
       .service("panierService", PanierService)
       .service("offerService", OfferService)
       .component("magasin", {
           controller: MagasinController,
           templateUrl: "templates/magasin.html"
       })
       .component("commande", {
           controller: CommandeController,
           templateUrl: "templates/commande.html"
       })
       .component("panier", {
           controller: PanierController,
           templateUrl: "templates/panier.html"
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