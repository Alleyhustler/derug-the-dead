let pathLinks
let info
const header = document.createElement('header');
// insert style into document
const style = document.createElement('style');
style.innerHTML = `header * {animation: none !important;}`
setTimeout(() => {
    document.head.appendChild(style);
}, 1000);


async function fetch_header() {
    try {
        const response = await fetch('/server/');
        const serverInfo = await response.json();
        const uptimeInMinutes = Math.round(serverInfo.uptime / 60);
        const uptimeInHours = Math.round(serverInfo.uptime / 3600);
        const uptimeInDays = Math.round(serverInfo.uptime / 86400);
        const base_info = `CPU: ${serverInfo.cpu}, MEM: ${serverInfo.memory}, `
        if (serverInfo.uptime > 86400) {
            info = base_info + `Uptime: ${uptimeInDays} day${uptimeInDays > 1 ? 's' : ''}`;
        } else if (serverInfo.uptime > 3600) {
            info = base_info + `Uptime: ${uptimeInHours} hour${uptimeInHours > 1 ? 's' : ''}`;
        } else {
            info = base_info + `Uptime: ${uptimeInMinutes} min${uptimeInMinutes > 1 ? 's' : ''}`;
        }

        header.innerHTML = `<header class="desktop"><p><a href="/">wren.zone</a>://<span>${pathLinks}</span>/</p><p>${info}</p></header>`;
    } catch (error) {
        console.error('Error fetching server info:', error);
        info = 'Error fetching server info';
    }
    console.log(info);
}

document.addEventListener('DOMContentLoaded', async () => {
    let path = window.location.pathname !== '/' ? window.location.pathname : '';
    const pathSegments = path.split('/').filter(segment => segment);
    pathLinks = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        return `<a href="${href}">${segment}</a>`;
    }).join('/');
    document.body.insertBefore(header, document.body.firstChild);
    await fetch_header();
    setInterval(await fetch_header, 1000);
});