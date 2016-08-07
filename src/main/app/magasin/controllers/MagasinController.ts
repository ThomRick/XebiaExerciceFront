/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
import IBookService from "../../xebia/services/IBookService";
import IPanierService from "../../panier/services/IPanierService";
import IStoreService from "../services/IStoreService";
import Book from "../../xebia/models/Book";
import Item from "../../panier/models/Item";

/**
 * MagasinController
 * 
 * Controller that expose user interface functions relative to a magasin
 */
class MagasinController {

    /**
     * Angual injected services
     */
    private $inject = [
        "$rootScope",
        "panierService",
        "storeService"
    ];
    static panierService: IPanierService;
    static storeService: IStoreService;
    static rootScopeService: ng.IRootScopeService;

    /**
     * View fields
     */
    private items: Array<Item> = [];

    /**
     * Constructor
     * 
     * Initialise the controller
     * 
     * @param $rootScope service
     * @param book service
     * @param panier service 
     */ 
    constructor($rootScope: ng.IRootScopeService, panierService: IPanierService, storeService: IStoreService) {
        let self = this;
        MagasinController.rootScopeService = $rootScope;
        MagasinController.panierService = panierService;
        storeService.getAllItems()
        .then((items: Array<Item>) => {
            self.items = items;
        });
    }

    /**
     * addBookToPanier
     * 
     * @param the item to add
     */
    public addBookToPanier(item: Item) {
        MagasinController.panierService.addItem(item);
        MagasinController.rootScopeService.$emit("REFRESH_PANIER");
    }
}
export default MagasinController;