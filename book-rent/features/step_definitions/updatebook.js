const assert = require('assert');
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { login } = require('./disableEnableOwner');

const BASE_URL = 'http://localhost:4000';

const bookowners = [
	{
		email: 'tom@example02.com',
		password: 'password345' // book owner tom has a book with id of 5
	},
	{
		email: 'jane@exampl02e.com',
		password: 'password456'
	}
];

setDefaultTimeout(10000);

/**
 * Updates a book with the provided data
 * @param {Object} bookData - The data for updating the book
 * @param {number} bookData.id - The ID of the book to update
 * @param {string} bookData.bookName - The name of the book
 * @param {string} bookData.quantity - The quantity of the book
 * @param {string} bookData.category - The category of the book
 * @param {string} bookData.price - The price of the book
 * @param {string} token - a token for owner who updates the book
 * @returns {Promise<'success' | 'error'>} The updated book data
 */
const updateBook = async (bookData, token) => {
	try {
		const response = await fetch(`${BASE_URL}/api/books/update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${token}`
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

async function update(bookId, token) {
	const result = await updateBook(
		{
			bookName: 'new bookname',
			category: 'fiction',
			id: Number(bookId),
			price: 200,
			quantity: 30
		},
		token
	);
	return result;
}

{
	// update own book
	Given('owner has book', async function () {
		const { email, password } = bookowners[0];

		this.token = await login({ email, password });
		this.bookId = 4;
	});

	When('I ask whether to update the book details', async function () {
		this.actualAnswer = await update(this.bookId, this.token);
	});

	Then('I should be told {string}', function (expectedAnswer) {
		assert.strictEqual(this.actualAnswer, expectedAnswer);
	});
}

{
	// update others book
	Given('a book owned by another user', async function () {
		const { email, password } = bookowners[1];
		this.token = await login({ email, password });
		this.bookId = 4;
	});

	When('I try to update the book details', async function () {
		this.actualAnswer = await update(this.bookId, this.token);
	});

	Then('I should be get {string}', function (expectedAnswer) {
		assert.strictEqual(this.actualAnswer, expectedAnswer);
	});
}
