const CartCommandExecutor = require("./cartCommandExecutor");
const cartData = require("../cartData");
// Concrete Commands
class AddCommandExecutor extends CartCommandExecutor {
    constructor() {
      super();
      this.cartData = cartData;
    }
    
    execute(cartDetails, callback) {
      this.cartData.addItem(cartDetails, callback);
    }
  }
  
 module.exports =  new AddCommandExecutor();