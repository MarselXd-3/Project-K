let modalOpened = false;

function openModalOnScroll() {
    if (!modalOpened && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal();
        modalOpened = true; 
        window.removeEventListener('scroll', openModalOnScroll);
    }
}

window.addEventListener('scroll', openModalOnScroll);

setTimeout(openModal, 10000);

const btnGet = document.getElementById('btn-get');
btnGet.addEventListener('click', openModal);

function openModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'
}

const modalCloseBtn = document.querySelector('.modal_close');
modalCloseBtn.addEventListener('click', function() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
});

document.addEventListener('click', function(event) {
    const modal = document.querySelector('.modal');
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});
