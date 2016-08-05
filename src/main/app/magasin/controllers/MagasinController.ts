/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
import IBookService from "../../xebia/services/IBookService";
import IPanierService from "../../panier/services/IPanierService";
import Book from "../../xebia/models/Book";

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
        "bookService",
        "panierService"
    ];
    static panierService: IPanierService;
    static rootScopeService: ng.IRootScopeService;

    /**
     * View fields
     */
    private books: Array<Book> = [];

    /**
     * Constructor
     * 
     * Initialise the controller
     * 
     * @param $rootScope service
     * @param book service
     * @param panier service 
     */
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
     * 
     * @param the book to add to the panier
     */
    public addBookToPanier(book: Book) {
        MagasinController.panierService.addBook(book);
        MagasinController.rootScopeService.$emit("REFRESH_PANIER");
    }
}
export default MagasinController;