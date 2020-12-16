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

var $myProfile = document.getElementById('my-profile');

var $view = document.querySelectorAll('.view');

// document.addEventListener('DOMContentLoaded', function (event) {
//   if (data.profile.username !== null) {
//     viewSwap(3);
//     $myProfile.appendChild(profileRender(data));
//   }
// });

$homeButtonI.addEventListener('click', function (event) {
  if (data.profile.username === null) {
    viewSwap(0);
  } else if (data.profile.username !== null) {
    viewSwap(4);
  }
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
  $myProfile.appendChild(profileRender(data));
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
