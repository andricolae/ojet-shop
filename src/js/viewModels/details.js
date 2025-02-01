define(['../accUtils',  'knockout', "text!../data/orders.json", "ojs/ojformlayout", "ojs/ojinputtext"], 
    function (accUtils,  ko, records) {
    function DetailsViewModel(args) {
        // Below are a set of the ViewModel methods invoked by the oj-module component.
        // Please reference the oj-module jsDoc for additional information.
        this.orderData = JSON.parse(records).orders;
              // define view model callback, that will be called by the ModuleRouterAdapter to re-apply parameters
              this.parametersChanged = (params) => {
                  this.record(this.orderData[params.index]);
              };
              this.args = args;
              this.record = ko.observable(this.orderData[this.args.params.index]);
        /**
         * Optional ViewModel method invoked after the View is inserted into the
         * document DOM.  The application can put logic that requires the DOM being
         * attached here.
         * This method might be called multiple times - after the View is created
         * and inserted into the DOM and after the View is reconnected
         * after being disconnected.
         */

        this.connected = () => {
          accUtils.announce('Details page loaded.', 'assertive');
          document.title = "Details";
          // Implement further logic if needed
        };
  
        /**
         * Optional ViewModel method invoked after the View is disconnected from the DOM.
         */
        this.disconnected = () => {
          // Implement if needed
        };
  
        /**
         * Optional ViewModel method invoked after transition to the new View is complete.
         * That includes any possible animation between the old and the new View.
         */
        this.transitionCompleted = () => {
          // Implement if needed
        };
      }
  
      /*
       * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
       * return a constructor for the ViewModel so that the ViewModel is constructed
       * each time the view is displayed.
       */
      return DetailsViewModel;
    }
  );
  