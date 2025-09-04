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

// Load background from localStorage if available
function loadCustomBackground() {
    const bgData = localStorage.getItem('customBg');
    if (bgData) {
        document.body.style.backgroundImage = `url(${bgData})`;
    }
}
loadCustomBackground();

uploadBtn.addEventListener('click', () => {
    uploadInput.click();
});

uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const dataUrl = evt.target.result;
        document.body.style.backgroundImage = `url(${dataUrl})`;
        localStorage.setItem('customBg', dataUrl);
    };
    reader.readAsDataURL(file);
});