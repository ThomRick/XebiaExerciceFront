import Item from "../models/Item";

/**
 * IPanierService
 * 
 * Interface to declare panier services
 */
interface IPanierService {
    addItem(item: Item): Array<Item>;
    getItems(): Array<Item>;
    getAmount(): number;
    removeItem(item: Item): Array<Item>;
}
export default IPanierService;