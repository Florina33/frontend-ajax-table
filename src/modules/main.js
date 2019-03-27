import axios from 'axios';

let dataUtl = 'https://www.mocky.io/v2/55f748b33568195d044b3dc8';
let tableTemplate;
let surnameLimitLength = 6;

const userListAll = document.querySelector('.user-list-all');
const userListActive = document.querySelector('.user-list-active');
const userListAgeSorted = document.querySelector('.user-list-age-sorted');
const userListNameSorted = document.querySelector('.user-list-name-sorted');
const userListSurnameLimit = document.querySelector('.user-list-surname-sorted');


async function getUsers (requestUrl) {
	const response = await axios.get(requestUrl);

	return response.data;
}

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
	return element.name.last.length >= surnameLimitLength;
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

function renderTo (typeTable) {
	return function (element) {
		typeTable.insertAdjacentHTML('beforeEnd', element);
	};
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