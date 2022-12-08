import { dbank } from "../../declarations/dbank";

window.addEventListener("load", () => {
	updateBalance();
});

document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault();

	const button = document.querySelector('#submit-btn');
	button.setAttribute('disabled', true);

	const topupField = document.querySelector("#input-amount");
	const withdrawalField = document.querySelector("#withdrawal-amount");

	const topupVal = parseFloat(topupField.value);
	const withdrawalVal = parseFloat(withdrawalField.value);

	if (topupVal > 0) {
		await dbank.topUp(topupVal);
	}

	if (withdrawalVal > 0) {
		await dbank.withdraw(withdrawalVal);
	}

	await dbank.compound();

	updateBalance();

	button.removeAttribute('disabled');
	topupField.value = "";
	withdrawalField.value = "";
});

const updateBalance = async () => {
	const balance = await dbank.checkBalance();
	document.querySelector("#balance").innerHTML = Math.round(balance * 100) / 100;
};
