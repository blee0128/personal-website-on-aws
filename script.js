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

const content = [
    {
      id: 1,
      img: '../image/about-me/home.jpeg',
      text: "I was raised in Kuala Lumpur, the capital of Malaysia.",
    },
    {
      id: 2,
      img: 'image/about-me/badminton.jpeg',
      text: "During my free time, I enjoy playing badminton and also working out.For me, working out and playing badminton are not just activities but essential parts of my lifestyle.",
    },
    {
      id: 3,
      img: 'image/about-me/food.JPG',
      text: "I have always found immense joy in the adventure of exploring new foods.",
    },
    {
      id: 4,
      img: 'image/about-me/outdoor.JPG',
      text: "There's an exhilarating thrill that comes with trying new outdoor activities, a feeling I deeply cherish.",
    },
    {
        id: 5,
        img: 'image/about-me/travel.JPG',
        text: "Traveling to different cities is an experience that I hold close to my heart. Each city, with its unique skyline and bustling streets, tells a story of culture and history.",
    }
];

const contentInfo = document.getElementById('about-me-content');

const prevBtn = document.querySelector('.left-button');
const nextBtn = document.querySelector('.right-button');
let currentItem = 1;

window.addEventListener('DOMContentLoaded', function () {
    const item = content[currentItem];
    code = inputCode(item.img,item.text);
    contentInfo.innerHTML = code;
})

function inputCode(img, text) {
    return(`<img class="content-img" src="` + img + `" alt=""></img>` + `<p>` + text + `</p>`)
}

function showInfo(contentId) {
    const item = content[contentId];
    code = inputCode(item.img,item.text);
    contentInfo.innerHTML = code;
}

nextBtn.addEventListener('click',function() {
    currentItem += 1;
    if (currentItem > content.length - 1) {
        currentItem = 1;
    }
    showInfo(currentItem);
});

prevBtn.addEventListener('click',function() {
    currentItem -= 1;
    if (currentItem < 1) {
        currentItem = content.length - 1;
    }
    showInfo(currentItem);
});