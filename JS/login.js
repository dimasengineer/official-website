// CONFIGURATION - GANTI DENGAN DATA SUPABASE KAMU
const SUPABASE_URL = 'https://oaodsirjadhyomxstntc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kNoiWk5WAh0TykXVydSkjA_w4QXmTOw';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Clock Function
function updateClock() {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ":" + 
                    now.getMinutes().toString().padStart(2, '0') + ":" + 
                    now.getSeconds().toString().padStart(2, '0');
    document.getElementById('digital-clock').innerText = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// Login Function
const loginBtn = document.getElementById('loginBtn');
const consoleMsg = document.getElementById('console-msg');

loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    consoleMsg.innerText = "> AUTHENTICATING...";

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        consoleMsg.innerText = "> ERROR: ACCESS_DENIED (" + error.message.toUpperCase() + ")";
        consoleMsg.style.color = "#ff4444";
    } else {
        consoleMsg.innerText = "> ACCESS_GRANTED. WELCOME USER.";
        consoleMsg.style.color = "#00ff41";
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);
    }
});