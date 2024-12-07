setTimeout(() => {
    document.getElementById('interval').classList.add('hidden');
    document.getElementById('main').classList.remove('hidden');
}, 25000);


// FAILURE. THIS IS KEPT AS ARCHIVE.

// function goFullscreen() {
//     if(document.documentElement.requestFullscreen) {
//         document.documentElement.requestFullscreen();
//     }
//     else if(document.documentElement.webkitRequestFullscreen) {
//         document.documentElement.webkitRequestFullscreen(); // Chrome, will add support for other browsers later
//     }
// }


