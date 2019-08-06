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

		let tdArray = [];
		for (let i = 0; i < y; i++) {
			let tr = document.createElement("tr");
			tdArray[i] = [];
			for (let k = 0; k < x; k++) {
				let td = document.createElement("td");
				tdArray[i].push(td);
				td.classList.add("unOpened");
				td.id = i + " " + k;
				tr.appendChild(td);
			}
			gameField.appendChild(tr);
		}
		document.body.appendChild(gameField);

		for (let i = 0; i < tdArray.length; i++) {
			for (let k = 0; k < tdArray[i].length; k++) {
				tdArray[i][k].addEventListener("click", openCell);
			}
		}

		for (let i = 0; i < tdArray.length; i++) {
			for (let k = 0; k < tdArray[i].length; k++) {
				tdArray[i][k].addEventListener("contextmenu", function(event) {
					event.preventDefault();
					if (!event.target.classList.contains("unOpened")) return;
					event.target.classList.toggle("flag");
					return false;
				}, false);
			}
		}

		let isFirst = true;
		function openCell(event) {
			if (isFirst) {
				generateBombs(event);
				isFirst = false;
			}
			//нажали на бомбу
			if (event.target.classList.contains("bomb")) {
				for (let i = 0; i < tdArray.length; i++) {
					for (let k = 0; k < tdArray[i].length; k++) {
						tdArray[i][k].removeEventListener("click", openCell);
					}
				}

				for (let i = 0; i < tdArray.length; i++) {
					for (let k = 0; k < tdArray[i].length; k++) {
						if (tdArray[i][k].classList.contains("bomb")) {
							tdArray[i][k].classList.add("redBackground");
							tdArray[i][k].classList.remove("unOpened");
						}
					}
				}

				let endGameBlock = document.createElement("div");
				endGameBlock.classList.add("endGamePage");
				endGameBlock.textContent = "you lose";
				document.body.appendChild(endGameBlock);
			}

			//нажали на цифру
			if (event.target.querySelector(".innerDiv").textContent != "") {
				event.target.querySelector(".innerDiv").classList.remove("hidden");
				event.target.classList.remove("unOpened");
				event.target.classList.remove("flag");
				wonGame();
			}

			//нажали на пустое место
			if (event.target.querySelector(".innerDiv").textContent == "") {
				openEmptyCells(event.target);
			}

			function openEmptyCells(elem) {
				let toCheck = [];
				let coords = elem.id.match(/[0-9]+/g);
				let y = +coords[0];
				let x = +coords[1];
				elem.classList.remove("unOpened");
				elem.querySelector(".innerDiv").classList.remove("hidden");
				wonGame();

				toCheck.push(tdArray[y][x + 1]);
				toCheck.push(tdArray[y][x - 1]);
				toCheck.push(tdArray[y + 1][x]);
				toCheck.push(tdArray[y - 1][x]);

				for (let i = 0; i < toCheck.length; i++) {
					toCheck[i].classList.remove("unOpened", "flag");
					toCheck[i].querySelector(".innerDiv").classList.remove("hidden");
					toCheck[i].classList.add("checked");
					wonGame();
					if (toCheck[i].querySelector(".innerDiv").textContent != "") {
						continue;
					}

					let localCoords = toCheck[i].id.match(/[0-9]+/g);
					let localX = +localCoords[1];
					let localY = +localCoords[0];

					if (tdArray[localY + 1] != undefined) {
						if (!tdArray[localY + 1][localX].classList.contains("checked")) {
							toCheck.push(tdArray[localY + 1][localX]);
						}
						if (tdArray[localY + 1][localX + 1] != undefined) {
							if (!tdArray[localY + 1][localX + 1].classList.contains("checked")) {
								toCheck.push(tdArray[localY + 1][localX + 1]);
							}
						}
						if (tdArray[localY + 1][localX - 1] != undefined) {
							if (!tdArray[localY + 1][localX - 1].classList.contains("checked")) {
								toCheck.push(tdArray[localY + 1][localX - 1]);
							}
						}
					}
					if (tdArray[localY - 1] != undefined) {
						if (!tdArray[localY - 1][localX].classList.contains("checked")) {
							toCheck.push(tdArray[localY - 1][localX]);
						}
						if (tdArray[localY - 1][localX + 1] != undefined) {
							if (!tdArray[localY - 1][localX + 1].classList.contains("checked")) {
								toCheck.push(tdArray[localY - 1][localX + 1]);
							}
						}
						if (tdArray[localY - 1][localX - 1] != undefined) {
							if (!tdArray[localY - 1][localX - 1].classList.contains("checked")) {
								toCheck.push(tdArray[localY - 1][localX - 1]);
							}
						}
					}
					if (tdArray[localY][localX - 1] != undefined) {
						if (!tdArray[localY][localX - 1].classList.contains("checked")) {
							toCheck.push(tdArray[localY][localX - 1]);
						}
					}
					if (tdArray[localY][localX + 1] != undefined) {
						if (!tdArray[localY][localX + 1].classList.contains("checked")) {
							toCheck.push(tdArray[localY][localX + 1]);
						}
					}
				}
			}
		}

		function generateBombs(event) {
			for (let i = 0; i < tdArray.length; i++) {
				for (let k = 0; k < tdArray[i].length; k++) {
					if (Math.round(Math.random() * 10 > 9)) {
						tdArray[i][k].classList.add("bomb");
					}
				}
			}
			if (event.target.classList.contains("bomb")) {
				event.target.classList.remove("bomb");
			}

			for (let i = 0; i < tdArray.length; i++) {
				for (let k = 0; k < tdArray[i].length; k++) {
					if (tdArray[i][k].classList.contains("bomb")) {
						if (tdArray[i][k - 1] !== undefined) {
							tdArray[i][k - 1].className += " _b";
						}
						if (tdArray[i][k + 1] !== undefined) {
							tdArray[i][k + 1].className += " _b";
						}
						if (tdArray[i - 1] !== undefined) {
							if (tdArray[i - 1][k - 1] !== undefined) {
								tdArray[i - 1][k - 1].className += " _b";
							}
							if (tdArray[i - 1][k] !== undefined) {
								tdArray[i - 1][k].className += " _b";
							}
							if (tdArray[i - 1][k + 1] !== undefined) {
								tdArray[i - 1][k + 1].className += " _b";
							}
						}
						if (tdArray[i + 1] !== undefined) {
							if (tdArray[i + 1][k - 1] !== undefined) {
								tdArray[i + 1][k - 1].className += " _b";
							}
							if (tdArray[i + 1][k] !== undefined) {
								tdArray[i + 1][k].className += " _b";
							}
							if (tdArray[i + 1][k + 1] !== undefined) {
								tdArray[i + 1][k + 1].className += " _b";
							}
						}
					}
				}
			}

			for (let i = 0; i < tdArray.length; i++) {
				for (let k = 0; k < tdArray[i].length; k++) {
					if (tdArray[i][k].classList.contains("bomb")) {
						continue;
					}
					let innerDiv = document.createElement("div");
					innerDiv.classList.add("hidden", "innerDiv");
					tdArray[i][k].appendChild(innerDiv);
				}
			}

			for (let i = 0; i < tdArray.length; i++) {
				for (let k = 0; k < tdArray[i].length; k++) {
					if (tdArray[i][k].classList.contains("bomb")) {
						tdArray[i][k].classList.remove("_b");
						continue;
					}
					let numberOfBombs = tdArray[i][k].className.match(/_b/g);
					if (numberOfBombs == null) {
						continue;
					}
					numberOfBombs = numberOfBombs.length;
					tdArray[i][k].querySelector(".innerDiv").textContent = numberOfBombs;
					tdArray[i][k].classList.remove("_b");
				}
			}
		}
		function wonGame() {
			let count = 0;
			for (let i = 0; i < tdArray.length; i++) {
				for (let k = 0; k < tdArray[i].length; k++) {
					if (tdArray[i][k].classList.contains("unOpened") && !tdArray[i][k].classList.contains("bomb")) {
						count++;
					} 
				}
			}
			if (count == 0) {
				let endGameDiv = document.createElement("div");
				endGameDiv.textContent = "you won";
				endGameDiv.classList.add("endGameDiv");
				document.body.appendChild(endGameDiv);
				document.body.removeChild(gameField);
			}
		}
	});
});