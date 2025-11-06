// Clock and date update logic
function updateClock() {
    const now = new Date();
    let hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const time = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const weekday = now.toLocaleDateString([], { weekday: 'long' });
    const month = now.toLocaleDateString([], { month: 'long' });
    const day = now.getDate();
    const year = now.getFullYear();
    const date = `${weekday}, ${day} ${month}, ${year}`;
    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = date;
}
updateClock();
setInterval(updateClock, 1000);

// Background image upload logic
const uploadBtn = document.getElementById('bg-upload-btn');
const uploadInput = document.getElementById('bg-upload-input');
const defaultBg = "url('assets/background.png')";

// Helper to check if custom background is set
function isCustomBgSet() {
    return !!localStorage.getItem('customBg');
}

// Update button state (icon/title) based on background
function updateBtnState() {
    if (isCustomBgSet()) {
        uploadBtn.innerHTML = "&#10227;"; // Reset icon
        uploadBtn.title = "Reset to Default Background";
    } else {
        uploadBtn.innerHTML = "&#9881;"; // Upload icon
        uploadBtn.title = "Change Background";
    }
}

// Load background from localStorage if available
function loadCustomBackground() {
    const bgData = localStorage.getItem('customBg');
    if (bgData) {
        document.body.style.backgroundImage = `url(${bgData})`;
    } else {
        document.body.style.backgroundImage = defaultBg;
    }
    updateBtnState();
}
loadCustomBackground();

uploadBtn.addEventListener('click', () => {
    if (isCustomBgSet()) {
        // Reset to default
        localStorage.removeItem('customBg');
        document.body.style.backgroundImage = defaultBg;
        updateBtnState();
    } else {
        // Open upload dialog
        uploadInput.click();
    }
});

uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const dataUrl = evt.target.result;
        document.body.style.backgroundImage = `url(${dataUrl})`;
        localStorage.setItem('customBg', dataUrl);
        updateBtnState();
    };
    reader.readAsDataURL(file);
});