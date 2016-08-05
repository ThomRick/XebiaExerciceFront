/// <reference path="../../../../../../typings/jasmine/jasmine.d.ts" />
import IPanierService from "../../../../../main/app/panier/services/IPanierService";
import PanierService from "../../../../../main/app/panier/services/impl/PanierService";

describe("PanierServiceTest", () => {
    describe("#getAmount()", () => {
        it("should return 65 with 2 books with on with a price of 30 and another with a price of 35", () => {
            // ARRANGE
            let panierService: IPanierService = new PanierService();
            panierService.addBook({
                title: "title",
                cover: "cover",
                isbn: "isbn",
                price: 30,
            });
            panierService.addBook({
                title: "title",
                cover: "cover",
                isbn: "isbn",
                price: 35
            });
            let amountExpected: number = 65;
            // ACT
            let amountComputed: number = panierService.getAmount();
            // ASSERT 
            expect(amountComputed).toEqual(amountExpected);   
        });
    });
});