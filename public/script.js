document.getElementById("convertBtn").addEventListener("click", async () => {
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;
    const amount = parseFloat(document.getElementById("amount").value);

    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");

    resultDiv.textContent = "";
    errorDiv.textContent = "";

    if (amount <= 0) {
        errorDiv.textContent = "Сумма должна быть больше нуля";
        return;
    }

    if (from === to) {
        errorDiv.textContent = "Нельзя конвертировать валюту саму в себя";
        return;
    }

    let rate = 1;

    if (from !== "BYN") {
        const response = await fetch(`/api/rates/${from}`);
        const data = await response.json();
        rate = data.rate;
    }

    let result = amount * rate;

    if (to !== "BYN") {
        const response = await fetch(`/api/rates/${to}`);
        const data = await response.json();
        result = result / data.rate;
    }

    resultDiv.textContent = `Результат: ${result.toFixed(2)} ${to}`;
});