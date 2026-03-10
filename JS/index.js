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
            // Show wrench only on desktop
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

    // 2. Wrench Cursor Logic (Desktop Only)
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

    // 3. Real-time Clock & System Info
    function updateSystemInfo() {
        const now = new Date();
        
        // Bottom Tray Clock
        const trayClock = document.getElementById('tray-clock');
        const trayDate = document.getElementById('tray-date');
        if(trayClock) trayClock.innerText = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        if(trayDate) trayDate.innerText = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

        // Top Bar Clock
        const topClock = document.getElementById('current-date-time');
        if(topClock) {
            const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
            topClock.innerText = new Intl.DateTimeFormat('en-US', options).format(now);
        }

        // Device Detection Logic
        const ua = navigator.userAgent;
        let device = "Desktop PC";
        if (/Mobi|Android|iPhone|iPad/i.test(ua) || window.innerWidth <= 768) {
            device = "Mobile Device";
        }
        const deviceDisplay = document.getElementById('device-info');
        if(deviceDisplay) deviceDisplay.innerText = device;
    }

    setInterval(updateSystemInfo, 1000);
    updateSystemInfo();

    // 4. Browser Detection
    const ua = navigator.userAgent;
    let browser = "Others";
    if (ua.includes("Chrome")) browser = "Google Chrome";
    else if (ua.includes("Safari")) browser = "Apple Safari";
    else if (ua.includes("Firefox")) browser = "Mozilla Firefox";
    
    const browserDisplay = document.getElementById('browser-info');
    if(browserDisplay) browserDisplay.innerText = browser;

    // 5. IP Address API
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            const userIp = document.getElementById('user-ip');
            const ipDisplay = document.getElementById('ip-info-display');
            const flag = document.getElementById('flag-img');

            if(userIp) userIp.innerText = data.ip;
            if(ipDisplay) ipDisplay.innerText = `${data.ip} (${data.country_code})`;
            if(flag) {
                flag.src = `https://flagcdn.com/w40/${data.country_code.toLowerCase()}.png`;
                flag.style.display = 'inline-block';
            }
        })
        .catch(() => {
            const ipDisplay = document.getElementById('ip-info-display');
            if(ipDisplay) ipDisplay.innerText = "127.0.0.1 (Local)";
        });
});