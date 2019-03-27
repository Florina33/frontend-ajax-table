import axios from 'axios';
import $ from 'jquery';

let dataUtl = 'https://www.mocky.io/v2/55f748b33568195d044b3dc8';

let userListAll = $('.user-list-all');
let userListActive = $('.user-list-active');
let userListAgeSorted = $('.user-list-age-sorted');
let userListNameSorted = $('.user-list-name-sorted');
let userListSurnameLimit = $('.user-list-surname-sorted');
let tableTemplate;
let surnameLimitlength = 5;


function isActive (element) {
	return element.isActive;
}

function compareAge (personA, personB) {
	return personA.age - personB.age;
}

function compareName (personA, personB) {
	if (personA.name.first > personB.name.first) return 1;
	if (personA.name.first < personB.name.first) return -1;
	return 0;
}

function isLongSurname (element) {
	return element.name.last.length > surnameLimitlength;
}

function toRowHtml (item) {
	tableTemplate = `<tr>
			<td class="picture"><img src="${item.picture}" alt="User ${item.name.first} ${item.name.last}"/></td>
			<td class="name-last">${item.name.first} ${item.name.last}</td>
			<td class="is_active">${item.isActive}</td>
			<td class="about">${item.about.substring(0, 70)}...</td>
			<td class="balance">${item.balance}</td>
			<td class="age">${item.age}</td>
			<td class="registered">${item.registered}</td>
			<td class="company">${item.company}</td>
			<td class="email"><a href="mailto:${item.email}">${item.email}</a></td>
			<td class="phone"><a href="tel:${item.phone}">${item.phone}</a></td>
			<td class="address">${item.address}</td>
		</tr>`;

	return tableTemplate;
}

/*
insertAdjacentHTML() разбирает указанный текст как HTML или XML и вставляет полученные узлы (nodes) в DOM дерево в указанную позицию. Данная функция не переписывает имеющиеся элементы, что предовращает дополнительную сериализацию
и поэтому работает быстрее, чем манипуляции с innerHTML.
element.insertAdjacentHTML(position, text);
position указывает положение element, и может принимать одно из следующих значений:...
'beforeend' - Внутри element, после последнего дочернего элемента.
text -  строка, которая будет проанализирована как HTML или XML и вставлена в DOM дерево документа.
*/
function renderTo (typeTable) {
	return function (element) {
		typeTable.insertAdjacentHTML('beforeEnd', element);
	};
}


// async function getUsers () {
// 	const response = await axios.get('https://www.mocky.io/v2/55f748b33568195d044b3dc8');

// 	return response.data;
// }

function getUsers (requestUrl) {

	const response = axios.get(requestUrl);

	// .then(function done (response) {

	// 	return response.data;
	// })
	// .catch(function (error) {
	// 	console.log(error);
	// });

	return response.data;
}


getUsers(dataUtl).then(function (users) {
	users
		.map(toRowHtml)
		.forEach(renderTo(userListAll));

	users
		.filter(isActive)
		.map(toRowHtml)
		.forEach(renderTo(userListActive));

	users
		.concat()
		.sort(compareAge)
		.map(toRowHtml)
		.forEach(renderTo(userListAgeSorted));

	users
		.concat()
		.sort(compareName)
		.map(toRowHtml)
		.forEach(renderTo(userListNameSorted));

	users
		.filter(isLongSurname)
		.map(toRowHtml)
		.forEach(renderTo(userListSurnameLimit));

	return users;
}).catch(console.error);


/*
forEach
Метод «arr.forEach(callback[, thisArg])» используется для перебора массива.

Он для каждого элемента массива вызывает функцию callback.

Этой функции он передаёт три параметра callback(item, i, arr):

Метод forEach ничего не возвращает, его используют только для перебора, как более «элегантный» вариант, чем обычный цикл for.

filter
Метод «arr.filter(callback[, thisArg])» используется для фильтрации массива через функцию.
Он создаёт новый массив, в который войдут только те элементы arr, для которых вызов callback(item, i, arr) возвратит true.

map
Метод «arr.map(callback[, thisArg])» используется для трансформации массива.
Он создаёт новый массив, который будет состоять из результатов вызова callback(item, i, arr) для каждого элемента arr.

forEach – для перебора массива.
filter – для фильтрации массива.
every/some – для проверки массива.
map – для трансформации массива в массив.
reduce/reduceRight – для прохода по массиву с вычислением значения.

*/