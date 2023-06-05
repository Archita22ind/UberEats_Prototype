const CartCommandExecutor = require("./cartCommandExecutor");
const cartData = require("../cartData");

class RemoveCommandExecutor extends CartCommandExecutor
  {
    constructor() {
      super();
      this.cartData = cartData;
    }
    
    execute(cartDetails, callback) {
      this.cartData.removeItem(cartDetails, callback);
    }
  }
  

module.exports = new RemoveCommandExecutor();