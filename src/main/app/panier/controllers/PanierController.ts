/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
import IPanierService from "../services/IPanierService";
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
        let books: Array<Book> = PanierController.panierService.getBooks();
        this.items = books.length;
        this.computeAmount(books);
        this.addEvent($rootScope);
    }

    /**
     * Initialise event contoller listeners
     * 
     * @param the $rootScope service that expose event methods
     */
    private addEvent($rootScope: ng.IRootScopeService): void {
        $rootScope.$on("REFRESH_PANIER", () => {
            let books: Array<Book> = PanierController.panierService.getBooks();
            this.items = books.length;
            this.computeAmount(books);
        });
    }

    /**
     * Function that compute the amount of a list of book
     * 
     * @param list off books to compute the amount
     * @return the amount of the list of book
     */
    private computeAmount(books: Array<Book>) {
        this.amount = 0;
        for (let i = 0; i < books.length; i++) {
            let book: Book = books[i];
            this.amount += book.price;
        }
    }
}
export default PanierController;