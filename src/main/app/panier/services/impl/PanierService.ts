import IPanierService from "../IPanierService";
import Book from "../../../xebia/models/Book";

/**
 * PanierService
 * 
 * Implementation of a panier
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

    /**
     * getAmount
     */
    public getAmount(): number {
        let amount: number = 0;
        for (let i = 0; i < this.books.length; i++) {
            let book: Book = this.books[i];
            amount += book.price;
        }
        return amount;
    }
}
export default PanierService;