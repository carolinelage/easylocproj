const Books = require('./Books');
const RentalMode = require('./RentalMode');
const BookRentalMode = require('./BookRentalMode');

// Definir as associações
Books.hasMany(BookRentalMode, { foreignKey: 'book_id' });
RentalMode.hasMany(BookRentalMode, { foreignKey: 'rental_mode_id' });
BookRentalMode.belongsTo(Books, { foreignKey: 'book_id' });
BookRentalMode.belongsTo(RentalMode, { foreignKey: 'rental_mode_id' });

module.exports = { Books, RentalMode, BookRentalMode };
