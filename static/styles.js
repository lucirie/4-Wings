function goFullscreen() {
    if(document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    else if(document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(); // Chrome, will add support for other browsers later
    }
}

// After going fullscreen, redirect user to interval route
setTimeout(function() {
    window.location.href = '/interval';
}, 1000) // Wait 1 second to ensure user is in fullscreen
