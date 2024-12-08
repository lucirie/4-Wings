setTimeout(fade_out, 28000);

function fade_out() {
    $("#interval").fadeOut().empty();
}

window.setTimeout(function() {
    $("#main").fadeIn().addClass('full-size');
    $(".petal").fadeIn().removeClass('hidden');
}, 28000);

// FAILURE. THIS IS KEPT AS ARCHIVE.

// function goFullscreen() {
//     if(document.documentElement.requestFullscreen) {
//         document.documentElement.requestFullscreen();
//     }
//     else if(document.documentElement.webkitRequestFullscreen) {
//         document.documentElement.webkitRequestFullscreen(); // Chrome, will add support for other browsers later
//     }
// }


