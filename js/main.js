var $homeButtonI = document.querySelector('.header');
var $myProfileBtnHome = document.querySelector('.my-profile-btn-home');
var $createRankingButton = document.querySelector('.create-ranking-btn');
var $savedRankings = document.querySelector('.saved-rankings');
var $rankingSearchButton = document.querySelector('.ranking-search-btn');
var $rankingSearchInput = document.querySelector('.ranking-search');
var $searchResultsContainer = document.querySelector('.results-container');
var $createRankingListRender = document.querySelector('.list-render');
var $createRankingForm = document.querySelector('.create-ranking-form');
var $rankingTitle = document.querySelector('.ranking-title');
var $rankingDescription = document.querySelector('.ranking-description');
var $playerStatsButton = document.querySelector('.player-stats-btn');
var $statsSearchInput = document.querySelector('.stats-search-input');
var $statsSearchButton = document.querySelector('.stats-search-button');
var $appendStatsDiv = document.querySelector('.append-stats-container');
var $teamSearchInput = document.querySelector('.ranking-search-team');
var $teamSearchButton = document.querySelector('.ranking-search-btn-team');

var $view = document.querySelectorAll('.view');

document.addEventListener('DOMContentLoaded', function (event) {
  viewSwap(0);
});

var xhrTwo = new XMLHttpRequest();

$statsSearchButton.addEventListener('click', function (event) {
  $appendStatsDiv.innerHTML = ' ';
  stats.name = $statsSearchInput.value;
  xhrTwo.open('GET', 'https://www.balldontlie.io/api/v1/players?search=' + stats.name);
  xhrTwo.responseType = 'json';
  xhrTwo.send();
});

xhrTwo.addEventListener('load', function (event) {
  if (xhrTwo.response.data[0] === undefined) {
    var $failedSearchResponse = document.createElement('div');
    $failedSearchResponse.setAttribute('class', 'failed-row text');
    var $failedSearchResponseText = document.createElement('p');
    $failedSearchResponseText.appendChild(document.createTextNode('Data not found'));
    var $failedSearchResponseTwo = document.createElement('div');
    $failedSearchResponseTwo.setAttribute('class', 'failed-row text');
    var $failedSearchResponseTextSecondLine = document.createElement('p');
    $failedSearchResponseTextSecondLine.appendChild(document.createTextNode('Please search for a current NBA player'));
    $failedSearchResponse.appendChild($failedSearchResponseText);
    $failedSearchResponseTwo.appendChild($failedSearchResponseTextSecondLine);
    $appendStatsDiv.appendChild($failedSearchResponse);
    $appendStatsDiv.appendChild($failedSearchResponseTwo);
  } else {
    stats.id = xhrTwo.response.data[0].id;
    x = stats.id.toString();
    statsCallBack();
  }
});

var xhrThree = new XMLHttpRequest();

function statsCallBack() {
  var x = stats.id.toString();
  xhrThree.open('GET', 'https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=' + x);
  xhrThree.responseType = 'json';
  xhrThree.send();
}

xhrThree.addEventListener('load', function (event) {
  if (xhrThree.response.data[0] === undefined) {
    var $failedSearchResponse = document.createElement('div');
    $failedSearchResponse.setAttribute('class', 'failed-row text');
    var $failedSearchResponseText = document.createElement('p');
    $failedSearchResponseText.appendChild(document.createTextNode('Data not found'));
    var $failedSearchResponseTwo = document.createElement('div');
    $failedSearchResponseTwo.setAttribute('class', 'failed-row text');
    var $failedSearchResponseTextSecondLine = document.createElement('p');
    $failedSearchResponseTextSecondLine.appendChild(document.createTextNode('Please search for a current NBA player'));
    $failedSearchResponse.appendChild($failedSearchResponseText);
    $failedSearchResponseTwo.appendChild($failedSearchResponseTextSecondLine);
    $appendStatsDiv.appendChild($failedSearchResponse);
    $appendStatsDiv.appendChild($failedSearchResponseTwo);
  } else {
    stats.ppg = xhrThree.response.data[0].pts;
    stats.percent = xhrThree.response.data[0].fg_pct;
    stats.min = xhrThree.response.data[0].min;
    stats.reb = xhrThree.response.data[0].reb;
    stats.assist = xhrThree.response.data[0].ast;
    stats.steal = xhrThree.response.data[0].stl;
    stats.blocks = xhrThree.response.data[0].blk;
    stats.turn = xhrThree.response.data[0].turnover;
    $appendStatsDiv.appendChild(statsRender(stats));
  }
});

function statsRender() {
  var $statsContainer = document.createElement('div');
  $statsContainer.setAttribute('class', 'append-stats');
  var $statsRowOne = document.createElement('p');
  $statsRowOne.setAttribute('class', 'row stats-row');
  $statsRowOne.appendChild(document.createTextNode(stats.name));
  $statsContainer.appendChild($statsRowOne);

  var $statsRowTwo = document.createElement('p');
  $statsRowTwo.setAttribute('class', 'row stats-row');
  $statsRowTwo.appendChild(document.createTextNode('POINTS:' + ' ' + stats.ppg.toString()));
  $statsContainer.appendChild($statsRowTwo);

  var $statsRowThree = document.createElement('p');
  $statsRowThree.setAttribute('class', 'row stats-row');
  $statsRowThree.appendChild(document.createTextNode('FG %:' + ' ' + stats.percent.toString()));
  $statsContainer.appendChild($statsRowThree);

  var $statsRowFour = document.createElement('p');
  $statsRowFour.setAttribute('class', 'row stats-row');
  $statsRowFour.appendChild(document.createTextNode('MINUTES:' + ' ' + stats.min));
  $statsContainer.appendChild($statsRowFour);

  var $statsRowFive = document.createElement('p');
  $statsRowFive.setAttribute('class', 'row stats-row');
  $statsRowFive.appendChild(document.createTextNode('REBOUNDS:' + ' ' + stats.reb.toString()));
  $statsContainer.appendChild($statsRowFive);

  var $statsRowSix = document.createElement('p');
  $statsRowSix.setAttribute('class', 'row stats-row');
  $statsRowSix.appendChild(document.createTextNode('ASSISTS:' + ' ' + stats.assist.toString()));
  $statsContainer.appendChild($statsRowSix);

  var $statsRowSeven = document.createElement('p');
  $statsRowSeven.setAttribute('class', 'row stats-row');
  $statsRowSeven.appendChild(document.createTextNode('STEALS:' + ' ' + stats.steal.toString()));
  $statsContainer.appendChild($statsRowSeven);

  var $statsRowEight = document.createElement('p');
  $statsRowEight.setAttribute('class', 'row stats-row');
  $statsRowEight.appendChild(document.createTextNode('BLOCKS:' + '    ' + stats.blocks.toString()));
  $statsContainer.appendChild($statsRowEight);

  var $statsRowNine = document.createElement('p');
  $statsRowNine.setAttribute('class', 'row stats-row');
  $statsRowNine.appendChild(document.createTextNode('TURNOVERS:' + ' ' + stats.turn.toString()));
  $statsContainer.appendChild($statsRowNine);

  return $statsContainer;
}

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.rankings[0] === undefined) {
    $savedRankings.appendChild(noRankingRender());
  } else if (data.rankings[0] !== undefined) {
    $savedRankings.innerHTML = '';
    for (var i = 0; i < data.rankings.length; i++) {
      $view[3].appendChild(showRankingRender(i));
    }
  }
});

function noRankingRender() {
  var $containerDiv = document.createElement('div');
  $containerDiv.setAttribute('class', 'text no-rankings-row');
  var $noRankings = document.createElement('p');
  $noRankings.appendChild(document.createTextNode('You have no saved rankings. Click the header above and navigate to the create rankings tab to create your first ranking.'));
  $containerDiv.appendChild($noRankings);

  return $containerDiv;
}

function showRankingRender(index) {
  var $mainDiv = document.createElement('div');
  $mainDiv.setAttribute('class', 'myrankings-container row');
  var $containerDiv = document.createElement('div');
  $containerDiv.setAttribute('class', 'saved-ranking-container');
  var $savedTitle = document.createElement('h3');
  $savedTitle.setAttribute('class', 'row');
  $savedTitle.appendChild(document.createTextNode(data.rankings[index].title));
  var $savedDescription = document.createElement('p');
  $savedDescription.setAttribute('class', 'row');
  $savedDescription.appendChild(document.createTextNode(data.rankings[index].description));
  var $savedList = document.createRange();
  var $frag = $savedList.createContextualFragment(data.rankings[index].list);
  $containerDiv.appendChild($savedTitle);
  $containerDiv.appendChild($savedDescription);
  $containerDiv.appendChild($frag);
  $mainDiv.appendChild($containerDiv);
  return $mainDiv;
}

$createRankingForm.addEventListener('submit', function (event) {
  $savedRankings.innerHTML = '';
  searchResults.search.title = $rankingTitle.value;
  searchResults.search.description = $rankingDescription.value;
  searchResults.search.list = $createRankingListRender.innerHTML;
  data.rankings.push(searchResults.search);
  event.preventDefault();
  $view[3].appendChild(saveRankingRender(searchResults));
  viewSwap(3);
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
  var $savedList = document.createRange();
  var $frag = $savedList.createContextualFragment(searchResults.search.list);
  $containerDiv.appendChild($savedTitle);
  $containerDiv.appendChild($savedDescription);
  $containerDiv.appendChild($frag);
  $mainDiv.appendChild($containerDiv);
  return $mainDiv;
}

var listNumber = 1;
var listNumberString = listNumber.toString();

$searchResultsContainer.addEventListener('click', function (event) {
  if ($searchResultsContainer.innerText === 'Data not found, click here to try your search again') {
    viewSwap(1);
  } else {
    var $playerDiv = document.createElement('div');
    var $playerText = document.createElement('p');
    $playerText.appendChild(document.createTextNode(listNumberString + '.'));
    $playerDiv.setAttribute('class', 'row text savelist');
    $playerText.setAttribute('class', 'text-two player-number');
    $playerDiv.appendChild($playerText);
    $playerDiv.appendChild(event.target);
    $createRankingListRender.appendChild($playerDiv);
    listNumber++;
    listNumberString = listNumber.toString();
    viewSwap(1);
    $createRankingForm.reset();
  }
});

var xhrTeam = new XMLHttpRequest();

$teamSearchButton.addEventListener('click', function (event) {
  $searchResultsContainer.innerHTML = '';
  searchResults.search.team = $teamSearchInput.value;
  viewSwap(2);
  xhrTeam.open('GET', 'https://www.balldontlie.io/api/v1/teams');
  xhrTeam.responseType = 'json';
  xhrTeam.send();
  event.preventDefault();
});

xhrTeam.addEventListener('load', function (event) {
  for (var i = 0; i < xhrTeam.response.data.length; i++) {
    if (searchResults.search.team === xhrTeam.response.data[i].city || searchResults.search.team === xhrTeam.response.data[i].name || searchResults.search.team === xhrTeam.response.data[i].full_name || searchResults.search.team === xhrTeam.response.data[i].city.toLowerCase() || searchResults.search.team === xhrTeam.response.data[i].name.toLowerCase() || searchResults.search.team === xhrTeam.response.data[i].full_name.toLowerCase()) {
      $searchResultsContainer.appendChild(appendTeamSearch(i));
      return;
    }
  }
  $searchResultsContainer.appendChild(failedRankingRender());
});

function appendTeamSearch(index) {
  var $div = document.createElement('div');
  $div.setAttribute('class', 'row');
  var $text = document.createElement('p');
  $text.setAttribute('class', 'text search-result');
  $text.appendChild(document.createTextNode(xhrTeam.response.data[index].full_name));
  $div.appendChild($text);
  return $div;
}

var xhr = new XMLHttpRequest();

$rankingSearchButton.addEventListener('click', function (event) {
  $searchResultsContainer.innerHTML = '';
  searchResults.search.name = $rankingSearchInput.value;
  viewSwap(2);
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/players?search=' + searchResults.search.name);
  xhr.responseType = 'json';
  xhr.send();
  event.preventDefault();
});

xhr.addEventListener('load', function (event) {
  if (xhr.response.data[0] === undefined) {
    $searchResultsContainer.appendChild(failedRankingRender());
  } else {
    searchResults.results = [];
    searchResults.results.push(xhr.response);
    appendSearch();
  }
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

function failedRankingRender() {
  var $failedContainer = document.createElement('div');
  $failedContainer.setAttribute('class', 'failed-container');
  var $failedSearchResponse = document.createElement('div');
  $failedSearchResponse.setAttribute('class', 'failed-row text');
  var $failedSearchResponseText = document.createElement('p');
  $failedSearchResponseText.appendChild(document.createTextNode('Data not found, click here to try your search again'));
  $failedSearchResponse.appendChild($failedSearchResponseText);
  $failedContainer.appendChild($failedSearchResponse);

  return $failedContainer;
}

$playerStatsButton.addEventListener('click', function (event) {
  viewSwap(4);
});

$createRankingButton.addEventListener('click', function (event) {
  viewSwap(1);
});

$myProfileBtnHome.addEventListener('click', function (event) {
  viewSwap(3);
});

$homeButtonI.addEventListener('click', function (event) {
  viewSwap(0);
  searchResults.results = [];
  $searchResultsContainer.innerHTML = '';
  $createRankingListRender.innerHTML = '';
  listNumber = 1;
  listNumberString = listNumber.toString();
  $appendStatsDiv.innerHTML = '';
});

function viewSwap(view) {
  for (var i = 0; i < $view.length; i++) {
    $view[i].className = 'view hidden';
  }
  $view[view].className = 'view active';
}
