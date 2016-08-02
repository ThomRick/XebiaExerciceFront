/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
import IPanierService from "../services/IPanierService";
import Book from "../../xebia/models/Book";

/**
 * PanierController
 */
class PanierController {

    static $inject = [
        "$rootScope",
        "panierService"
    ];
    static panierService: IPanierService;

    private items: number = 0;
    private amount: number = 0;

    constructor($rootScope: ng.IRootScopeService, panierService: IPanierService) {
        PanierController.panierService = panierService;
        let books: Array<Book> = PanierController.panierService.getBooks();
        this.items = books.length;
        this.computeAmount(books);
        this.addEvent($rootScope);
    }

    private addEvent($rootScope: ng.IRootScopeService): void {
        $rootScope.$on("REFRESH_PANIER", () => {
            let books: Array<Book> = PanierController.panierService.getBooks();
            this.items = books.length;
            this.computeAmount(books);
        });
    }

    private computeAmount(books: Array<Book>) {
        this.amount = 0;
        for (let i = 0; i < books.length; i++) {
            let book: Book = books[i];
            this.amount += book.price;
        }
    }
}
export default PanierController;