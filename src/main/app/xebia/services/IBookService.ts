/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
import Book from "../models/Book";

/**
 * IBookService
 */
interface IBookService {
    getAllBooks(): ng.IPromise<Array<Book>>;
}
export default IBookService;