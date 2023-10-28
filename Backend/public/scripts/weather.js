async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    window.location.href = `http://localhost:1234/weather?city=${cityInput}`;
    return;
}