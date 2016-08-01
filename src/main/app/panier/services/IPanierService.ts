import Book from "../../xebia/models/Book";

interface IPanierService {
    addBook(book: Book): void;
    getBooks(): Array<Book>;
}
export default IPanierService;