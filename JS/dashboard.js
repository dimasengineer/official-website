// CONFIGURATION - Gunakan Key yang sama dengan login.js
const SUPABASE_URL = 'https://oaodsirjadhyomxstntc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kNoiWk5WAh0TykXVydSkjA_w4QXmTOw';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 1. SECURITY GUARD (Proteksi Halaman)
async function checkUser() {
    const { data: { user }, error } = await supabaseClient.auth.getUser();

    if (error || !user) {
        // Jika tidak ada user login, tendang ke login.html
        window.location.href = "login.html";
    } else {
        // Jika ada, tampilkan datanya
        document.getElementById('user-display').innerText = user.email.split('@')[0].toUpperCase();
        document.getElementById('user-email').innerText = user.email;
    }
}

// Jalankan pengecekan saat halaman dimuat
checkUser();

// 2. LIVE CLOCK
function updateClock() {
    const now = new Date();
    document.getElementById('live-clock').innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// 3. LOGOUT FUNCTION
async function handleLogout() {
    await supabaseClient.auth.signOut();
    window.location.href = "index.html";
}