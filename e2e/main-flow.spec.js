const { test, expect } = require('@playwright/test');
const CurrencyPage = require('./pages/CurrencyPage');

test.describe('Конвертер валют', () => {

    let pageObj;

    // test.beforeEach(async ({ page }) => {
    //     pageObj = new CurrencyPage(page);
    //     await pageObj.open();
    // });

    test.beforeEach(async ({ page }) => {

        await page.route('**/api/rates/**', route => {
            route.fulfill({
                contentType: 'application/json',
                body: JSON.stringify({ rate: 2 })
            });
        });

        pageObj = new CurrencyPage(page);
        await pageObj.open();
    });

    // ---------------- POSITIVE ----------------
    test('Успешная конвертация USD -> BYN', async () => {
        await pageObj.setFrom('USD');
        await pageObj.setTo('BYN');
        await pageObj.setAmount(100);
        await pageObj.clickConvert();

        await expect(pageObj.page.locator('#result'))
            .toContainText('Результат');
    });

    // ---------------- DATA DRIVEN ----------------
    const testData = [
        { amount: 100 },
        { amount: 1000.50 }
    ];

    for (const data of testData) {
        test(`Конвертация суммы: ${data.amount}`, async () => {
            await pageObj.setFrom('USD');
            await pageObj.setTo('BYN');
            await pageObj.setAmount(data.amount);
            await pageObj.clickConvert();

            await expect(pageObj.page.locator('#result'))
                .toContainText('Результат');
        });
    }

    // ---------------- NEGATIVE ----------------

    test('Ошибка при отрицательной сумме', async () => {
        await pageObj.setFrom('USD');
        await pageObj.setTo('BYN');
        await pageObj.setAmount(-10);
        await pageObj.clickConvert();

        const error = await pageObj.getError();
        expect(error).toContain('больше нуля');
    });

    test('Ошибка при одинаковых валютах', async () => {
        await pageObj.setFrom('USD');
        await pageObj.setTo('USD');
        await pageObj.setAmount(100);
        await pageObj.clickConvert();

        const error = await pageObj.getError();
        expect(error).toContain('саму в себя');
    });

    test('Ошибка при нулевой сумме', async () => {
        await pageObj.setFrom('USD');
        await pageObj.setTo('BYN');
        await pageObj.setAmount(0);
        await pageObj.clickConvert();

        await expect(pageObj.page.locator('#error'))
            .toContainText('больше нуля');
    });

});