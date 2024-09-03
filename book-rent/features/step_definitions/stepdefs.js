const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

const BASE_URL = 'http://localhost:4000';

/**
 * Updates a book with the provided data
 * @param {Object} bookData - The data for updating the book
 * @param {number} bookData.id - The ID of the book to update
 * @param {number} bookData.userId - The ID of the user updating the book
 * @param {string} bookData.bookName - The name of the book
 * @param {string} bookData.quantity - The quantity of the book
 * @param {string} bookData.category - The category of the book
 * @param {string} bookData.price - The price of the book
 * @returns {Promise<'success' | 'error'>} The updated book data
 */
const updateBook = async (bookData) => {
	try {
		const response = await fetch(`${BASE_URL}/api/books/update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bookData)
		});

		/**
		 * @typedef {Object} UpdateBookResult
		 * @property {'success' | 'error'} status - The status of the update operation
		 * @property {Object} data - The data object containing the message
		 * @property {string} data.message - The message describing the result of the operation
		 */

		/** @type {UpdateBookResult} */
		const result = await response.json();

		return result.status;
	} catch (error) {
		console.error('Error updating book:', error);
		throw error;
	}
};

async function update(userId, bookId) {
	const result = await updateBook({
		bookName: 'new bookname',
		category: 'fiction',
		id: Number(bookId),
		price: 200,
		quantity: 30,
		userId: Number(userId)
	});
	return result;
}

{
	// update own book
	Given('owner has book', function () {
		this.userId = 5;
		this.bookId = 4;
	});

	When('I ask whether to update the book details', async function () {
		this.actualAnswer = await update(this.userId, this.bookId);
	});

	Then('I should be told {string}', function (expectedAnswer) {
		assert.strictEqual(this.actualAnswer, expectedAnswer);
	});
}

{
	// update others book
	Given('a book owned by another user', function () {
		this.userId = 3;
		this.bookId = 4;
	});

	When('I try to update the book details', async function () {
		this.actualAnswer = await update(this.userId, this.bookId);
	});

	Then('I should be get {string}', function (expectedAnswer) {
		assert.strictEqual(this.actualAnswer, expectedAnswer);
	});
}
