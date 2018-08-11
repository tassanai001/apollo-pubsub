const mongoose = require('mongoose');
// mongoose.connect('mongodb://db/test');
mongoose.connect('mongodb://localhost:27017/server');


const Book = mongoose.model('Book', {
  title: String,
  author: String,
});

module.exports.getBooks = () => {
  return new Promise(async (resolve, reject) => {
    Book.find().exec((err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}

module.exports.createBook = (args) => {
  return new Promise( async (resolve, reject) => {
    const book = new Book(args);
    await book.save(args)
      .then((data) => resolve(data))
      .catch((err) => reject(err))
  });
}

module.exports.updateBook = (args) => {
  return new Promise(async (resolve, reject) => {
    Book.findOne({ _id: args._id }).exec((err, value) => {
      if (err) {
        reject(err);
      } else {
        value.title = args.title;
        value.author = args.author;
        const newValue = value.save();
        resolve(newValue);
      }
    });
  });
}

module.exports.deleteBook = (args) => {
  return new Promise( async (resolve, reject) => {
    Book.deleteOne(args, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          status: 'Done...!'
        });
      }
    });
  });
}
