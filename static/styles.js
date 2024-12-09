setTimeout(fade_out, 28000);
// setTimeout(Flash(), 25000);        NEEDS WORK.

function fade_out() {
    $("#interval").fadeOut().empty();
}

function Flash() {
    $("#body").style.animation='flasher 4s linear';
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


