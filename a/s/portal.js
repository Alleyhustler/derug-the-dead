// variables

const portals = document.querySelector('.portals');
const popup = document.getElementById('popup')
// we start after the bumper
var position = 1;
var scrolling = false

// functions

function portal_scroll() {
    // logic to avoid bumpers
    if (position == 0) {
        position = portals.children.length - 2
    } else if (position == portals.children.length - 1) {
        position = 1
    }
    // find the middle of the element
    const element = portals.children[position];
    const elementRect = element.getBoundingClientRect();
    const absoluteElementLeft = elementRect.left + portals.scrollLeft;
    const middle = absoluteElementLeft - (portals.clientWidth / 2) + (elementRect.width / 2);
    // scroll
    portals.scrollTo({
        left: middle,
        behavior: 'smooth'
    });
}

function open_popup(node) {
    sound('/a/a/notif.oga')
    popup.querySelector('h1').innerText = `CONNECT TO ${node.getAttribute('data-tooltip')}?`
    popup.classList.toggle('hidden')
    popup.querySelector('a').href = node.href
}

// events

portals.addEventListener('wheel', (e) => {
    // scroll to next child in portals after position
    if (scrolling) { return } else { scrolling = true }
    if (e.deltaY > 0) {
        position = (position + 1) % portals.children.length;
    } else {
        position = (position - 1 + portals.children.length) % portals.children.length;
    }
    portal_scroll();
    setTimeout(() => {
        scrolling = false
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    const portals = document.querySelectorAll('.portals');
    portals.forEach((portal, index) => {
        add_arrows(portal)
        const portal_nodes = Array.from(portal.children);
        const bumper = document.createElement('div');
        const bumper2 = document.createElement('div');
        portal.insertBefore(bumper, portal.firstChild);
        portal.appendChild(bumper2);
        // for every portal node, popup first
        portal_nodes.forEach((node) => {
            node.addEventListener('click', (e) => {
                e.preventDefault()
                open_popup(node)
            });
        })
        // scroll once dom is loaded
        portal_scroll();
    });
});

// add mobile arrows for scrolling
function add_arrows(portal) {
    const arrow_left = document.createElement('div');
    const arrow_right = document.createElement('div');
    arrow_left.classList.add('arrow-left');
    arrow_right.classList.add('arrow-right');
    document.body.appendChild(arrow_left);
    document.body.appendChild(arrow_right);
    arrow_left.textContent = '<'
    arrow_right.textContent = '>'
    arrow_left.addEventListener('click', () => {
        position = (position - 1 + portal.children.length) % portal.children.length;
        portal_scroll();
    });
    arrow_right.addEventListener('click', () => {
        position = (position + 1) % portal.children.length;
        portal_scroll();
    });
}