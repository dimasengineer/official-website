// semua.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Wrench Cursor Logic
    const customCursor = document.getElementById('custom-cursor');
    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                customCursor.style.left = `${e.clientX}px`;
                customCursor.style.top = `${e.clientY}px`;
            });
        });
        document.addEventListener('mousedown', () => {
            customCursor.classList.add('click-rotate');
            setTimeout(() => customCursor.classList.remove('click-rotate'), 400);
        });
    }

    // 2. Clock Update
    function updateClock() {
        const clockElement = document.getElementById('realtime-clock');
        if (!clockElement) return;

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        clockElement.textContent = `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`;
    }

    setInterval(updateClock, 1000);
    updateClock();
});