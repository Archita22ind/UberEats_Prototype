// Command Interface
class CartCommandExecutor {
    execute(cartDetails, callback) {
      if (!cartDetails && !callback)
        throw new Error('Execute method must be overridden');
    }
  }

module.exports = CartCommandExecutor;  