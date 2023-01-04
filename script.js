// Variables
const formulaScreen = document.querySelector('.formulaScreen');
const outputScreen = document.querySelector('.outputScreen');
const buttons = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');
const operators = ['/', '*', '+', '-'];
// Regex

// Calculator Display
let realTimeScreenValue = [];

// To clear
clearBtn.addEventListener('click', () => {
	realTimeScreenValue = [];
	formulaScreen.innerHTML = null;
	outputScreen.innerHTML = 0;
});

// Get value of any button clicked and display to the screen

buttons.forEach((btn) => {
	btn.addEventListener('click', () => {
		if (btn.classList.contains('num-btn')) {
			if (realTimeScreenValue.length) {
				let length = realTimeScreenValue.length;

				if (realTimeScreenValue[length - 1] === '0' && operators.includes(realTimeScreenValue[length - 2])) {
					if (btn.value === '0') {
						return;
					} else {
						realTimeScreenValue[length - 1] = btn.value;
					}
				} else {
					if ((!['0', '.'].includes(realTimeScreenValue[length - 1]) || (realTimeScreenValue[length - 2] !== '.' && realTimeScreenValue[length - 1] !== '.')) && realTimeScreenValue.length > 1) {
						let idxOfLastOperator = 0;
						realTimeScreenValue.forEach((data, idx) => {
							if (operators.includes(data)) idxOfLastOperator = idx;
						});

						let newArray = [...realTimeScreenValue].slice(idxOfLastOperator);

						let checker1 = newArray.findIndex((data) => operators.includes(data));
						let checker2 = newArray.findIndex((data) => data === '.');

						if (checker1 !== -1 && checker2 !== -1) {
							if (btn.value === '.' && checker2 >= 0) return;
							realTimeScreenValue.push(btn.value);
						} else {
							if (btn.value === '.' && checker2 >= 0) return;
							if (idxOfLastOperator > 0 && operators.includes(btn.value) && operators.includes(realTimeScreenValue[length - 1])) {
								if (btn.value !== '-') {
									if (operators.includes(realTimeScreenValue[length - 2])) {
										realTimeScreenValue.pop();
										realTimeScreenValue[length - 2] = btn.value;
									} else {
										realTimeScreenValue[length - 1] = btn.value;
									}
								} else {
									realTimeScreenValue.push(btn.value);
								}
							} else {
								realTimeScreenValue.push(btn.value);
							}
						}
					} else if (realTimeScreenValue[length - 1] === '.') {
						if (btn.value === '.') {
							return;
						} else {
							realTimeScreenValue.push(btn.value);
						}
					} else {
						if (realTimeScreenValue[length - 1] === '0' && realTimeScreenValue[length - 2] === '.') {
							realTimeScreenValue.push(btn.value);
						} else {
							if (realTimeScreenValue.length === 1 && realTimeScreenValue[length - 1] === '0') {
								realTimeScreenValue[length - 1] = btn.value;
							} else {
								realTimeScreenValue.push(btn.value);
							}
						}
					}
				}
			} else {
				if (btn.value === '.') {
					realTimeScreenValue = ['0', '.'];
				} else {
					realTimeScreenValue.push(btn.value);
				}
			}

			formulaScreen.innerHTML = realTimeScreenValue.join('');
		}

		// To get output when equals clicked
		if (btn.id.match('equals')) {
			outputScreen.innerHTML = eval(realTimeScreenValue.join(''));
		}

		// To prevent undefined error in screen
		if (typeof eval(realTimeScreenValue.join('')) === 'undefined') {
			outputScreen.innerHTML = 0;
		}
	});
});
