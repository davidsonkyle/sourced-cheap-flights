// Changing the defaults
window.sr = ScrollReveal({ reset: true });

// Customizing a reveal set
//sr.reveal('.signup-form');
sr.reveal('.section')


$(window).scroll(function() {
    if ($(window).scrollTop() > 500) {
        $('.signup-form').css('display','block');
    }
    else {
        $('.signup-form').css('display','none');
    }
});