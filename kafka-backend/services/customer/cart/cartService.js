const addCommandExecutor = require("./commands/addCommandExecutor");
const removeCommandExecutor = require("./commands/removeCommandExecutor");

class CartService {
    constructor() {
      this.commands = [addCommandExecutor, removeCommandExecutor];
    }

    handle_request (cartDetails, callback) {
        if(cartDetails.cartCommandType === 'add'){
            this.commands[0].execute(cartDetails,callback);
        }else if (cartDetails.cartCommandType === 'remove'){
            this.commands[1].execute(cartDetails,callback);
        }
    }
    
  }

 module.exports = new CartService(); 