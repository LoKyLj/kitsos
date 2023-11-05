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

if (document.querySelector('.video')) {
        //This function insert iframe to html after DOM load

    window.onload = () => {
        const video = document.querySelector('.video__container');

        video.insertAdjacentHTML('afterbegin', '<iframe class="video__container-item" src="https://www.youtube.com/embed/F1u8WIb3j7Q?enablejsapi=1&rel=0" title="YouTube video player" frameborder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>')
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

    //fix
    // document.addEventListener('keydown', function (e) {
    //     if (!document.querySelector('.video__container--hide')) {
    //         if (e.key === "Escape") {
    //         hideOnClick();
    //         }
    //     }
    // });
    
    videoRemove.addEventListener('click', controlVideo);
}

// Accordion logic

let accordionTabs = document.getElementsByClassName("accordion__tab");
let arrowIcons = document.getElementsByClassName("accordion__arrowIcon");

for (let i = 0; i < accordionTabs.length; i++) {
    accordionTabs[i].addEventListener("click", function() {
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
            panel.style.marginTop = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.style.marginTop = "45px";
        } 
        if (arrowIcons[i].style.transform) {
            arrowIcons[i].style.transform = null;
        } else {
            arrowIcons[i].style.transform = "rotate(180deg)";
        }
    });
}

// Gallery logic

if (document.querySelector('.gallery')) {
    document.addEventListener('DOMContentLoaded', function () {
        const galleryItems = document.querySelectorAll('.gallery__item');
        const modal = document.querySelector('.modal');
        const modalImage = document.querySelector('.modal-image');
        const modalVideo = document.querySelector('.modal-video');
        const closeBtn = document.querySelector('.closeButton');
        const prevBtn = document.querySelector('.prev--wrapper');
        const nextBtn = document.querySelector('.next--wrapper');
        let currentImageIndex = -1;

        function openModal(index) {
            if (index < 0) {
                index = galleryItems.length - 1;
            } else if (index >= galleryItems.length) {
                index = 0;
            }

            const content = galleryItems[index].querySelector('img, video');
            if (content.tagName === 'IMG') {
                modalImage.src = content.src;
                modalImage.style.display = 'block';
                modalVideo.style.display = 'none';
            } else if (content.tagName === 'VIDEO') {
                modalVideo.querySelector('source').src = content.querySelector('source').src;
                modalImage.style.display = 'none';
                modalVideo.style.display = 'block';
            }
            modal.style.display = 'block';
            currentImageIndex = index;
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        function showPrevious() {
            openModal(currentImageIndex - 1);
        }

        function showNext() {
            openModal(currentImageIndex + 1);
        }

        galleryItems.forEach(function (item, index) {
            item.addEventListener('click', function () {
                openModal(index);
            });
        });

        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', showPrevious);
        nextBtn.addEventListener('click', showNext);

        document.addEventListener('keydown', function (e) {
            if (e.key === "Escape") {
                closeModal();
            } else if (e.key === "ArrowLeft") {
                showPrevious();
            } else if (e.key === "ArrowRight") {
                showNext();
            }
        });
    });
};