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

}
export default BookService;