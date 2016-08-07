import CommercialOffer from "../../xebia/models/CommercialOffer";

/**
 * IOfferService
 * 
 * Interface to compute commercial offers
 */
interface IOfferService {
    getBestCommercialOffer(amount: number, commercialOffers: Array<CommercialOffer>): CommercialOffer;
    computeCommercialOfferAmount(commercialOffer: CommercialOffer, amount: number): number;
}
export default IOfferService;