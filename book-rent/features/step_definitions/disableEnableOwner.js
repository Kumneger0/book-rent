const assert = require('assert');
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const BASE_URL = 'http://localhost:4000';

const admin = {
	email: 'bob@example02.com',
	password: 'password789'
};

setDefaultTimeout(20000);

/**
 * disable or enable user
 * @param {number} id - user id that needs to be disabled or enabled
 * @param {boolean} isActive - a boolean where to enable or disable user
 * @param {string} token - admin or a persons token who makes this request
 * @returns {UpdateBookResult}
 */
const disableOwner = async (id, isActive, token) => {
	try {
		const response = await fetch(`${BASE_URL}/api/owner/disable`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${token}`
			},
			body: JSON.stringify({ id, isActive })
		});

		/**
		 * @typedef {Object} UpdateBookResult
		 * @property {'success' | 'error'} status - The status of the update operation
		 * @property {Object} data - The data object containing the message
		 * @property {string} data.message - The message describing the result of the operation
		 * @property {object} data.owner - The updated owner data
		 */

		/** @type {UpdateBookResult} */
		const data = await response.json();

		return data;
	} catch (error) {
		throw error;
	}
};

/**
 * @typedef {Object} LoginCredential
 * @property {string} email
 * @property {string} password
 */

/**
 * @param {LoginCredential}
 * @returns
 */
const login = async ({ email, password }) => {
	try {
		const response = await fetch(`${BASE_URL}/api/user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password }),
			credentials: 'include'
		});

		/**
		 * @typedef {Object} LoginResponse
		 * @property {'success' | 'error'} status - The status of the update operation
		 * @property {Object} data - The data object containing the message
		 * @property {string} data.message - The message describing the result of the operation
		 */

		/**
		 * @type LoginResponse
		 */
		const data = await response.json();

		/**
		 * @type {string}
		 */
		const setCookieHeader = response.headers.get('set-cookie');
		const token = setCookieHeader.split(';')[0].split('=').at(-1);

		return token;
	} catch (errr) {}
};

{
	// Disable owner account feature test
	Given('an active owner account', async function () {
		this.ownerId = 5;
		this.token = await login({ email: admin.email, password: admin.password });
		this.isActive = false;
	});

	When('I request to disable the owner account', async function () {
		this.actualResult = await disableOwner(this.ownerId, this.isActive, this.token);
	});

	Then('the owner account should be disabled', function () {
		assert.strictEqual(this.actualResult.data.owner?.isActive, this.isActive);
	});

	Then('all associated books should be marked as unavailable', function () {
		const isBooksDisabled =
			this.actualResult.data.owner.Book.every(({ isApproved }) => isApproved === false) ??
			this.actualResult.data?.owner?.Book.length == 0;
		assert.strictEqual(isBooksDisabled, true);
	});
}

{
	//enable owner account feature test
	Given('a disabled user account', async function () {
		this.ownerId = 5;
		this.token = await login({ email: admin.email, password: admin.password });
		this.isActive = true;
	});

	When('I request to enable the user account', async function () {
		this.actualResult = await disableOwner(this.ownerId, this.isActive, this.token);
	});

	Then('the user account should be activated', function () {
		assert.strictEqual(this.actualResult.data.owner.isActive, this.isActive);
	});
}

module.exports = { login, admin };
