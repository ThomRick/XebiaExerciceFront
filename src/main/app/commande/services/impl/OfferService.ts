import IOfferService from "../IOfferService";
import CommercialOffer from "../../../xebia/models/CommercialOffer";
import Offer from "../../../xebia/models/Offer";

/**
 * OfferService
 */
class OfferService implements IOfferService {
    
    constructor() {}

    /**
     * getBestOffer
     */
    public getBestOffer(amount: number, commercialOffer: CommercialOffer): Offer {
        let bestOffer: Offer;
        let offers: Array<Offer> = commercialOffer.offers;
        for (let i = 0; i < offers.length; i++) {
            let offer: Offer = offers[i];
            bestOffer = this.computeBestOffer(bestOffer, offer, amount); 
        }
        return bestOffer;
    }

    private computeBestOffer(bestOffer: Offer, offer: Offer, amount: number): Offer {
        let bestOfferAmount: number;
        if (bestOffer) {
            bestOfferAmount = this.computeOfferAmount(bestOffer, amount);
        }
        else {
            bestOfferAmount = 0;
        }
        let offerAmount: number = this.computeOfferAmount(offer, amount);
        return offerAmount > bestOfferAmount ? offer : bestOffer;
    }

    /**
     * computeOfferAmount
     */
    public computeOfferAmount(offer: Offer, amount: number): number {
        let offerType: string = offer.type;
        let offerAmount: number;
        switch (offerType) {
            case "percentage":
                offerAmount = this.computePercentageOfferAmount(offer, amount);
                break;
            case "minus":
                offerAmount = this.computeMinusOfferAmount(offer, amount);
                break;
            case "slice":
                offerAmount = this.computeSliceOfferAmount(offer, amount);
                break;        
        }
        return offerAmount;
    }

    private computePercentageOfferAmount(offer: Offer, amount: number): number {
        let value: number = offer.value;
        return amount * value / 100;   
    }

    private computeMinusOfferAmount(offer: Offer, amount: number): number {
        return offer.value;
    }

    private computeSliceOfferAmount(offer: Offer, amount: number): number {
        let value: number = offer.value;
        let sliceValue: number = offer.sliceValue;
        return Math.floor(amount / sliceValue) * value;
    }
}
export default OfferService;