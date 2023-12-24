const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const requestAmmount = document.getElementById("request_ammount");
const answerAmmount = document.getElementById("answer_ammount");
const swapButton = document.getElementById('swap_button');
let curCurrensy = 0;
let countryCodes;

const apiKey = 'ваш-апи-ключ';
// Регистрируемся на exchangerate-api.com получаем апи ключ

async function fetchCodes() {
	try {
		let json = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
		let res = await json.json();
		countryCodes = res.supported_codes;
		localStorage.setItem('codes', JSON.stringify(countryCodes));
	} catch (e) {
		console.error(e);
	}
}

function loadFlag(element) {
	let imgTag = element.parentElement.querySelector("img");
	imgTag.src = `https://flagcdn.com/48x36/${element.value.slice(0, -1).toLowerCase()}.png`;
}

function handleSelectChange(e) {
	loadFlag(e.target);
	calculateRate(fromCurrency.value, toCurrency.value)
}

if (localStorage.getItem('codes')) {
	countryCodes = JSON.parse(localStorage.getItem('codes'));
} else {
	fetchCodes();
}

countryCodes.forEach(([countryCode, currencyName]) => {
	let optionTag = `<option value="${countryCode}">${currencyName}</option>`;
	fromCurrency.insertAdjacentHTML("beforeend", optionTag);
	toCurrency.insertAdjacentHTML("beforeend", optionTag);
});

fromCurrency.querySelector('option[value="USD"]').selected = true;
toCurrency.querySelector('option[value="RUB"]').selected = true;

calculateRate(fromCurrency.value, toCurrency.value);

fromCurrency.addEventListener("change", handleSelectChange);
toCurrency.addEventListener("change", handleSelectChange);

async function calculateRate(code1, code2) {
	let json = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${code1}/${code2}`);
	let res = await json.json();
	curCurrensy = res.conversion_rate;
	answerAmmount.value = curCurrensy * request_ammount.value;
}

requestAmmount.addEventListener('input', () => {
	if (isNaN(request_ammount.value)) {
		request_ammount.value = request_ammount.value.slice(0, -1);
		return;
	}
	answerAmmount.value = curCurrensy * request_ammount.value;
});

swapButton.addEventListener('click', () => {
	[request_ammount.value, answerAmmount.value] = [answerAmmount.value, request_ammount.value];
	const fromCurrencyValue = fromCurrency.value;
	const toCurrencyValue = toCurrency.value;
	fromCurrency.querySelector(`option[value="${toCurrencyValue}"]`).selected = true;
	toCurrency.querySelector(`option[value="${fromCurrencyValue}"]`).selected = true;
	loadFlag(fromCurrency);
	loadFlag(toCurrency);
	curCurrensy = 1 / curCurrensy;
})

let cloudFun = 'ссылка на облачную функцию'
// получаем ссылку из аккаунта яндекс клауд

let xhr = new XMLHttpRequest();
xhr.open('POST', cloudFun, true);
let currency = countryCodes.reduce((res, el) => `${res};${el[1]}`, '');
xhr.send(currency.slice(1));

xhr.onload = function () {
	let translations = JSON.parse(xhr.response).translations;
	countryCodes.forEach((arr, i) => {
		arr[1] = translations[i].text;
	});
	console.log(countryCodes);
	localStorage.setItem('codes', JSON.stringify(countryCodes));
};

