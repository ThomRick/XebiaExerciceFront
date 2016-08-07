/// <reference path="../../../../../../typings/angularjs/angular.d.ts" />
import IStoreService from "../IStoreService";
import Item from "../../../panier/models/Item";
import IBookService from "../../../xebia/services/IBookService";
import Book from "../../../xebia/models/Book";
import ItemMapper from "../mappers/ItemMapper";

/**
 * StoreService
 */
class StoreService implements IStoreService {
    
    static $inject = [
        "bookService",
        "itemMapper"
    ];
    static bookService: IBookService;
    static itemMapper: ItemMapper;
    
    constructor(bookService: IBookService, itemMapper: ItemMapper) {
        StoreService.bookService = bookService;
        StoreService.itemMapper = itemMapper;
    }

    public getAllItems(): ng.IPromise<Array<Item>> {
        return StoreService.bookService.getAllBooks()
        .then((books: Array<Book>) => {
            let items: Array<Item> = [];
            for (let i = 0; i < books.length; i++) {
                let book: Book = books[i];
                let item: Item = StoreService.itemMapper.mappFrom(book);
                items.push(item);
            }
            return items;
        });
    }
}
export default StoreService;