//This function adding an '.active' class to the object with '.revealByLoad' class by loading the page

const revealByLoad = () => {
    const reveals = document.querySelectorAll('.revealByLoad');
    for (let i = 0; i < reveals.length; i++) {
        if (reveals[i]) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('load', revealByLoad);

//This function adding an '.active' class to the object with '.revealByScroll' class by scrolling the page

const revealByScroll = () => {
    const reveals = document.querySelectorAll('.revealByScroll');
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 200;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', revealByScroll);

//This function insert iframe to html after DOM load

window.onload = () => {
    const video = document.querySelector('.video__container');

    video.insertAdjacentHTML('afterbegin', '<iframe class="video__container-item" src="https://www.youtube.com/embed/F1u8WIb3j7Q?enablejsapi=1&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>')
}

//This fuction reveals object with '.video__container' class and blocks scrolling on the page

const revealOnClick = () => {
    let videoItem = document.querySelector('.video__container');

    videoItem.classList.remove('video__container--hide');

    videoItem.classList.add('video__container--display');

    document.body.style.overflow = ('hidden');
    document.body.style.height = ('100vh');
}

const videoAdd = document.querySelector('.video');
videoAdd.addEventListener('click', revealOnClick);

//This function hides object with '.video__container--display' class

const hideOnClick = () => {
    let hide = document.querySelector('.video__container');
    hide.classList.add('video__container--hide');

    document.body.style.overflowY = ('');
    document.body.style.height = ('');
}

const videoRemove = document.querySelector('.video__container');
videoRemove.addEventListener('click', hideOnClick);

//This function stops YouTube playing with player hiding

function controlVideo() {
    let iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage(
        '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
        "*"
    );
}

videoRemove.addEventListener('click', controlVideo);