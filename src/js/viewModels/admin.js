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
  'text!data/books.json',
  'ojs/ojfilepicker',
  'ojs/ojbutton',
  'ojs/ojinputtext',
  'ojs/ojinputnumber',
  'ojs/ojformlayout'],
  function (ko, CoreUtils, Translations, booksJson) {

    const _t = Translations.getTranslatedString;
    function AdminViewModel() {
      this._initAllIds();
      this._initAllLabels();
      this._initAllObservables();

      this.books = ko.observableArray(JSON.parse(booksJson));
      this.newBook = {
        title: ko.observable(''),
        author: ko.observable(''),
        category: ko.observable('')
      };

      this.addBook = () => {
        this.addBook = (inputTitleValue, inputAuthorValue, inputCategoryValue, inputImageValue) => {
          if (!inputTitleValue || !inputAuthorValue || !inputCategoryValue || !inputImageValue) {
            console.error('All fields are required to add a book');
            return;
          }

          const newId = this.books().length > 0 ? Math.max(...this.books().map(book => book.id)) + 1 : 1;

          const newBook = {
            id: newId,
            title: inputTitleValue,
            author: inputAuthorValue,
            category: inputCategoryValue,
            image: inputImageValue
          };

          this.books.push(newBook);

          fetch('http://localhost:3000/update-books', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.books())
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to update the books on the server');
              }
              console.log('Book successfully added and data updated on the server');
            })
            .catch(error => {
              console.error('Error updating books.json:', error);
            });

          document.getElementById(this.inputTitleId).value = '';
          document.getElementById(this.inputAuthorId).value = '';
          document.getElementById(this.inputCategoryId).value = '';
          document.getElementById(this.inputImageId).value = '';
        };
      };

      this.deleteBook = (id) => {
        this.books.remove((book) => book.id === id);

        fetch('http://localhost:3000/delete-book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to delete the book');
            }
            console.log(`Book with ID ${id} successfully deleted`);
          })
          .catch(error => {
            console.error('Error deleting book:', error);
          });
      };

      this.selectedBookId = ko.observable(null);

      this.selectBook = (book) => {
        this.selectedBookId(book.id);
        this.inputTitleValue(book.title);
        this.inputAuthorValue(book.author);
        this.inputCategoryValue(book.category);
        this.inputImageValue(book.image);
      };

      this.updateBook = () => {
        let updatedBook = {
          id: this.selectedBookId(),
          title: this.inputTitleValue(),
          author: this.inputAuthorValue(),
          category: this.inputCategoryValue(),
          image: this.inputImageValue()
        };
  
        let index = this.books().findIndex(b => b.id === this.selectedBookId());
        if (index !== -1) {
          this.books.splice(index, 1, updatedBook);
        }
  
        fetch('http://localhost:3000/update-book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedBook)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update the book');
          }
          console.log('Book successfully updated on the server');
        })
        .catch(error => console.error('Error updating book:', error));
  
        this.selectedBookId(null);
        this.inputTitleValue(null);
        this.inputAuthorValue(null);
        this.inputCategoryValue(null);
        this.inputImageValue(null);
      };

    }

    /**
     * @function _initAllIds
     * @description Initializes all the ids.
     */
    AdminViewModel.prototype._initAllIds = function () {
      this.inputTitleId = CoreUtils.generateUniqueId();
      this.inputAuthorId = CoreUtils.generateUniqueId();
      this.inputCategoryId = CoreUtils.generateUniqueId();
      this.inputImageId = CoreUtils.generateUniqueId();
    }

    /**
     * @function _initAllIds
     * @description Initializes all the labels.
     */
    AdminViewModel.prototype._initAllLabels = function () {
      // this.inputFirstNameLabel = _t('inputs.firstName');
      this.inputTitleLabel = ('Title');
      this.inputAuthorLabel = ('Author');
      this.inputCategoryLabel = ('Category');
      this.inputImageLabel = ('Image Link');
    }

    /**
     * @function _initAllObservables
     * @description Initializes all the observable values.
     */
    AdminViewModel.prototype._initAllObservables = function () {
      this.inputTitleValue = ko.observable(null);
      this.inputAuthorValue = ko.observable(null);
      this.inputCategoryValue = ko.observable(null);
      this.inputImageValue = ko.observable(null);

      this.isInputLastNameDisabled = ko.observable(true);

      // this.onInputFirstNameValueChange = function (event) {
      //   const value = event.detail.value;
      //   if (value) {
      //     this.isInputLastNameDisabled(false);
      //     return;
      //   }
      //   this.isInputLastNameDisabled(true);
      //   console.log(event);
      // }.bind(this);

      // this.inputLastNameValue.subscribe(function (_) {
      //   this.inputFullNameValue(`${this.inputFirstNameValue()} ${this.inputLastNameValue()}`);
      // }, this);
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return AdminViewModel;
  }
);
