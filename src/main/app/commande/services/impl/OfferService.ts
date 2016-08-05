import IOfferService from "../IOfferService";
import CommercialOffer from "../../../xebia/models/CommercialOffer";
import Offer from "../../../xebia/models/Offer";

/**
 * OfferService
 * 
 * Implementation of an offer service
 */
class OfferService implements IOfferService {
    
    /**
     * Constructor
     * 
     * Initialise the controller
     */
    constructor() {}

    /**
     * getBestOffer
     * 
     * @param the amount of a commande
     * @param the commercial offer available for a commande
     * @return the best commercial offer for the command
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

    /**
     * computeBestOffer
     * 
     * @param current best offer from commercial offer list
     * @param offer to check if it is better
     * @param the amount for applying the offer
     * @return the best offer from commercial offer commande
     */
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
     * 
     * @param offer to compute on the amount
     * @param amount to apply offer
     * @return the offer discount for the amount
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

    /**
     * computePercentageOfferAmount
     * 
     * @param offer to compute on the amount
     * @param amount to apply the offer
     * @return the percentage offer discount for the amount
     */
    private computePercentageOfferAmount(offer: Offer, amount: number): number {
        let value: number = offer.value;
        return amount * value / 100;   
    }

    /**
     * computeMinusOfferAmount
     * 
     * @param offer to compute on the amount
     * @param amount to apply the offer
     * @return the minus offer discount for the amount
     */
    private computeMinusOfferAmount(offer: Offer, amount: number): number {
        return offer.value;
    }

    /**
     * computeSliceOfferAmount
     * 
     * @param offer to compute on the amount
     * @param amount to apply the offer
     * @return the slice offer discount for the amount
     */
    private computeSliceOfferAmount(offer: Offer, amount: number): number {
        let value: number = offer.value;
        let sliceValue: number = offer.sliceValue;
        return Math.floor(amount / sliceValue) * value;
    }
}
export default OfferService;