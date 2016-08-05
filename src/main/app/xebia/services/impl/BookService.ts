/// <reference path="../../../../../../typings/angularjs/angular.d.ts" />
import IBookService from "../IBookService";
import Book from "../../models/Book";
import CommercialOffer from "../../models/CommercialOffer";

/**
 * BookService
 * 
 * Implementation of the Xebia book API 
 */
class BookService implements IBookService {

    /**
     * Angular injected service names
     */
    static $inject = [
        "$http"
    ];

    /**
     * http service to execute http request to an API
     */
    private httpService: ng.IHttpService;
    
    /**
     * Constructor
     * will initialise service injected services
     */
    constructor($http: ng.IHttpService) {
        this.httpService = $http;
    }

    /**
     * getAllBooks
     * 
     * @return a promise with an array of books from Xebia Harry Potier API
     */
    public getAllBooks(): ng.IPromise<Array<Book>>{
        return this.httpService.get<Array<Book>>("http://henri-­potier.xebia.fr/books/")
        .then<Array<Book>>((response: ng.IHttpPromiseCallbackArg<Array<Book>>) => {
            return response.data;
        });
    }

    /**
     * getCommercialOffers
     * 
     * @param books to compute the available commercial offers
     * @return a promise containing a CommercialOffer with applicable offers for a list of books 
     */
    public getCommercialOffers(books: Array<Book>): ng.IPromise<CommercialOffer> {
        let isbnsChaine: string = this.buildIsbnsChaine(books);
        return this.httpService.get<CommercialOffer>("http://henri-­potier.xebia.fr/books/" + isbnsChaine + "/commercialOffers")
        .then<CommercialOffer>((response: ng.IHttpPromiseCallbackArg<CommercialOffer>) => {
            return response.data;
        });
    }

    /**
     * buildIsbnsChaine
     * 
     * @param books to build the commercial offer isbn chain
     * @return the isbn chain to call commercial offer service 
     */
    private buildIsbnsChaine(books: Array<Book>): string {
        let isbnsChaine: string = "";
        for (let i = 0; i < books.length; i++) {
            let book: Book = books[i];
            isbnsChaine += book.isbn + ",";
        }
        return isbnsChaine.slice(0, isbnsChaine.length - 1);
    }

}
export default BookService;