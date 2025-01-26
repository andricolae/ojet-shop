define(['knockout', 'text!data/books.json'], function(ko, booksJson) {
    function BrowseBooksViewModel() {
      this.books = ko.observableArray(JSON.parse(booksJson));
    }
    return BrowseBooksViewModel;
  });