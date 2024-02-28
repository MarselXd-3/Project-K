const tabContentItems = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');
const tabItemsParent = document.querySelector('.tab_content_items');

let currentTab = 0;
let intervalId; 

const hideTabContent = () => {
    tabContentItems.forEach((item) => {
        item.style.display = 'none';
    });
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (index = 0) => {
    hideTabContent();
    tabContentItems[index].style.display = 'block';
    tabItems[index].classList.add('tab_content_item_active');
};


showTabContent(currentTab);

const autoSlide = () => {
    currentTab = (currentTab + 1) % tabItems.length;
    showTabContent(currentTab);
};


intervalId = setInterval(autoSlide, 3000);

tabItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem) {
                currentTab = tabIndex;
                hideTabContent();
                showTabContent(tabIndex);
                clearInterval(intervalId); 
                intervalId = setInterval(autoSlide, 3000); 
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", function() {
    const somInput = document.getElementById("som");
    const usdInput = document.getElementById("usd");
    const eurInput = document.getElementById("eur");

    // JSON 
    const currencyRates = {
        "som_to_usd": 89.43,
        "som_to_eur": 96.60
    };

    const convertor = (element, targetElement1, targetElement2, current) => {
        element.addEventListener("input", () => {
            switch (current) {
                case "som":
                    targetElement1.value = (element.value / currencyRates.som_to_usd).toFixed(2);
                    targetElement2.value = (element.value / currencyRates.som_to_eur).toFixed(2);
                    break;
                case "usd":
                    targetElement1.value = (element.value * currencyRates.som_to_usd).toFixed(2);
                    targetElement2.value = (element.value * currencyRates.som_to_usd / currencyRates.som_to_eur).toFixed(2);
                    break;
                case "eur":
                    targetElement1.value = (element.value * currencyRates.som_to_eur).toFixed(2);
                    targetElement2.value = (element.value * currencyRates.som_to_eur / currencyRates.som_to_usd).toFixed(2);
                    break;
                default:
                    break;
            }

            if (element.value === "") {
                targetElement1.value = "";
                targetElement2.value = "";
            }
        });
    };

    convertor(somInput, usdInput, eurInput, "som");
    convertor(usdInput, somInput, eurInput, "usd");
    convertor(eurInput, somInput, usdInput, "eur");
});


const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const cardBlock = document.querySelector('.card');

let currentCard = 1;

function fetchData(cardNumber) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`)
    .then(response => response.json())
    .then(data => {
        const completedText = data.completed ? 'Completed' : 'Not Completed';
        const completedColor = data.completed ? 'green' : 'red';
        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${completedColor}">${completedText}</p>
            <span>${data.id}</span>`;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function fetchPostsData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        console.log("Posts data:", data);
    })
    .catch(error => {
        console.error('Error fetching posts data:', error);
    });
}

function showNextCard() {
    currentCard = currentCard === 200 ? 1 : currentCard + 1;
    fetchData(currentCard);
}

function showPrevCard() {
    currentCard = currentCard === 1 ? 200 : currentCard - 1;
    fetchData(currentCard);
}


fetchData(currentCard);
fetchPostsData();

btnPrev.onclick = showPrevCard;
btnNext.onclick = showNextCard;
