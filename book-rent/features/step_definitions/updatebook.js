const assert = require('assert');
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { login, admin } = require('./disableEnableOwner');

const BASE_URL = 'http://localhost:4000';

const TEST_BOOK_ID = 17;

const bookowners = [
	{
		email: 'tom@example02.com',
		password: 'password345' // book owner - tom has a book with id of 5
	},
	{
		email: 'jane@exampl02e.com',
		password: 'password456'
	}
];

setDefaultTimeout(10000);

/**
 * @typedef {Object} UpdateBookResult
 * @property {'success' | 'error'} status - The status of the update operation
 * @property {Object} data - The data object containing the message
 * @property {string} data.message - The message describing the result of the operation
 */

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
		/** @type {UpdateBookResult} */
		const result = await response.json();

		return result.status;
	} catch (error) {
		throw error;
	}
};

async function update(bookId, token) {
	const result = await updateBook(
		{
			bookName: `new bookname ${Math.random().toString()}`,
			category: 'fiction',
			id: Number(bookId),
			price: 200,
			quantity: 30
		},
		token
	);
	return result;
}

/**
 * Deletes a book with the provided ID
 * @param {number} bookId - The ID of the book to delete
 * @param {string} token - A token for the owner who deletes the book
 * @returns {Promise<'success' | 'error'>} The result of the delete operation
 */
const deleteBook = async (bookId, token) => {
	try {
		const response = await fetch(`${BASE_URL}/api/books/delete/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${token}`
			},
			body: JSON.stringify({ id: bookId })
		});

		/** @type {UpdateBookResult} */
		const result = await response.json();
		return result.status;
	} catch (error) {
		throw error;
	}
};

/**
 * @typedef {Object} UploadBookResponse
 * @property {number} bookId - The unique identifier of the uploaded book
 */

/**
 * Uploads a new book to the system
 * @param {Object} bookData - The data for the new book
 * @param {string} bookData.bookName - The name of the book
 * @param {string} bookData.category - The category of the book
 * @param {number} bookData.price - The price of the book
 * @param {number} bookData.quantity - The quantity of the book
 * @param {string} token - The authentication token of the book owner
 * @returns {Promise<UploadBookResponse>} A promise that resolves to the upload response
 */
const uploadBook = async (bookData, token) => {
	try {
		const response = await fetch(`${BASE_URL}/api/books`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${token}`
			},
			body: JSON.stringify(bookData)
		});
		const { data } = await response.json();
		return { bookId: data.book?.id };
	} catch (err) {}
};

const getOwnerBalance = async (token) => {
	const response = await fetch(`${BASE_URL}/api/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	return data.balance;
};

/**
 * @typedef {Object} ApproveBookResponse
 * @property {'success' | 'error'} status - The status of the approval operation
 * @property {Object} data - The data object containing the message
 * @property {string} data.message - The message describing the result of the operation
 */

/**
 * Approves a book with the provided ID
 * @param {number} bookId - The ID of the book to approve
 * @param {string} adminToken - The authentication token of the admin
 * @returns {Promise<'success' | 'error'>} The result of the approve operation
 */
const approveBook = async (bookId, adminToken) => {
	try {
		const response = await fetch(`${BASE_URL}/api/books/approve`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${adminToken}`
			},
			body: JSON.stringify({ id: bookId, isApproved: true })
		});

		const data = await response.json();
		if (response.ok) {
			return data.status;
		} else {
			return data.status;
		}
	} catch (error) {}
};

/**
 * @typedef {Object} Book
 * @property {number} id - The unique identifier of the book
 * @property {string} name - The name of the book
 * @property {string} author - The author of the book
 * @property {'business' | 'fiction' | 'selfHelp'} category - The category of the book
 * @property {number} price - The price of the book
 * @property {number} quantity - The available quantity of the book
 * @property {string} coverImage - The base64 encoded cover image of the book
 * @property {boolean} isApproved
 */

/**
 * @typedef {Object} GetBooksResponse
 * @property {'success' | 'error'} status - The status of the response
 * @property {Object} data - The data object containing the books
 * @property {Book[]} data.books - An array of Book objects
 */

/**
 * Fetches the list of available books that are approved and have quantity > 0
 * @returns {Promise<Book[]>} A promise that resolves to an array of available books
 */
const getAvailableBooks = async () => {
	try {
		const response = await fetch(`${BASE_URL}/api/books/getbooks`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		/** @type {GetBooksResponse} */
		const result = await response.json();

		if (result.status === 'success') {
			return result.data.books;
		} else {
			throw new Error(result.data.message || 'Failed to fetch approved books');
		}
	} catch (error) {
		throw error;
	}
};

{
	// update my own book
	Given('the owner has a book in their collection', async function () {
		const { email, password } = bookowners[0];
		this.token = await login({ email, password });
		this.bookId = 7;
	});

	When('the owner requests to update the book details', async function () {
		this.actualAnswer = await update(this.bookId, this.token);
		assert.ok(!!this.actualAnswer);
	});

	Then('the system should respond with {string}', function (expectedAnswer) {
		assert.strictEqual(this.actualAnswer, expectedAnswer);
	});
}

{
	// update book owned by another user
	Given('there is a book owned by a different user', async function () {
		const { email, password } = bookowners[1];
		this.token = await login({ email, password });
		this.bookId = 7;
	});

	When('an unauthorized user attempts to update the book details', async function () {
		this.actualAnswer = await update(this.bookId, this.token);
	});

	Then('the system should return an {string} message', function (expectedAnswer) {
		assert.strictEqual(this.actualAnswer, expectedAnswer);
	});
}

{
	// delete my own book
	Given('the user is the rightful owner of a specific book', async function () {
		const { email, password } = bookowners[0];
		this.token = await login({ email, password });

		this.bookId = TEST_BOOK_ID;
	});

	When('the owner initiates the book deletion process', async function () {
		this.actualAnswer = await deleteBook(this.bookId, this.token);
	});

	Then('the book should be removed from the system', function () {
		assert.strictEqual(this.actualAnswer, 'success');
	});

	Then('the owner should receive a {string} confirmation', function (expectedMessage) {
		assert.strictEqual(this.actualAnswer, expectedMessage);
	});
}

{
	// attempt to delete a book owned by another user
	Given('there exists a book belonging to another user', async function () {
		const { email, password } = bookowners[1];
		this.token = await login({ email, password });
		this.bookId = 7;
	});

	When('an unauthorized user tries to delete the book', async function () {
		this.actualAnswer = await deleteBook(this.bookId, this.token);
	});

	Then('the book should remain in the system', function () {
		assert.strictEqual(this.actualAnswer, 'error');
	});

	Then('the unauthorized user should get an {string} notification', function (expectedMessage) {
		assert.strictEqual(this.actualAnswer, expectedMessage);
	});
}

{
	let uploadedBookId;

	Given('an owner has uploaded a new book to the system', async function () {
		const { email, password } = bookowners[0];
		this.ownerToken = await login({ email, password });
		const bookData = {
			name: `New Test Book ${Math.random().toString()}`,
			author: 'test author',
			category: 'fiction',
			price: 150,
			quantity: 100
		};
		const result = await uploadBook(bookData, this.ownerToken);
		uploadedBookId = result.bookId;
		assert.ok(uploadedBookId, 'Book should be uploaded successfully');
	});

	When('the system admin approves the uploaded book', async function () {
		const { email, password } = admin;
		const adminToken = await login({ email, password });
		await approveBook(uploadedBookId, adminToken);
	});

	Then('the book should appear in the list of books available for rent', async function () {
		const availableBooks = await getAvailableBooks();

		const bookIsAvailable = availableBooks.some((book) => book?.id === uploadedBookId);
		assert.ok(bookIsAvailable, 'Approved book should be available for rent');
	});
}

{
	// Book invisibility when not approved by admin
	let uploadedBookId;

	Given('an owner has uploaded another a new book to the system', async function () {
		// This step is the same as in the previous scenario
		const { email, password } = bookowners[0];
		this.ownerToken = await login({ email, password });

		const bookData = {
			name: `New Test Book ${Math.random().toString()}`,
			author: 'test author',
			category: 'fiction',
			price: 150,
			quantity: 100
		};

		const result = await uploadBook(bookData, this.ownerToken);
		assert.ok(!!result.bookId, 'Book should be uploaded successfully');
	});

	When('the admin has not approved the book', function () {
		// This step doesn't require any action, it's a setup for the next step
	});

	Then('the book should not be visible in the rental list', async function () {
		const availableBooks = await getAvailableBooks();
		const bookIsAvailable = availableBooks.some((book) => book?.id === uploadedBookId);
		assert.ok(!bookIsAvailable, 'Unapproved book should not be available for rent');
	});
}

{
	let initialBalance;
	let bookId;
	let rentalPrice;

	Given("the owner's initial wallet balance is recorded", async function () {
		const { email, password } = bookowners[0];
		this.ownerToken = await login({ email, password });
		initialBalance = await getOwnerBalance(this.ownerToken);
		assert.ok(typeof initialBalance === 'number', 'Initial balance should be a number');

		const availableBooks = await getAvailableBooks();
		const bookToRent = availableBooks[0];
		assert.ok(bookToRent, 'There should be at least one book available for rent');
		bookId = bookToRent.id;
		rentalPrice = bookToRent.price;
	});

	When('a customer rents the book', async function () {
		await rentBook(bookId, 'customer_token');
	});

	Then("the owner's wallet should be incremented by the rental price", async function () {
		const updatedBalance = await getOwnerBalance(this.ownerToken);
		assert.strictEqual(
			updatedBalance,
			initialBalance + rentalPrice,
			`Owner's wallet should be incremented by ${rentalPrice}`
		);
	});
}