/// <reference path="../../../../../../typings/angularjs/angular.d.ts" />
import ICommercialOfferService from "../ICommercialOfferService";
import CommercialOfferResponse from "../../models/CommercialOfferResponse";
import CommercialOffer from "../../models/CommercialOffer";
import Book from "../../models/Book";

/**
 * CommercialOfferService
 */
class CommercialOfferService implements ICommercialOfferService {
    
    /**
     * Angular injected services
     */
    static $inject = [
        "$http"
    ];
    private httpService: ng.IHttpService;
    
    /**
     * Constructor
     * 
     * Initialize service
     */
    constructor($http: ng.IHttpService) {
        this.httpService = $http;
    }

    /**
     * getCommercialOffers
     * 
     * @param books to compute the available commercial offers
     * @return a promise containing a list of CommercialOffer with available offers for a list of books 
     */
    public getCommercialOffers(bookIsbns: Array<string>): ng.IPromise<Array<CommercialOffer>> {
        let isbnsChaine: string = this.buildIsbnsChaine(bookIsbns);
        return this.httpService.get("http://henri-­potier.xebia.fr/books/" + isbnsChaine + "/commercialOffers")
        .then((response: ng.IHttpPromiseCallbackArg<CommercialOfferResponse>) => {
            return response.data.offers;
        });
    }

    /**
     * buildIsbnsChaine
     * 
     * @param books to build the commercial offer isbn chain
     * @return the isbn chain to call commercial offer service 
     */
    private buildIsbnsChaine(bookIsbns: Array<string>): string {
        let isbnsChaine: string = "";
        for (let i = 0; i < bookIsbns.length; i++) {
            let bookIsbn: string = bookIsbns[i];
            isbnsChaine += bookIsbn + ",";
        }
        return isbnsChaine.slice(0, isbnsChaine.length - 1);
    }
}
export default CommercialOfferService;