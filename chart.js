window.addEventListener('load', () => {
	//start
	//variables
	let labelX = document.querySelector('.label-x'),
		labelY = document.querySelector('.label-y'),
		chart = document.querySelector('.chart'),
		titleElement = document.querySelector('h2'),
		descriptionElement = document.querySelector('p'),
		valueElement = document.querySelector('pre'),
		allItems = () => document.querySelectorAll('.item'), // to return the items each time
		request = new XMLHttpRequest(),
		lastElementNum = 0,
		scaleNumber,
		response;
	//get the json file
	request.open('GET', './data.json');
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		response = request.response;
		sortItems(response);

		// console.log(response);
		itemHTML(response);
	};
	function sortItems(response) {
		// fill the label elements
		labelY.innerHTML = response.labels.y;
		labelX.innerHTML = response.labels.x;
		//sort the items
		response.items.sort((a, b) => {
			return b.value - a.value;
		});
		scaleNumber = response.items[0].value; // the biggest number => our scale (100%)
	}
	function itemHTML(response) {
		// make element for each item
		response.items.forEach((itemsValues, index, arr) => {
			chart.innerHTML = chart.innerHTML + `<div class="item" data-src=${index}></div>`;
		});
		allItems().forEach(function(value, index, array) {
			colorLastElementNum(lastElementNum);

			value.addEventListener('mouseenter', function(e) {
				lastElementNum = index;
				colorLastElementNum(lastElementNum);
			});
		});
		document.addEventListener('keydown', function(e) {
			switch (e.keyCode) {
				case 37:
					lastElementNum <= 0 ? (lastElementNum = 37) : lastElementNum--;
					colorLastElementNum(lastElementNum);
					break;
				case 39:
					lastElementNum >= 37 ? (lastElementNum = 0) : lastElementNum++;
					colorLastElementNum(lastElementNum);
					break;
			}
		});
	}
	function colorLastElementNum(lastElementNum) {
		allItems().forEach(function(value, index) {
			value.style.backgroundColor = response.items[index].color;
			value.style.height = `${((response.items[index].value / scaleNumber * 100).toFixed() /
				100 *
				270).toFixed()}px`;
			titleElement.innerHTML = response.items[lastElementNum].title;
			descriptionElement.innerHTML = response.items[lastElementNum].description;
			valueElement.innerHTML = numberSemAdder(response.items[lastElementNum].value);
		});
		allItems()[lastElementNum].style.backgroundColor = 'orange';
	}
	function numberSemAdder(number) {
		number = number.toString().split('');
		if (number.length > 3) {
			for (let counter = number.length - 3; counter >= 1; counter = counter - 3) {
				number.splice(counter, 0, ',');
			}
			return number.join('');
		} else {
			return number;
		}
	}
	// function onHover

	// end
});
