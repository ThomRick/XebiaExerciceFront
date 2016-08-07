/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
import Item from "../../panier/models/Item";

/**
 * IStoreService
 * 
 * Service interface to store service API
 */
interface IStoreService {
    getAllItems(): ng.IPromise<Array<Item>>;
}
export default IStoreService;