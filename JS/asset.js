// Live Clock implementation
function startClock() {
    const clockElement = document.getElementById('live-clock');
    
    function update() {
        const now = new Date();
        clockElement.innerText = now.toLocaleTimeString();
    }
    
    setInterval(update, 1000);
    update();
}

// Simple Log interaction
console.log("%c SYSTEM ERROR: 404 - Resource Not Found", "color: red; font-size: 20px; font-weight: bold;");
console.log("Check your URL or contact system admin.");

// Initialize
startClock();