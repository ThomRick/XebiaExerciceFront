/// <reference path="../../../typings/angularjs/angular.d.ts" />
import BookService from "./xebia/services/impl/BookService";
import CommercialOfferService from "./xebia/services/impl/CommercialOfferService";
import PanierService from "./panier/services/impl/PanierService";
import OfferService from "./commande/services/impl/OfferService";
import StoreService from "./magasin/services/impl/StoreService";
import MagasinController from "./magasin/controllers/MagasinController";
import CommandeController from "./commande/controllers/CommandeController";
import PanierController from "./panier/controllers/PanierController";
import ItemMapper from "./magasin/services/mappers/ItemMapper";

/**
 * Application module
 */
angular.module("application", [ "ngRoute" ])
       .service("bookService", BookService)
       .service("commercialOfferService", CommercialOfferService)
       .service("panierService", PanierService)
       .service("offerService", OfferService)
       .service("storeService", StoreService)
       .service("itemMapper", ItemMapper)
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