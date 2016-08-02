// http://henri-­potier.xebia.fr/books/c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885c05db861/commercialOffers
/// <reference path="../../../../../../typings/angularjs/angular.d.ts" />
import IBookService from "../IBookService";
import Book from "../../models/Book";
import CommercialOffer from "../../models/CommercialOffer";

/**
 * BookService
 */
class BookService implements IBookService {

    private httpService: ng.IHttpService;

    static $inject = [
        "$http"
    ];
    
    constructor($http: ng.IHttpService) {
        this.httpService = $http;
    }

    /**
     * getAllBooks
     */
    public getAllBooks(): ng.IPromise<Array<Book>>{
        return this.httpService.get<Array<Book>>("http://henri-­potier.xebia.fr/books/")
        .then<Array<Book>>((response: ng.IHttpPromiseCallbackArg<Array<Book>>) => {
            return response.data;
        });
    }

    /**
     * getCommercialOffers
     */
    public getCommercialOffers(books: Array<Book>): ng.IPromise<CommercialOffer> {
        let isbnsChaine: string = this.buildIsbnsChaine(books);
        return this.httpService.get<CommercialOffer>("http://henri-­potier.xebia.fr/books/" + isbnsChaine + "/commercialOffers")
        .then<CommercialOffer>((response: ng.IHttpPromiseCallbackArg<CommercialOffer>) => {
            return response.data;
        });
    }

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