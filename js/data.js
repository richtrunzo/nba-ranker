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

var previousData = localStorage.getItem('profile-information');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('profile-information', dataJSON);
});
