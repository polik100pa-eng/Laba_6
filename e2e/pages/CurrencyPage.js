class CurrencyPage {
    constructor(page) {
        this.page = page;

        this.fromCurrency = '#fromCurrency';
        this.toCurrency = '#toCurrency';
        this.amount = '#amount';
        this.convertBtn = '#convertBtn';
        this.result = '#result';
        this.error = '#error';
    }

    async open() {
        await this.page.goto('http://localhost:3000');
        await this.page.waitForSelector('#fromCurrency');
    }

    async setFrom(currency) {
        await this.page.selectOption(this.fromCurrency, currency);
    }

    async setTo(currency) {
        await this.page.selectOption(this.toCurrency, currency);
    }

    async setAmount(value) {
        await this.page.fill(this.amount, String(value));
    }

    async clickConvert() {
        await this.page.click(this.convertBtn);
    }

    async getResult() {
        return await this.page.textContent(this.result);
    }

    async getError() {
        return await this.page.textContent(this.error);
    }
}

module.exports = CurrencyPage;