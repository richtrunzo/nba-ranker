/* exported data */
let data = {
  rankings: []
};

let searchResults = {
  search: {
    name: null,
    title: null,
    description: null,
    list: null,
    team: null
  },
  results: []
};

let stats = {
  name: null,
  id: null,
  ppg: null,
  percent: null,
  min: null,
  reb: null,
  assist: null,
  steal: null,
  blocks: null,
  turn: null
};

const previousData = localStorage.getItem('profile-information');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', event => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('profile-information', dataJSON);
});

const previousSearchData = localStorage.getItem('search-information');
if (previousSearchData !== null) {
  searchResults = JSON.parse(previousSearchData);
}

window.addEventListener('beforeunload', event => {
  const searchJSON = JSON.stringify(searchResults);
  localStorage.setItem('search-information', searchJSON);
});

const previousStatsData = localStorage.getItem('stats-information');
if (previousStatsData !== null) {
  stats = JSON.parse(previousStatsData);
}

window.addEventListener('beforeunload', event => {
  const statsJSON = JSON.stringify(stats);
  localStorage.setItem('stats-information', statsJSON);
});
