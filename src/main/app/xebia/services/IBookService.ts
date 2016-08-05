/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
import Book from "../models/Book";
import CommercialOffer from "../models/CommercialOffer";

/**
 * IBookService
 */
interface IBookService {
    getAllBooks(): ng.IPromise<Array<Book>>;
    getCommercialOffers(books: Array<Book>): ng.IPromise<CommercialOffer>;
}
export default IBookService;