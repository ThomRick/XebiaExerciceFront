/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
import IPanierService from "../services/IPanierService";
import Item from "../models/Item";
import Book from "../../xebia/models/Book";

/**
 * PanierController
 * 
 * Controller that expose user interface functions relative to a Panier
 */
class PanierController {

    /**
     * Angular injected services
     */
    static $inject = [
        "$rootScope",
        "panierService"
    ];
    static panierService: IPanierService;

    /**
     * View fields
     */
    private items: number = 0;
    private amount: number = 0;

    /**
     * Controller
     * 
     * Initialise the controller
     * 
     * @param $rootScope service
     * @param panier service
     */
    constructor($rootScope: ng.IRootScopeService, panierService: IPanierService) {
        PanierController.panierService = panierService;
        let items: Array<Item> = PanierController.panierService.getItems();
        this.items = items.length;
        this.computeAmount(items);
        this.addEvent($rootScope);
    }

    /**
     * Initialise event contoller listeners
     * 
     * @param the $rootScope service that expose event methods
     */
    private addEvent($rootScope: ng.IRootScopeService): void {
        $rootScope.$on("REFRESH_PANIER", () => {
            let items: Array<Item> = PanierController.panierService.getItems();
            this.items = items.length;
            this.computeAmount(items);
        });
    }

    /**
     * Function that compute the amount of a list of book
     * 
     * @param list off items to compute the amount
     * @return the amount of the list of book
     */
    private computeAmount(items: Array<Item>) {
        this.amount = 0;
        for (let i = 0; i < items.length; i++) {
            let item: Item = items[i];
            this.amount += item.price * item.quantity;
        }
    }
}
export default PanierController;