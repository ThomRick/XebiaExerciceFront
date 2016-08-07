import Book from "../../../xebia/models/Book";
import Item from "../../../panier/models/Item";

/**
 * ItemMapper
 */
class ItemMapper {
    
    constructor() {}

    public mappFrom(book: Book): Item {
        return {
            id: book.isbn,
            type: "book",
            description: {
                cover: book.cover,
                title: book.title
            },
            price: book.price
        };
    }
}
export default ItemMapper;