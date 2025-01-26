define(['knockout', 'text!data/books.json', 'ojs/ojfilepicker', 'ojs/ojbutton'], function(ko, booksJson) {
  function AdminViewModel() {
    this.books = ko.observableArray(JSON.parse(booksJson));
    this.newBook = {
      title: ko.observable(''),
      author: ko.observable(''),
      category: ko.observable('')
    };

    // Function to add a new book and persist it to the JSON file
    this.addBook = () => {
      const newBookData = {
        title: this.newBook.title(),
        author: this.newBook.author(),
        category: this.newBook.category()
      };
      this.books.push(newBookData);

      // Update the books.json file (mock implementation)
      fetch('data/books.json', {
        method: 'POST', // Simulating writing data to the file
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.books())
      }).then(response => {
        if (!response.ok) {
          throw new Error('Failed to update the JSON file');
        }
        console.log('Books data successfully updated');
      }).catch(error => {
        console.error('Error updating books.json:', error);
      });

      // Clear input fields
      this.newBook.title('');
      this.newBook.author('');
      this.newBook.category('');
    };

    this.deleteBook = (book) => {
      this.books.remove(book);

      // Persist the updated data to the JSON file
      fetch('data/books.json', {
        method: 'POST', // Simulating writing data to the file
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.books())
      }).then(response => {
        if (!response.ok) {
          throw new Error('Failed to update the JSON file');
        }
        console.log('Books data successfully updated');
      }).catch(error => {
        console.error('Error updating books.json:', error);
      });
    };
  }
  return AdminViewModel;
});
