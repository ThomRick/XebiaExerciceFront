import IPanierService from "../../panier/services/IPanierService";

/**
 * CommandeController
 */
class CommandeController {

    static panierService: IPanierService;

    static $inject = [
        "panierService"
    ]

    constructor(panierService: IPanierService) {
        CommandeController.panierService = panierService;
        console.log(CommandeController.panierService.getBooks());        
    }
}
export default CommandeController;