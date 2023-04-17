confetti1();

const logo = document.getElementById("logo-win");
let holdTimeout = null;
let isPressed = false;

logo.addEventListener("mousedown", () => {
  holdTimeout = setTimeout(startLogoRotation, 5000);
});

function startLogoRotation() {
  if(isPressed)
    return;

  isPressed = true;

  logo.classList.add('logo-3d');
  confetti1();
  confetti1();
  confetti1();
  confetti1();
  confetti1();
  confetti1();
}

function stopLogoRotation() {
  logo.classList.remove('logo-3d');
  isPressed = false;
}

window.addEventListener('load', function() {
  containerwin.style.opacity = 1;
});