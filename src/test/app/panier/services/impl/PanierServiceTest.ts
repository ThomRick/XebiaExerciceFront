/// <reference path="../../../../../../typings/jasmine/jasmine.d.ts" />
import IPanierService from "../../../../../main/app/panier/services/IPanierService";
import PanierService from "../../../../../main/app/panier/services/impl/PanierService";
import Item from "../../../../../main/app/panier/models/Item";

describe("PanierServiceTest", () => {
    describe("#addItem()", () => {
        it("should add a book and return an array with 1 item", () => {
            // ARRANGE
            let panierService: IPanierService = new PanierService();
            let item: Item = {
                id: "isbn",
                type: "book",
                price: 30,
                description: {
                    title: "title",
                    cover: "cover"
                }
            };
            // ACT
            let items: Array<Item> = panierService.addItem(item);
            // ASSERT
            expect(items.length).toEqual(1);
        });
        it("should add a book and return an array with 1 item and a quantity of 2 by adding 2 same items", () => {
            // ARRANGE
            let panierService: IPanierService = new PanierService();
            let item1: Item = {
                id: "isbn",
                type: "book",
                price: 30,
                description: {
                    title: "title",
                    cover: "cover"
                }
            };
            let item2: Item = {
                id: "isbn",
                type: "book",
                price: 30,
                description: {
                    title: "title",
                    cover: "cover"
                }
            };
            // ACT
            panierService.addItem(item1);
            let items: Array<Item> = panierService.addItem(item2);
            // ASSERT
            expect(items.length).toEqual(1);
            expect(items[0].quantity).toEqual(2);
        });
    });
    describe("#removeItem()", () => {
        it("should return the updated panier with one item", () => {
            // ARRANGE
            let panierService: IPanierService = new PanierService();
            let item1: Item = {
                id: "isbn1",
                type: "book",
                price: 30,
                description: {
                    title: "title",
                    cover: "cover",
                },
                quantity: 1
            };
            let item2: Item = {
                id: "isbn2",
                type: "book",
                price: 30,
                description: {
                    title: "title",
                    cover: "cover",
                },
                quantity: 1
            };
            panierService.addItem(item1);
            panierService.addItem(item2);
            // ACT
            let items: Array<Item> = panierService.removeItem(item1);
            // ASSERT
            expect(items.length).toEqual(1);
            expect(items[0]).toEqual(item2);
        });
        it("should return the updated panier with 1 items with each quantity equal to 1", () => {
            // ARRANGE
            let panierService: IPanierService = new PanierService();
            let item1: Item = {
                id: "isbn1",
                type: "book",
                price: 30,
                description: {
                    title: "title",
                    cover: "cover",
                },
                quantity: 1
            };
            let item2: Item = {
                id: "isbn2",
                type: "book",
                price: 30,
                description: {
                    title: "title",
                    cover: "cover",
                },
                quantity: 1
            };
            let item3: Item = {
                id: "isbn2",
                type: "book",
                price: 30,
                description: {
                    title: "title",
                    cover: "cover",
                },
                quantity: 1
            };
            panierService.addItem(item1);
            panierService.addItem(item2);
            panierService.addItem(item3);
            // ACT
            let items: Array<Item> = panierService.removeItem(item2);
            // ASSERT
            expect(items.length).toEqual(2);
            expect(items[1]).toEqual(item3);
        });
    });
    describe("#getAmount()", () => {
        it("should return 65 with 2 items with 1 with a price of 30 and another with a price of 35 and each quantity of 1", () => {
            // ARRANGE
            let panierService: IPanierService = new PanierService();
            panierService.addItem({
                id: "isbn1",
                type: "book",
                price: 30,
                description: {
                    title: "title",
                    cover: "cover",
                }
            });
            panierService.addItem({
                id: "isbn2",
                type: "book",
                price: 35,
                description: {
                    title: "title",
                    cover: "cover",
                }
            });
            let amountExpected: number = 65;
            // ACT
            let amountComputed: number = panierService.getAmount();
            // ASSERT 
            expect(amountComputed).toEqual(amountExpected);   
        });
        it("should return 35 with 2 items with 1 with a price of 30 and quantity of 2 and another with a price of 35 and quantity of 1", () => {
            // ARRANGE
            let panierService: IPanierService = new PanierService();
            panierService.addItem({
                id: "isbn1",
                type: "book",
                price: 30,
                description: {
                    title: "title",
                    cover: "cover",
                }
            });
            panierService.addItem({
                id: "isbn1",
                type: "book",
                price: 30,
                description: {
                    title: "title",
                    cover: "cover",
                }
            });
            panierService.addItem({
                id: "isbn2",
                type: "book",
                price: 35,
                description: {
                    title: "title",
                    cover: "cover",
                }
            });
            let amountExpected: number = 95;
            // ACT
            let amountComputed: number = panierService.getAmount();
            // ASSERT 
            expect(amountComputed).toEqual(amountExpected);   
        });
    });
});