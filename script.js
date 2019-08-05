'use strict';

window.addEventListener("load", function() {
	let selectModeMenu = document.querySelector("#selectModeMenu");
	selectModeMenu.addEventListener("click", function(event) {
		let optionList = document.querySelector("#optionList");
		optionList.classList.toggle("hidden");

		let angle = document.querySelector(".selectModeMenu__selected_angle i");
		angle.classList.toggle("fa-angle-down");
		angle.classList.toggle("fa-angle-up");

		let selectedValue = document.querySelector(".selectModeMenu__selected_value");
		let optionCollecton = document.querySelectorAll(".selectoModeMenu__optionList-itm");
		for (let i = 0; i < optionCollecton.length; i++) {
			optionCollecton[i].addEventListener("click", function(event) {
				selectedValue.textContent = event.target.textContent;
			});
		}
	});

	let startGameBtn = document.querySelector("#startGameBtn");
	startGameBtn.addEventListener("click", function(event) {
		let selectedValue = document.querySelector(".selectModeMenu__selected_value");
		let startGamePage = document.querySelector(".startGameWrap");
		if (selectedValue.textContent == "choose game mode") {
			if (document.querySelector(".alertDiv") != null) {
				return;
			}
			let alertDiv = document.createElement("div");
			alertDiv.classList.add("alertDiv");
			alertDiv.textContent = "choose game mode!";
			startGamePage.appendChild(alertDiv);
			return;
		}

		let gameMode = selectedValue.textContent.match(/[0-9]+/g);
		let y = +gameMode[0];
		let x = +gameMode[1];

		document.body.removeChild(startGamePage);

		let gameField = document.createElement("table");
		gameField.classList.add("gameField");
	});
});