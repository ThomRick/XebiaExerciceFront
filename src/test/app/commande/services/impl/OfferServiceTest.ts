/// <reference path="../../../../../../typings/jasmine/jasmine.d.ts" />
import IOfferService from "../../../../../main/app/commande/services/IOfferService";
import OfferService from "../../../../../main/app/commande/services/impl/OfferService";
import CommercialOffer from "../../../../../main/app/xebia/models/CommercialOffer";

describe("OfferServiceTest", () => {
    let offerService: IOfferService = new OfferService();
    describe("#computeOfferAmount()", () => {
        it("should return 15 for a minus offer at 15", () => {
            // ARRANGE
            let amountExpected: number = 15;
            let commericalOffer: CommercialOffer = {
                type: "minus",
                value: 15
            };
            let amount: number = 65;
            // ACT
            let amountProduced: number = offerService.computeCommercialOfferAmount(commericalOffer, amount);
            // ASSERT
            expect(amountProduced).toEqual(amountExpected);
        });
        it("should return 3.25 for a percentage at 5%", () => { 
            // ARRANGE
            let amountExpected: number = 3.25;
            let commericalOffer: CommercialOffer = {
                type: "percentage",
                value: 5
            };
            let amount: number = 65;
            // ACT
            let amountProduced: number = offerService.computeCommercialOfferAmount(commericalOffer, amount);
            // ASSERT
            expect(amountProduced).toEqual(amountExpected);
        });
        it("should return 12 for an amount at 175 and for a slice with sliceValue to 100 and value at 12", () => {
            // ARRANGE
            let amountExpected: number = 12;
            let commericalOffer: CommercialOffer = {
                type: "slice",
                sliceValue: 100,
                value: 12
            };
            let amount: number = 175;
            // ACT
            let amountProduced: number = offerService.computeCommercialOfferAmount(commericalOffer, amount);
            // ASSERT
            expect(amountProduced).toEqual(amountExpected);
        });
    })
    describe("#getBestOffer()", () => {
        it("should return the minus offer", () => {
            // ARRANGE
            let commercialOfferExpected: CommercialOffer = {
                type: "minus",
                value: 15
            };
            let commercialeOffers: Array<CommercialOffer> = [
                {type: "percentage", value: 5},
                {type: "minus", value: 15},
                {type: "slice", sliceValue: 100, value: 12}
            ];
            let amount: number = 65;
            // ACT
            let commericalOfferProduced: CommercialOffer = offerService.getBestCommercialOffer(amount, commercialeOffers);
            // ASSERT
            expect(commericalOfferProduced).toEqual(commercialOfferExpected);
        });
    });
});