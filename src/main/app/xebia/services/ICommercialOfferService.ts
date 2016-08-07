/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
import Book from "../models/Book";
import CommercialOffer from "../models/CommercialOffer";

/**
 * ICommercialOfferService
 * 
 * Service interface to request Xebia Henry Potier CommercialOffer API
 */
interface ICommercialOfferService {
    getCommercialOffers(bookIsbns: Array<string>): ng.IPromise<Array<CommercialOffer>>;
}
export default ICommercialOfferService;