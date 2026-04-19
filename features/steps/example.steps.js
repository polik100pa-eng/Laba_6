const { Given, Then } = require('@cucumber/cucumber');
const assert = require('assert');

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

let response;

Given('I send GET request to {string}', async function (url) {
    response = await fetch('http://localhost:3000' + url);
});

Then('response status should be {int}', function (status) {
    assert.strictEqual(response.status, status);
});