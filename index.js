document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Logic
    const loader = document.getElementById('loader');
    const percentElem = document.getElementById('percent');
    const barElem = document.getElementById('progress-bar');
    let width = 0;

    const loadInt = setInterval(() => {
        if (width >= 100) {
            clearInterval(loadInt);
            loader.style.display = 'none';
            const customCursor = document.getElementById('custom-cursor');
            if(customCursor && window.matchMedia("(hover: hover)").matches) {
                customCursor.style.opacity = '1';
            }
        } else {
            width += Math.floor(Math.random() * 8) + 2;
            if (width > 100) width = 100;
            percentElem.innerText = width;
            barElem.style.width = width + '%';
        }
    }, 40);

    // 2. Wrench Cursor
    const customCursor = document.getElementById('custom-cursor');
    if (customCursor && window.matchMedia("(hover: hover)").matches) {
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

    // 3. Real-time Clock (English Format)
    function updateClock() {
        const now = new Date();
        
        const trayClock = document.getElementById('tray-clock');
        const trayDate = document.getElementById('tray-date');
        if(trayClock) trayClock.innerText = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        if(trayDate) trayDate.innerText = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

        const topClock = document.getElementById('current-date-time');
        if(topClock) {
            const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            topClock.innerText = new Intl.DateTimeFormat('en-US', options).format(now);
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 4. Device & Browser Detection (English)
    const ua = navigator.userAgent;
    let browser = "Others";
    if (ua.includes("Chrome")) browser = "Google Chrome";
    else if (ua.includes("Safari")) browser = "Apple Safari";
    else if (ua.includes("Firefox")) browser = "Mozilla Firefox";

    let device = "Desktop PC";
    if (window.innerWidth <= 768 || /Mobi|Android/i.test(ua)) device = "Mobile Device";

    document.getElementById('browser-info').innerText = browser;
    document.getElementById('device-info').innerText = device;

    // 5. IP API (English)
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            document.getElementById('user-ip').innerText = data.ip;
            document.getElementById('ip-info-display').innerText = `${data.ip} (${data.country_name})`;
            const flag = document.getElementById('flag-img');
            flag.src = `https://flagcdn.com/w40/${data.country_code.toLowerCase()}.png`;
            flag.style.display = 'inline-block';
        })
        .catch(() => {
            document.getElementById('user-ip').innerText = "Local IP";
            document.getElementById('ip-info-display').innerText = "127.0.0.1 (Offline)";
        });
});