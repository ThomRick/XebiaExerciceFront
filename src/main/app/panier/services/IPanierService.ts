import Book from "../../xebia/models/Book";

/**
 * IPanierService
 */
interface IPanierService {
    addBook(book: Book): void;
    getBooks(): Array<Book>;
    getAmount(): number;
}
export default IPanierService;