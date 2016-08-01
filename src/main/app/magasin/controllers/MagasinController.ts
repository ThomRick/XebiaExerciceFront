/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
import IBookService from "../../xebia/services/IBookService";
import IPanierService from "../../panier/services/IPanierService";
import Book from "../../xebia/models/Book";

/**
 * MagasinController
 */
class MagasinController {

    static panierService: IPanierService;

    private books: Array<Book> = [];

    private $inject = [
        "bookService",
        "panierService"
    ];

    constructor(bookService: IBookService, panierService: IPanierService) {
        let self = this;
        MagasinController.panierService = panierService;
        bookService.getAllBooks()
        .then((books: Array<Book>) => {
            console.log(books);
            
            self.books = books;
            console.log(self.books);
            
        });        
    }

    /**
     * addBookToPanier
     */
    public addBookToPanier(book: Book) {
        MagasinController.panierService.addBook(book);
    }
}
export default MagasinController;