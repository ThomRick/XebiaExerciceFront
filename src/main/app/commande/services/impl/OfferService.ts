import IOfferService from "../IOfferService";
import CommercialOffer from "../../../xebia/models/CommercialOffer";

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
     * getBestCommercialOffer
     * 
     * @param the amount of a commande
     * @param the commercial offers available for a commande
     * @return the best commercial offer for the commande
     */
    public getBestCommercialOffer(amount: number, commercialOffers: Array<CommercialOffer>): CommercialOffer {
        let bestCommercialOffer: CommercialOffer;
        for (let i = 0; i < commercialOffers.length; i++) {
            let commericalOffer: CommercialOffer = commercialOffers[i];
            bestCommercialOffer = this.computeBestCommercialOffer(bestCommercialOffer, commericalOffer, amount); 
        }
        return bestCommercialOffer;
    }

    /**
     * computeBestCommercialOffer
     * 
     * @param current best offer from commercial offer list
     * @param commercial offer to check if it is better
     * @param the amount for applying the commercial offer
     * @return the best commercial offer from commande commercial offers
     */
    private computeBestCommercialOffer(bestCommercialOffer: CommercialOffer, commercialOffer: CommercialOffer, amount: number): CommercialOffer {
        let bestCommercialOfferAmount: number;
        if (bestCommercialOffer) {
            bestCommercialOfferAmount = this.computeCommercialOfferAmount(bestCommercialOffer, amount);
        }
        else {
            bestCommercialOfferAmount = 0;
        }
        let commercialOfferAmount: number = this.computeCommercialOfferAmount(commercialOffer, amount);
        return commercialOfferAmount > bestCommercialOfferAmount ? commercialOffer : bestCommercialOffer;
    }

    /**
     * computeCommercialOfferAmount
     * 
     * @param commercial offer to compute on the amount
     * @param amount to apply commercial offer
     * @return the commercial offer discount for the amount
     */
    public computeCommercialOfferAmount(commercialOffer: CommercialOffer, amount: number): number {
        let commercialOfferType: string = commercialOffer.type;
        let commercialOfferAmount: number;
        switch (commercialOfferType) {
            case "percentage":
                commercialOfferAmount = this.computePercentageOfferAmount(commercialOffer, amount);
                break;
            case "minus":
                commercialOfferAmount = this.computeMinusOfferAmount(commercialOffer, amount);
                break;
            case "slice":
                commercialOfferAmount = this.computeSliceOfferAmount(commercialOffer, amount);
                break;        
        }
        return commercialOfferAmount;
    }

    /**
     * computePercentageOfferAmount
     * 
     * @param commercial offer to compute on the amount
     * @param amount to apply the offer
     * @return the percentage offer discount for the amount
     */
    private computePercentageOfferAmount(commercialOffer: CommercialOffer, amount: number): number {
        let value: number = commercialOffer.value;
        return amount * value / 100;   
    }

    /**
     * computeMinusOfferAmount
     * 
     * @param commercial offer to compute on the amount
     * @param amount to apply the offer
     * @return the minus offer discount for the amount
     */
    private computeMinusOfferAmount(commercialOffer: CommercialOffer, amount: number): number {
        return commercialOffer.value;
    }

    /**
     * computeSliceOfferAmount
     * 
     * @param commercial offer to compute on the amount
     * @param amount to apply the offer
     * @return the slice offer discount for the amount
     */
    private computeSliceOfferAmount(commercialOffer: CommercialOffer, amount: number): number {
        let value: number = commercialOffer.value;
        let sliceValue: number = commercialOffer.sliceValue;
        return Math.floor(amount / sliceValue) * value;
    }
    
}
export default OfferService;