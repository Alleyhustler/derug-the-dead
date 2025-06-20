document.querySelectorAll('[data-tooltip]').forEach(tooltip => {
    tooltip.addEventListener('mouseover', () => {
        const tooltip_element = document.createElement('div');
        tooltip_element.id = 'tooltip';
        tooltip_element.textContent = tooltip.getAttribute('data-tooltip');
        document.body.appendChild(tooltip_element);
        tooltip.addEventListener('mouseout', () => tooltip_element.remove());
    });

    tooltip.addEventListener('mousemove', e => {
        const tooltip_element = document.getElementById('tooltip');
        if (tooltip_element) {
            const rect = tooltip.getBoundingClientRect();
            const center_x = rect.left + rect.width / 2 + window.scrollX;
            const center_y = rect.top + rect.height / 2 + window.scrollY;

            if (e.pageX < center_x) {
                tooltip_element.style.left = `${e.pageX + 10}px`;
            } else {
                tooltip_element.style.left = `${e.pageX - tooltip_element.offsetWidth - 10}px`;
            }

            if (e.pageY < center_y) {
                tooltip_element.style.top = `${e.pageY + 10}px`;
            } else {
                tooltip_element.style.top = `${e.pageY - tooltip_element.offsetHeight - 10}px`;
            }
        }
    });
});
