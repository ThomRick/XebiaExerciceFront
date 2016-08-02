import CommercialOffer from "../../xebia/models/CommercialOffer";
import Offer from "../../xebia/models/Offer";

interface IOfferService {
    getBestOffer(amount: number, commercialOffer: CommercialOffer): Offer;
    computeOfferAmount(offer: Offer, amount: number): number;
}
export default IOfferService;