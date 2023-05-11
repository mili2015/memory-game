let userCounter = parseInt(localStorage.getItem('user-counter')) || 0;

(function incrementUserCounter() {
    userCounter++;

    localStorage.setItem('user-counter', userCounter);

    document.getElementById('user-counter-div').textContent = userCounter;
})();

(function addListenerUserCounter() {
    let userCounterDiv = document.getElementById('user-counter-div');
    userCounterDiv.addEventListener('click', function() {
        userCounterDiv.style.opacity = 1;
    });
})();

document.addEventListener('contextmenu', event => event.preventDefault());
