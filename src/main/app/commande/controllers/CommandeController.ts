import IPanierService from "../../panier/services/IPanierService";
import IOfferService from "../services/IOfferService";
import IBookService from "../../xebia/services/IBookService";
import Book from "../../xebia/models/Book";
import Offer from "../../xebia/models/Offer";
import CommercialOffer from "../../xebia/models/CommercialOffer";

/**
 * CommandeController
 */
class CommandeController {

    static $inject = [
        "panierService",
        "offerService",
        "bookService"
    ];

    private books: Array<Book> = [];
    private amount: number = 0;
    private offer: Offer = {
        type: "",
        value: 0   
    };
    private offerAmount: number = 0;

    constructor(panierService: IPanierService, offerService: IOfferService, bookService: IBookService) {
        this.books = panierService.getBooks();
        this.amount = panierService.getAmount();
        let self = this;
        console.log(this.books);
        
        bookService.getCommercialOffers(this.books)
        .then((commercialOffer: CommercialOffer) => {
            self.offer = offerService.getBestOffer(self.amount, commercialOffer);
            self.offerAmount = offerService.computeOfferAmount(self.offer, self.amount);
        });
    }
}
export default CommandeController;