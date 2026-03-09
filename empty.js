// empty.js
document.addEventListener('DOMContentLoaded', () => {
    const customCursor = document.getElementById('custom-cursor');

    // Pergerakan kursor
    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                customCursor.style.left = `${e.clientX}px`;
                customCursor.style.top = `${e.clientY}px`;
            });
        });

        // Efek rotasi saat klik
        document.addEventListener('mousedown', () => {
            customCursor.classList.add('click-rotate');
            setTimeout(() => {
                customCursor.classList.remove('click-rotate');
            }, 400);
        });
    }
});