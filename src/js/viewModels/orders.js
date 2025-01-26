define(['knockout'], function(ko) {
    const cartItems = ko.observableArray([]);
  
    const addItem = (item) => {
      cartItems.push(item);
    };
  
    const removeItem = (item) => {
      cartItems.remove(item);
    };
  
    function CartViewModel() {
      this.cartItems = cartItems;
      this.removeFromCart = removeItem;
    }
  
    return {
      addItem,
      removeItem,
      CartViewModel
    };
  });