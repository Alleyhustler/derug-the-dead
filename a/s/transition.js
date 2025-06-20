// sound function example
function sound(src) {
    const audio = new Audio(src);
    audio.play();
}

// play_fade function
function play_fade(direction) {
    const Transition = document.createElement('img');
    Transition.src = 'bg.gif';
    Transition.style.position = 'fixed'; // fixed for better overlay
    Transition.style.width = '100vw';
    Transition.style.height = '100vh';
    Transition.style.zIndex = '999999999';
    Transition.style.left = '0';
    Transition.style.top = '0';
    Transition.style.pointerEvents = 'none'; // so it doesn't block clicks
    Transition.style.animation = `fade-in 2s forwards`;
    document.body.appendChild(Transition);

    setTimeout(() => {
        Transition.remove();
    }, 2000);
}

// attach click handlers to all links on homepage
if (window.location.pathname === '/') {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            let LinkPath = event.currentTarget.href;

            if (event.target.tagName === 'IMG') {
                LinkPath = event.target.closest('a').href;
            }

            sound('/a/a/login.oga');
            play_fade('forwards');

            setTimeout(() => {
                window.location.href = LinkPath;
            }, 1700);
        });
    });
}
