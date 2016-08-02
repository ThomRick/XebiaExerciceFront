/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
import IBookService from "../../xebia/services/IBookService";
import IPanierService from "../../panier/services/IPanierService";
import Book from "../../xebia/models/Book";

/**
 * MagasinController
 */
class MagasinController {

    static panierService: IPanierService;
    static rootScopeService: ng.IRootScopeService;

    private books: Array<Book> = [];

    private $inject = [
        "$rootScope",
        "bookService",
        "panierService"
    ];

    constructor($rootScope: ng.IRootScopeService, bookService: IBookService, panierService: IPanierService) {
        let self = this;
        MagasinController.rootScopeService = $rootScope;
        MagasinController.panierService = panierService;
        bookService.getAllBooks()
        .then((books: Array<Book>) => {
            self.books = books;
        });        
    }

    /**
     * addBookToPanier
     */
    public addBookToPanier(book: Book) {
        MagasinController.panierService.addBook(book);
        MagasinController.rootScopeService.$emit("REFRESH_PANIER");
    }
}
export default MagasinController;