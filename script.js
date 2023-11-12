function updateResumeDownloadButton() {
    const element = document.querySelector('.js-resume-home');
    if (element.innerHTML === 'Download CV') {
        element.innerHTML = 'CV Downloaded';
    }
 }
 

const menu_button = document.querySelector('.hamburger');
const mobile_nav = document.querySelector('.mobile-nav');

menu_button.addEventListener('click', function () {
    menu_button.classList.toggle('is-active');
    mobile_nav.classList.toggle('is-active');
});