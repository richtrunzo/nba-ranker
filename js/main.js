var $loginButton = document.querySelector('.login-btn');
var $signupButton = document.querySelector('.signup-btn');

var $loginForm = document.querySelector('.login-form');

var $signupForm = document.querySelector('.signup-form');
var $signupName = document.querySelector('.signup-name');
var $signupEmail = document.querySelector('.signup-email');
var $signupUsername = document.querySelector('.signup-username');
var $signupPassword = document.querySelector('.signup-password');
var $signupTeam = document.querySelector('.signup-team');

var $homeButtonI = document.querySelector('i');
var $myProfileBtnHome = document.querySelector('.my-profile-btn-home');
var $myProfileContainer = document.querySelector('.myprofile-container');
var $createRankingButton = document.querySelector('.create-ranking-btn');
var $rankingSearchButton = document.querySelector('.ranking-search-btn');
var $rankingSearchInput = document.querySelector('.ranking-search');
var $searchResultsContainer = document.querySelector('.results-container');
var $createRankingListRender = document.querySelector('.list-render');

var $myRankingsButton = document.querySelectorAll('.my-rankings-button');
var $myProfileButton = document.querySelectorAll('.my-profile-btn');
var $rankingSubmitButton = document.querySelector('.ranking-submit-btn');
var $createRankingForm = document.querySelector('.create-ranking-form');
var $rankingTitle = document.querySelector('.ranking-title');
var $rankingDescription = document.querySelector('.ranking-description');
var $myRankingsContainer = document.querySelector('.myrankings-container');

var $view = document.querySelectorAll('.view');

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.profile.username !== null) {
    viewSwap(3);
    $myProfileContainer.innerHTML = '';
    $view[3].appendChild(profileRender(data));
  }
});

$createRankingForm.addEventListener('submit', function (event) {
  searchResults.search.title = $rankingTitle.value;
  searchResults.search.description = $rankingDescription.value;
  data.rankings.push($createRankingListRender.innerHTML);
  $view[7].appendChild(saveRankingRender(searchResults));
  viewSwap(7);
  event.preventDefault();
});

function saveRankingRender() {
  var $mainDiv = document.createElement('div');
  $mainDiv.setAttribute('class', 'myrankings-container row');
  var $containerDiv = document.createElement('div');
  $containerDiv.setAttribute('class', 'saved-ranking-container');
  var $savedTitle = document.createElement('h3');
  $savedTitle.setAttribute('class', 'row');
  $savedTitle.appendChild(document.createTextNode(searchResults.search.title));
  var $savedDescription = document.createElement('p');
  $savedDescription.setAttribute('class', 'row');
  $savedDescription.appendChild(document.createTextNode(searchResults.search.description));
  $containerDiv.appendChild($savedTitle);
  $containerDiv.appendChild($savedDescription);
  $mainDiv.appendChild($containerDiv);
  return $mainDiv;
}

var listNumber = 1;
var listNumberString = listNumber.toString();

$searchResultsContainer.addEventListener('click', function (event) {
  var $playerDiv = document.createElement('div');
  var $playerText = document.createElement('p');
  $playerText.appendChild(document.createTextNode(listNumberString + '.'));
  $playerDiv.setAttribute('class', 'row text');
  $playerText.setAttribute('class', 'text-two player-number');
  $playerDiv.appendChild($playerText);
  $playerDiv.appendChild(event.target);
  $createRankingListRender.appendChild($playerDiv);
  listNumber++;
  listNumberString = listNumber.toString();
  viewSwap(5);
});

var xhr = new XMLHttpRequest();

$rankingSearchButton.addEventListener('click', function (event) {
  $searchResultsContainer.innerHTML = '';
  searchResults.search.name = $rankingSearchInput.value;
  viewSwap(6);
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/players?search=' + searchResults.search.name);
  xhr.responseType = 'json';
  xhr.send();
  event.preventDefault();
});

xhr.addEventListener('load', function (event) {
  searchResults.results = [];
  searchResults.results.push(xhr.response);
  appendSearch();
});

function appendSearch() {
  var arr = [];
  for (var i = 0; i < searchResults.results[0].data.length; i++) {
    var $div = document.createElement('div');
    $div.setAttribute('class', 'row');
    var $text = document.createElement('p');
    $text.setAttribute('class', 'text search-result');
    $text.appendChild(document.createTextNode(searchResults.results[0].data[i].first_name + ' ' + searchResults.results[0].data[i].last_name + ', ' + searchResults.results[0].data[i].team.name));
    $div.appendChild($text);
    arr.push($div);
  }
  for (var i = 0; i < arr.length; i++) {
    $searchResultsContainer.appendChild(arr[i]);
  }
}

$myProfileButton[1].addEventListener('click', function (event) {
  viewSwap(3);
});

$myRankingsButton[0].addEventListener('click', function (event) {
  viewSwap(7);
});

$createRankingButton.addEventListener('click', function (event) {
  viewSwap(5);
});

$myProfileBtnHome.addEventListener('click', function (event) {
  viewSwap(3);
});

$homeButtonI.addEventListener('click', function (event) {
  if (data.profile.username === null) {
    viewSwap(0);
  } else if (data.profile.username !== null) {
    viewSwap(4);
  }
  searchResults.results = [];
  $searchResultsContainer.innerHTML = '';
  $createRankingListRender.innerHTML = '';
  listNumber = 1;
  listNumberString = listNumber.toString();
});

$loginButton.addEventListener('click', function (event) {
  viewSwap(1);
});

$signupButton.addEventListener('click', function (event) {
  viewSwap(2);
});

$loginForm.addEventListener('submit', function (event) {
  viewSwap(3);
});

$signupForm.addEventListener('submit', function (event) {
  data.profile.name = $signupName.value;
  data.profile.email = $signupEmail.value;
  data.profile.username = $signupUsername.value;
  data.profile.password = $signupPassword.value;
  data.profile.team = $signupTeam.value;
  viewSwap(3);
  event.preventDefault();
  $myProfileContainer.appendChild(profileRender(data));
});

function viewSwap(view) {
  for (var i = 0; i < $view.length; i++) {
    $view[i].className = 'view hidden';
  }
  $view[view].className = 'view active';
}

function profileRender() {
  var $container = document.createElement('div');

  var $divOne = document.createElement('div');
  $divOne.setAttribute('class', 'row-profile');
  var $name = document.createElement('h3');
  $name.appendChild(document.createTextNode('NAME:' + '   ' + data.profile.name));
  $divOne.appendChild($name);

  var $divTwo = document.createElement('div');
  $divTwo.setAttribute('class', 'row-profile');
  var $userName = document.createElement('h3');
  $userName.appendChild(document.createTextNode('USERNAME:' + '   ' + data.profile.username));
  $divTwo.appendChild($userName);

  var $divThree = document.createElement('div');
  $divThree.setAttribute('class', 'row-profile');
  var $email = document.createElement('h3');
  $email.appendChild(document.createTextNode('EMAIL:' + '   ' + data.profile.email));
  $divThree.appendChild($email);

  var $divFour = document.createElement('div');
  $divFour.setAttribute('class', 'row-profile');
  var $team = document.createElement('h3');
  $team.appendChild(document.createTextNode('TEAM:' + '   ' + data.profile.team));
  $divFour.appendChild($team);

  $container.appendChild($divOne);
  $container.appendChild($divTwo);
  $container.appendChild($divThree);
  $container.appendChild($divFour);

  return $container;
}
