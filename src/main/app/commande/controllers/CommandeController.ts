/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
import IPanierService from "../../panier/services/IPanierService";
import IOfferService from "../services/IOfferService";
import IBookService from "../../xebia/services/IBookService";
import ICommercialOfferService from "../../xebia/services/ICommercialOfferService";
import Book from "../../xebia/models/Book";
import CommercialOffer from "../../xebia/models/CommercialOffer";
import Item from "../../panier/models/Item";

/**
 * CommandeController
 * 
 * Controller that expose user interface functions relative to a commande
 */
class CommandeController {

    /** 
     * Angular injected services
     */
    static $inject = [
        "$rootScope",
        "panierService",
        "offerService",
        "commercialOfferService"
    ];
    static rootScopeService: ng.IRootScopeService;
    static panierService: IPanierService;
    static offerService: IOfferService;
    static commercialService: ICommercialOfferService;

    /**
     * View fields
     */
    private items: Array<Item> = [];
    private itemsAmount: number = 0;
    private offer: CommercialOffer = {
        type: "",
        value: 0   
    };
    private offerAmount: number = 0;

    /**
     * Constructor
     * 
     * Initlise the controller
     * 
     * @param panier service
     * @param offer service
     * @param book service
     */
    constructor($rootScope: ng.IRootScopeService, 
                panierService: IPanierService, 
                offerService: IOfferService, 
                commercialOfferService: ICommercialOfferService) {
        CommandeController.rootScopeService = $rootScope;
        CommandeController.panierService = panierService;
        CommandeController.offerService = offerService;
        CommandeController.commercialService = commercialOfferService
        let items: Array<Item> = panierService.getItems();
        this.updateControllerFields(items);
    }

    /**
     * removeBook
     * 
     * Remove book from commande
     * 
     * @param book to remove
     */
    public removeBook(item: Item): void {
        let items: Array<Item> = CommandeController.panierService.removeItem(item);
        CommandeController.rootScopeService.$emit("REFRESH_PANIER");
        this.updateControllerFields(items);
    }

    /**
     * updateController
     * 
     */
    private updateControllerFields(items: Array<Item>): void {
        this.updateItems(items);
        this.updateItemsAmount();
        this.updateCommercialOffers();
    }

    /**
     * updateItems
     * 
     * @param books
     */
    private updateItems(items: Array<Item>): void {
        this.items = items;
    }

    /**
     * updateItemsAmount
     */
    private updateItemsAmount(): void {
        this.itemsAmount = 0;
        for (let i = 0; i < this.items.length; i++) {
            let item: Item = this.items[i];
            this.itemsAmount += item.price * item.quantity;
        }
    }

    /**
     * updateCommercialOffers
     */
    private updateCommercialOffers(): void {
        this.updateBookCommercialOffer();
    }

    private updateBookCommercialOffer(): void {
        let books: Array<Item> = this.items.filter((item: Item): boolean => {
            return item.type === "book";
        });
        let isbns: Array<string> = [];
        for (let i = 0; i < books.length; i ++) {
            let book: Item = books[i];
            isbns.push(book.id);
        }
        let self = this;
        CommandeController.commercialService.getCommercialOffers(isbns)
        .then((commercialOffers: Array<CommercialOffer>) => {
            self.offer = CommandeController.offerService.getBestCommercialOffer(self.itemsAmount, commercialOffers);
            self.offerAmount = CommandeController.offerService.computeCommercialOfferAmount(self.offer, self.itemsAmount);
        });
    }
    
}
export default CommandeController;