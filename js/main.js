const $homeButtonI = document.querySelector('.header');
const $myProfileBtnHome = document.querySelector('.my-profile-btn-home');
const $createRankingButton = document.querySelector('.create-ranking-btn');
const $savedRankings = document.querySelector('.saved-rankings');
const $rankingSearchButton = document.querySelector('.ranking-search-btn');
const $rankingSearchInput = document.querySelector('.ranking-search');
const $searchResultsContainer = document.querySelector('.results-container');
const $createRankingListRender = document.querySelector('.list-render');
const $createRankingForm = document.querySelector('.create-ranking-form');
const $rankingTitle = document.querySelector('.ranking-title');
const $rankingDescription = document.querySelector('.ranking-description');
const $playerStatsButton = document.querySelector('.player-stats-btn');
const $statsSearchInput = document.querySelector('.stats-search-input');
const $statsSearchButton = document.querySelector('.stats-search-button');
const $appendStatsDiv = document.querySelector('.append-stats-container');
const $teamSearchInput = document.querySelector('.ranking-search-team');
const $teamSearchButton = document.querySelector('.ranking-search-btn-team');

const $view = document.querySelectorAll('.view');

document.addEventListener('DOMContentLoaded', () => { viewSwap(0); });

const xhrTwo = new XMLHttpRequest();

$statsSearchButton.addEventListener('click', event => {
  $appendStatsDiv.innerHTML = ' ';
  stats.name = $statsSearchInput.value;
  xhrTwo.open('GET', 'https://www.balldontlie.io/api/v1/players?search=' + stats.name);
  xhrTwo.responseType = 'json';
  xhrTwo.send();
});

xhrTwo.addEventListener('load', event => {
  if (xhrTwo.response.data[0] === undefined) {
    const $failedSearchResponse = document.createElement('div');
    $failedSearchResponse.setAttribute('class', 'failed-row text');
    const $failedSearchResponseText = document.createElement('p');
    $failedSearchResponseText.appendChild(document.createTextNode('Data not found'));
    const $failedSearchResponseTwo = document.createElement('div');
    $failedSearchResponseTwo.setAttribute('class', 'failed-row text');
    const $failedSearchResponseTextSecondLine = document.createElement('p');
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

const xhrThree = new XMLHttpRequest();

function statsCallBack() {
  const x = stats.id.toString();
  xhrThree.open('GET', 'https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=' + x);
  xhrThree.responseType = 'json';
  xhrThree.send();
}

xhrThree.addEventListener('load', event => {
  if (xhrThree.response.data[0] === undefined) {
    const $failedSearchResponse = document.createElement('div');
    $failedSearchResponse.setAttribute('class', 'failed-row text');
    const $failedSearchResponseText = document.createElement('p');
    $failedSearchResponseText.appendChild(document.createTextNode('Data not found'));
    const $failedSearchResponseTwo = document.createElement('div');
    $failedSearchResponseTwo.setAttribute('class', 'failed-row text');
    const $failedSearchResponseTextSecondLine = document.createElement('p');
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
  const $statsContainer = document.createElement('div');
  $statsContainer.setAttribute('class', 'append-stats');
  const $statsRowOne = document.createElement('p');
  $statsRowOne.setAttribute('class', 'row stats-row');
  $statsRowOne.appendChild(document.createTextNode(stats.name));
  $statsContainer.appendChild($statsRowOne);

  const $statsRowTwo = document.createElement('p');
  $statsRowTwo.setAttribute('class', 'row stats-row');
  $statsRowTwo.appendChild(document.createTextNode('POINTS:' + ' ' + stats.ppg.toString()));
  $statsContainer.appendChild($statsRowTwo);

  const $statsRowThree = document.createElement('p');
  $statsRowThree.setAttribute('class', 'row stats-row');
  $statsRowThree.appendChild(document.createTextNode('FG %:' + ' ' + stats.percent.toString()));
  $statsContainer.appendChild($statsRowThree);

  const $statsRowFour = document.createElement('p');
  $statsRowFour.setAttribute('class', 'row stats-row');
  $statsRowFour.appendChild(document.createTextNode('MINUTES:' + ' ' + stats.min));
  $statsContainer.appendChild($statsRowFour);

  const $statsRowFive = document.createElement('p');
  $statsRowFive.setAttribute('class', 'row stats-row');
  $statsRowFive.appendChild(document.createTextNode('REBOUNDS:' + ' ' + stats.reb.toString()));
  $statsContainer.appendChild($statsRowFive);

  const $statsRowSix = document.createElement('p');
  $statsRowSix.setAttribute('class', 'row stats-row');
  $statsRowSix.appendChild(document.createTextNode('ASSISTS:' + ' ' + stats.assist.toString()));
  $statsContainer.appendChild($statsRowSix);

  const $statsRowSeven = document.createElement('p');
  $statsRowSeven.setAttribute('class', 'row stats-row');
  $statsRowSeven.appendChild(document.createTextNode('STEALS:' + ' ' + stats.steal.toString()));
  $statsContainer.appendChild($statsRowSeven);

  const $statsRowEight = document.createElement('p');
  $statsRowEight.setAttribute('class', 'row stats-row');
  $statsRowEight.appendChild(document.createTextNode('BLOCKS:' + '    ' + stats.blocks.toString()));
  $statsContainer.appendChild($statsRowEight);

  const $statsRowNine = document.createElement('p');
  $statsRowNine.setAttribute('class', 'row stats-row');
  $statsRowNine.appendChild(document.createTextNode('TURNOVERS:' + ' ' + stats.turn.toString()));
  $statsContainer.appendChild($statsRowNine);

  return $statsContainer;
}

document.addEventListener('DOMContentLoaded', event => {
  if (data.rankings[0] === undefined) {
    $savedRankings.appendChild(noRankingRender());
  } else if (data.rankings[0] !== undefined) {
    $savedRankings.innerHTML = '';
    for (let i = 0; i < data.rankings.length; i++) {
      $view[3].appendChild(showRankingRender(i));
    }
  }
});

function noRankingRender() {
  const $containerDiv = document.createElement('div');
  $containerDiv.setAttribute('class', 'text no-rankings-row');
  const $noRankings = document.createElement('p');
  $noRankings.appendChild(document.createTextNode('You have no saved rankings. Click the header above and navigate to the create rankings tab to create your first ranking.'));
  $containerDiv.appendChild($noRankings);

  return $containerDiv;
}

function showRankingRender(index) {
  const $mainDiv = document.createElement('div');
  $mainDiv.setAttribute('class', 'myrankings-container row');
  const $containerDiv = document.createElement('div');
  $containerDiv.setAttribute('class', 'saved-ranking-container');
  const $savedTitle = document.createElement('h3');
  $savedTitle.setAttribute('class', 'row');
  $savedTitle.appendChild(document.createTextNode(data.rankings[index].title));
  const $savedDescription = document.createElement('p');
  $savedDescription.setAttribute('class', 'row');
  $savedDescription.appendChild(document.createTextNode(data.rankings[index].description));
  const $savedList = document.createRange();
  const $frag = $savedList.createContextualFragment(data.rankings[index].list);
  $containerDiv.appendChild($savedTitle);
  $containerDiv.appendChild($savedDescription);
  $containerDiv.appendChild($frag);
  $mainDiv.appendChild($containerDiv);
  return $mainDiv;
}

$createRankingForm.addEventListener('submit', event => {
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
  const $mainDiv = document.createElement('div');
  $mainDiv.setAttribute('class', 'myrankings-container row');
  const $containerDiv = document.createElement('div');
  $containerDiv.setAttribute('class', 'saved-ranking-container');
  const $savedTitle = document.createElement('h3');
  $savedTitle.setAttribute('class', 'row');
  $savedTitle.appendChild(document.createTextNode(searchResults.search.title));
  const $savedDescription = document.createElement('p');
  $savedDescription.setAttribute('class', 'row');
  $savedDescription.appendChild(document.createTextNode(searchResults.search.description));
  const $savedList = document.createRange();
  const $frag = $savedList.createContextualFragment(searchResults.search.list);
  $containerDiv.appendChild($savedTitle);
  $containerDiv.appendChild($savedDescription);
  $containerDiv.appendChild($frag);
  $mainDiv.appendChild($containerDiv);
  return $mainDiv;
}

let listNumber = 1;
let listNumberString = listNumber.toString();

$searchResultsContainer.addEventListener('click', event => {
  if ($searchResultsContainer.innerText === 'Data not found, click here to try your search again') {
    viewSwap(1);
  } else {
    const $playerDiv = document.createElement('div');
    const $playerText = document.createElement('p');
    $playerText.appendChild(document.createTextNode(listNumberString + '.'));
    $playerDiv.setAttribute('class', 'row text savelist');
    $playerText.setAttribute('class', 'text-two player-number');
    $playerDiv.appendChild($playerText);
    $playerDiv.appendChild(event.target);
    $createRankingListRender.appendChild($playerDiv);
    listNumber++;
    listNumberString = listNumber.toString();
    viewSwap(1);
  }
});

const xhrTeam = new XMLHttpRequest();

$teamSearchButton.addEventListener('click', event => {
  $searchResultsContainer.innerHTML = '';
  searchResults.search.team = $teamSearchInput.value;
  viewSwap(2);
  xhrTeam.open('GET', 'https://www.balldontlie.io/api/v1/teams');
  xhrTeam.responseType = 'json';
  xhrTeam.send();
  event.preventDefault();
});

xhrTeam.addEventListener('load', event => {
  for (let i = 0; i < xhrTeam.response.data.length; i++) {
    if (searchResults.search.team === xhrTeam.response.data[i].city || searchResults.search.team === xhrTeam.response.data[i].name || searchResults.search.team === xhrTeam.response.data[i].full_name || searchResults.search.team === xhrTeam.response.data[i].city.toLowerCase() || searchResults.search.team === xhrTeam.response.data[i].name.toLowerCase() || searchResults.search.team === xhrTeam.response.data[i].full_name.toLowerCase()) {
      $searchResultsContainer.appendChild(appendTeamSearch(i));
      return;
    }
  }
  $searchResultsContainer.appendChild(failedRankingRender());
});

function appendTeamSearch(index) {
  const $div = document.createElement('div');
  $div.setAttribute('class', 'row');
  const $text = document.createElement('p');
  $text.setAttribute('class', 'text search-result');
  $text.appendChild(document.createTextNode(xhrTeam.response.data[index].full_name));
  $div.appendChild($text);
  return $div;
}

const xhr = new XMLHttpRequest();

$rankingSearchButton.addEventListener('click', event => {
  $searchResultsContainer.innerHTML = '';
  searchResults.search.name = $rankingSearchInput.value;
  viewSwap(2);
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/players?search=' + searchResults.search.name);
  xhr.responseType = 'json';
  xhr.send();
  event.preventDefault();
});

xhr.addEventListener('load', event => {
  if (xhr.response.data[0] === undefined) {
    $searchResultsContainer.appendChild(failedRankingRender());
  } else {
    searchResults.results = [];
    searchResults.results.push(xhr.response);
    appendSearch();
  }
});

function appendSearch() {
  const arr = [];
  for (let i = 0; i < searchResults.results[0].data.length; i++) {
    const $div = document.createElement('div');
    $div.setAttribute('class', 'row');
    const $text = document.createElement('p');
    $text.setAttribute('class', 'text search-result');
    $text.appendChild(document.createTextNode(searchResults.results[0].data[i].first_name + ' ' + searchResults.results[0].data[i].last_name + ', ' + searchResults.results[0].data[i].team.name));
    $div.appendChild($text);
    arr.push($div);
  }
  for (let i = 0; i < arr.length; i++) {
    $searchResultsContainer.appendChild(arr[i]);
  }
}

function failedRankingRender() {
  const $failedContainer = document.createElement('div');
  $failedContainer.setAttribute('class', 'failed-container');
  const $failedSearchResponse = document.createElement('div');
  $failedSearchResponse.setAttribute('class', 'failed-row text');
  const $failedSearchResponseText = document.createElement('p');
  $failedSearchResponseText.appendChild(document.createTextNode('Data not found, click here to try your search again'));
  $failedSearchResponse.appendChild($failedSearchResponseText);
  $failedContainer.appendChild($failedSearchResponse);

  return $failedContainer;
}

$playerStatsButton.addEventListener('click', event => {
  viewSwap(4);
});

$createRankingButton.addEventListener('click', event => {
  viewSwap(1);
});

$myProfileBtnHome.addEventListener('click', event => {
  viewSwap(3);
});

$homeButtonI.addEventListener('click', event => {
  viewSwap(0);
  searchResults.results = [];
  $searchResultsContainer.innerHTML = '';
  $createRankingListRender.innerHTML = '';
  listNumber = 1;
  listNumberString = listNumber.toString();
  $appendStatsDiv.innerHTML = '';
});

function viewSwap(view) {
  for (let i = 0; i < $view.length; i++) {
    $view[i].className = 'view hidden';
  }
  $view[view].className = 'view active';
}
