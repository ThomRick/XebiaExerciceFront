import IPanierService from "../IPanierService";
import Book from "../../../xebia/models/Book";
import Item from "../../models/Item";
/**
 * PanierService
 * 
 * Implementation of a panier
 */
class PanierService implements IPanierService {

    /** List of items in the panier */
    private items: Array<Item> = [];
    
    /**
     * Constructor
     */
    constructor() {}

    /**
     * addItem
     * 
     * @param item to add
     */
    public addItem(item: Item): Array<Item> {
        let foundItemIndex: number = this.findItemIndexById(item);
        if (foundItemIndex === -1) {
            item.quantity = 1;
            this.items.push(item);
        } 
        else {
            this.items[foundItemIndex].quantity++;
        }
        return this.items;
    }   

    /**
     * removeItem
     * 
     * @param item to remove
     */
    public removeItem(item: Item): Array<Item> {
        let foundItemIndex: number = this.findItemIndexById(item);
        let foundItem: Item = this.items[foundItemIndex];
        if (foundItem.quantity === 1) {
            this.items.splice(foundItemIndex, foundItemIndex + 1);
        }
        else {
            foundItem.quantity--;
        }
        return this.items;
    }

    /**
     * findItemIndexById
     * 
     * @param item to find
     * @return the item index or -1
     */
    private findItemIndexById(item: Item): number {
        let foundItemIndex: number = -1;
        for (let i = 0; i < this.items.length; i++) {
            let currentItem: Item = this.items[i];
            if (currentItem.id === item.id) {
                foundItemIndex = i;
                break;
            }
        }
        return foundItemIndex;
    }

    /**
     * getItems
     * 
     * @return the item list
     */
    public getItems(): Array<Item> {
        return this.items;
    }

    /**
     * getAmount
     * 
     * @return the total amount
     */
    public getAmount(): number {
        let amount: number = 0;
        for (let i = 0; i < this.items.length; i++) {
            let item: Item = this.items[i];
            amount += item.price * item.quantity;
        }
        return amount;
    }


}
export default PanierService;