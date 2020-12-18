/* exported data */
var data = {
  profile: {
    name: null,
    email: null,
    username: null,
    password: null,
    team: null
  },
  rankings: []
};

var searchResults = {
  search: {
    name: null,
    title: null,
    description: null,
    list: null
  },
  results: []
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
