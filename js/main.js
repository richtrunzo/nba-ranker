var $loginButton = document.querySelector('.login-btn');
var $signupButton = document.querySelector('.signup-btn');
var $loginForm = document.querySelector('.login-form');
var $signupForm = document.querySelector('.signup-form');
var $view = document.querySelectorAll('.view');

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
  viewSwap(3);
});

function viewSwap(view) {
  for (var i = 0; i < $view.length; i++) {
    $view[i].className = 'view hidden';
  }
  $view[view].className = 'view active';
}
