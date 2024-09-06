const assert = require('assert');
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { login, admin } = require('./disableEnableOwner');

const BASE_URL = 'http://localhost:4000';

const bookowners = [
	{
		email: 'tom@example02.com',
		password: 'password345'
	},
	{
		email: 'jane@exampl02e.com',
		password: 'password456'
	}
];

/**
 * @typedef {Object} User
 * @property {number} id - The unique identifier for the user.
 * @property {string} fullName - The full name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} location - The location of the user.
 * @property {string} phoneNumber - The phone number of the user.
 * @property {boolean} approved - Indicates if the user is approved.
 * @property {boolean} isActive - Indicates if the user account is active.
 * @property {number} roleId - The role identifier for the user.
 * @property {Book[]} Book
 * @property {MonthlyIncome[]} MonthlyIncome - The user's monthly income details.
 */

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
 * @param {number} quantity
 * @param {string} token
 * @returns {Promise<UploadBookResponse>}
 */
const uploadBook = async (quantity, token) => {
	try {
		const response = await fetch(`${BASE_URL}/api/books`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: `New Test Book ${Math.random().toString()}`,
				author: 'test author',
				category: 'fiction',
				price: 150,
				quantity
			})
		});
		const { data } = await response.json();
		return { bookId: data.book?.id };
	} catch (err) {}
};

const getOwnerBalanceAndBookToRent = async (token) => {
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

	/**
	 * @typedef {Object} ApiResponseMe
	 * @property {'success' | 'error'} status
	 * @property {object} data
	 * @property {User} data.user
	 */

	/**
	 * @type ApiResponseMe
	 */

	const { data } = await response.json();

	/**
	 * @type {number}
	 */
	const balance = data.user.MonthlyIncome.map(({ income }) => income).reduce(
		(prv, curr) => prv + curr,
		0
	);

	const ownerBooks = data.user.Book;

	return { balance, ownerBooks, authorId: data.user.id };
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
		console.log('approve result', data);
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
		const response = await fetch(`${BASE_URL}/api/books/user/getbooks`, {
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

const rentBook = async (bookId, authorId, price, token) => {
	try {
		const response = await fetch(`${BASE_URL}/api/books/rent`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${token}`
			},
			body: JSON.stringify({ bookId, authorId, price })
		});

		const data = await response.json();

		console.log('book rent result', data);

		if (response.ok) {
		} else {
		}
	} catch (err) {
		console.errror(err);
		throw err;
	}
};

const returnBook = async (bookId, token) => {
	try {
		const response = await fetch(`${BASE_URL}/api/books/return`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${token}`
			},
			body: JSON.stringify({ bookId })
		});

		const data = await response.json();

		console.log('book return result', data);

		if (response.ok) {
		} else {
		}
	} catch (err) {
		console.errror(err);
		throw err;
	}
};

const getAllBooksFromAllOwner = async (token) => {
	try {
		const response = await fetch(`${BASE_URL}/api/books/user/getbooks`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${token}`
			}
		});

		/** @type {GetBooksResponse} */
		const result = await response.json();

		if (result.status === 'success') {
			return { status: result.status, books: result.data.books };
		} else {
			throw new Error(result.data.message || 'Failed to fetch approved books');
		}
	} catch (error) {
		throw error;
	}
};

let bookId;

{
	// update my own book
	Given('the owner has a book in their collection', async function () {
		const { email, password } = bookowners[0];
		this.token = await login({ email, password });
		bookId = (await getOwnerBalanceAndBookToRent(this.token)).ownerBooks?.[0]?.id;
		this.bookId = 7;
	});

	When('the owner requests to update the book details', async function () {
		this.actualAnswer = await update(bookId, this.token);
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
	});

	When('an unauthorized user attempts to update the book details', async function () {
		this.actualAnswer = await update(bookId, this.token);
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

		//get random book to delete
		const randomBookToDelete = (await getOwnerBalanceAndBookToRent(this.token)).ownerBooks?.[0];

		this.bookId = randomBookToDelete.id;
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
		assert.ok(this.token, 'Token is needed to make a request');
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

		uploadedBookId = (await uploadBook(100, this.ownerToken)).bookId;

		assert.ok(uploadedBookId, 'Book should be uploaded successfully');
	});

	When('the system admin approves the uploaded book', async function () {
		const { email, password } = admin;
		const adminToken = await login({ email, password });
		await approveBook(uploadedBookId, adminToken);
	});

	Then('the book should appear in the list of books available for rent', async function () {
		const availableBooks = await getAvailableBooks();

		console.log('avail books', availableBooks);

		console.log('bookiD', uploadedBookId);

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

		const result = await uploadBook(100, this.ownerToken);
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
	Given("the owner's initial wallet balance is recorded", async function () {
		const { email, password } = bookowners[0];
		this.ownerToken = await login({ email, password });
		const { balance, ownerBooks, authorId } = await getOwnerBalanceAndBookToRent(this.ownerToken);
		this.initialBalance = balance;
		assert.ok(typeof this.initialBalance === 'number', 'Initial balance should be a number');
		const bookToRent = ownerBooks[Math.floor(Math.random() * ownerBooks.length)];
		assert.ok(bookToRent, 'There should be at least one book available for rent');
		this.bookId = bookToRent.id;
		this.rentalPrice = bookToRent.price;
		this.authorId = authorId;
	});

	When('a customer rents the book', async function () {
		const email = 'alice@examp02le.com';
		const password = 'password012';

		const userToken = await login({ email, password });

		assert.ok(userToken, 'user token needed to rent books');

		await rentBook(this.bookId, this.authorId, this.rentalPrice, userToken);
	});

	Then("the owner's wallet should be incremented by the rental price", async function () {
		const { balance } = await getOwnerBalanceAndBookToRent(this.ownerToken);

		console.log('table data');
		console.table({
			initialBalance: this.initialBalance,
			rentalPrice: this.rentalPrice,
			newBalance: balance
		});

		assert.strictEqual(
			balance,
			this.initialBalance + this.rentalPrice,
			`Owner's wallet should be incremented by ${this.rentalPrice}`
		);
	});
}

Given('an owner has uploaded two pieces of the same book', async function () {
	const { email, password } = bookowners[0];
	this.ownerToken = await login({ email, password });
	const result = await uploadBook(2, this.ownerToken);
	console.log('book upload result', result);
	this.bookId = result.bookId;
	const adminToken = await login({ email: admin.email, password: admin.password });
	const approveResult = await approveBook(this.bookId, adminToken);
	console.log('approve result', approveResult);
	const { authorId } = await getOwnerBalanceAndBookToRent(this.ownerToken);
	this.authorId = authorId;
});

When('both pieces are rented', async function () {
	const email = 'alice@examp02le.com';
	const password = 'password012';
	this.userToken = await login({ email, password });

	assert.ok(this.userToken, 'user token needed to rent books');

	await rentBook(this.bookId, this.authorId, 150, this.userToken);
	const secondUserEmail = 'zamarian.jerren@frontads.org';
	const secondUserPass = '6GuPUpLJlA*Dn&u#';
	this.secondUserToken = await login({ email: secondUserEmail, password: secondUserPass });

	await rentBook(this.bookId, this.authorId, 150, this.secondUserToken);

	assert.ok(this.secondUserToken, 'user token needed to rent books');
});

Then('the book should be unavailable for rent until one of them is returned', async function () {
	const allbooks = await getAvailableBooks();
	const isBookNotAvailBeforeReturn = allbooks.every(({ id }) => Number(id) !== Number(this.bookId));
	assert.ok(
		isBookNotAvailBeforeReturn,
		'book should not available for rent since both pieces are rented'
	);
	await returnBook(this.bookId, this.secondUserToken);

	const allbooksAfterReturn = await getAvailableBooks();
	const isBookNotAvailAfterRetrun = allbooksAfterReturn.some(
		({ id }) => Number(id) === Number(this.bookId)
	);

	assert.ok(isBookNotAvailAfterRetrun, 'book should be avail since on of user returns abook');
});

Given('the user is a system admin', async function () {
	this.adminToken = await login({ email: admin.email, password: admin.password });
	assert.ok(this.adminToken, 'token is needed to perform opration');
});

When('the admin requests to view all books', async function () {
	const { books, status } = await getAllBooksFromAllOwner(this.adminToken);
	this.getBooksFromAllOwnerResult = status;
	this.booksFromAllOwners = await getAllBooksFromAllOwner(this.adminToken);
});

Then('the system should display all books from all owners', function () {
	assert.ok(this.getBooksFromAllOwnerResult == 'success');
});

module.exports = {
	getOwnerBalanceAndBookToRent
};
