/* exported data */
var data = {
  // profile: {
  //   name: null,
  //   email: null,
  //   username: null,
  //   password: null,
  //   team: null
  // },
  rankings: []
};

var searchResults = {
  search: {
    name: null,
    title: null,
    description: null,
    list: null,
    team: null
  },
  results: []
};

var stats = {
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

var previousData = localStorage.getItem('profile-information');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('profile-information', dataJSON);
});

var previousSearchData = localStorage.getItem('search-information');
if (previousSearchData !== null) {
  searchResults = JSON.parse(previousSearchData);
}

window.addEventListener('beforeunload', function (event) {
  var searchJSON = JSON.stringify(searchResults);
  localStorage.setItem('search-information', searchJSON);
});

var previousStatsData = localStorage.getItem('stats-information');
if (previousStatsData !== null) {
  stats = JSON.parse(previousStatsData);
}

window.addEventListener('beforeunload', function (event) {
  var statsJSON = JSON.stringify(stats);
  localStorage.setItem('stats-information', statsJSON);
});
