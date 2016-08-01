import IPanierService from "../IPanierService";
import Book from "../../../xebia/models/Book";

/**
 * PanierService
 */
class PanierService implements IPanierService {
    
    private books: Array<Book>;
    
    constructor() {
        this.books = [];
    }

    /**
     * addBook
     */
    public addBook(book: Book): void {
        this.books.push(book);
    }

    /**
     * getBooks
     */
    public getBooks(): Array<Book> {
        return this.books;
    }
}
export default PanierService;