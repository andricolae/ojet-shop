/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define([
  'knockout',
  'utils/Core',
  'ojs/ojtranslation',
  'ojs/ojinputtext',
  'ojs/ojinputnumber',
  'ojs/ojformlayout'],
 function(ko, CoreUtils, Translations) {

    const _t = Translations.getTranslatedString;
    function CustomerViewModel() {
      this._initAllIds();
      this._initAllLabels();
      this._initAllObservables();
    }

    /**
     * @function _initAllIds
     * @description Initializes all the ids.
     */
    CustomerViewModel.prototype._initAllIds = function() {      
      this.inputFirstNameId = CoreUtils.generateUniqueId();
      this.inputLastNameId = CoreUtils.generateUniqueId();
      this.inputFullNameId = CoreUtils.generateUniqueId();
      this.inputWeightId = CoreUtils.generateUniqueId();
      this.inputAgeId = CoreUtils.generateUniqueId();
    }

    /**
     * @function _initAllIds
     * @description Initializes all the labels.
     */
    CustomerViewModel.prototype._initAllLabels = function() {
      this.inputFirstNameLabel = _t('inputs.firstName');
      this.inputLastNameLabel = _t('inputs.lastName');
      this.inputFullNameLabel = _t('inputs.fullName');
      this.inputWeightLabel = _t('inputs.weight');
      this.inputAgeLabel = _t('inputs.age');
    }

    /**
     * @function _initAllObservables
     * @description Initializes all the observable values.
     */
    CustomerViewModel.prototype._initAllObservables = function() {
      this.inputFirstNameValue = ko.observable(null);
      this.inputLastNameValue = ko.observable(null);
      this.inputFullNameValue = ko.observable(null);
      this.inputAgeValue = ko.observable(null);

      this.isInputLastNameDisabled = ko.observable(true);

      this.onInputFirstNameValueChange = function(event) {
        const value = event.detail.value;
        if(value) {
          this.isInputLastNameDisabled(false);
          return;
        }
        this.isInputLastNameDisabled(true);
        console.log(event);
      }.bind(this);

      this.inputLastNameValue.subscribe(function(_) {
        this.inputFullNameValue(`${this.inputFirstNameValue()} ${this.inputLastNameValue()}`);
      }, this);
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return CustomerViewModel;
  }
);
