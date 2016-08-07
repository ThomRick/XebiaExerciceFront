import ItemDescription from "./ItemDescription";

/**
 * Item
 */
interface Item {
    id: string;
    type: string;
    price: number;
    quantity?: number;
    description?: ItemDescription;
}
export default Item;