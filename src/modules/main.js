import axios from 'axios';
import $ from 'jquery';

let UrlData = 'https://www.mocky.io/v2/55f748b33568195d044b3dc8';

let userListAll = $('.user-list-all');
let userListActive = $('.user-list-active');
let userListAgeSorted = $('.user-list-age-sorted');
let userListNameSorted = $('.user-list-name-sorted');
let userListSurnameLimit = $('.user-list-surname-sorted');
let tableTemplate;
let surnameLimitlength = 6;

function compareAge (personA, personB) {
	return personA.age - personB.age;
}

function compareName (first, second) {
	if (first.name.first > second.name.first) return 1;
	if (first.name.first < second.name.first) return -1;
	return 0;
}

function viewUsersList (dataJson, pathTable, isActiveOnly = 0, ageSort = 0, nameSort = 0, surnameLimit = 0) {

	tableTemplate = 0;

	if (ageSort) {
		dataJson.sort(compareAge);
	}
	if (nameSort) {
		dataJson.sort(compareName);
	}

	dataJson.forEach(function (item) {

		if (isActiveOnly && !item.isActive) {
			return true;
		}
		if (surnameLimit && item.name.last.length < surnameLimitlength) {
			return;
		}

		tableTemplate += `<tr>
			<td class="picture"><img src="${item.picture}" alt="${item.name.first} ${item.name.last}"/></td>
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
	});

	pathTable.append(tableTemplate);
}


function getAjaxTable (requestUrl) {

	axios.get(requestUrl)
	.then(function done (response) {

		viewUsersList(response.data, userListAll);
		viewUsersList(response.data, userListActive, 1);
		viewUsersList(response.data, userListAgeSorted, 0, 1);
		viewUsersList(response.data, userListNameSorted, 0, 0, 1);
		viewUsersList(response.data, userListSurnameLimit, 0, 0, 0, 1);

		return;
	})
	.catch(function (error) {
		console.log(error);
	});
}

getAjaxTable(UrlData);