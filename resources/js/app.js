const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const showMillionariesBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateWealthBtn = document.querySelector('#calculate');


let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
function getRandomUser(){
    fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(data => {
            const user = data.results[0];

            const newUser = {
                name: `${user.name.first} ${user.name.last}`,
                money: Math.floor(Math.random() * 1000000)
            }

            addData(newUser)
        })
}

function addData(obj){
    data.push(obj)

    updateDom();
}


function updateDom(provideData = data){
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    provideData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong> \$${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

function formatMoney(number){
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney(){
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateDom();
}

function sortByRichest(){
    data = data.sort((a,b) => {
        return b.money - a.money
    })

    updateDom();
}

function showMillionaries(){
    data = data.filter((items) => {
        return items.money > 1000000;
    })

    updateDom();
}

function calculateWealth(){
    const total = data.reduce((acc, cur) => {
        return acc += parseInt(cur.money)
        
    }, 0)

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>\$${formatMoney(total)}</strong></h3>`;
    main.appendChild(wealthElement)

}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionariesBtn.addEventListener('click', showMillionaries);
calculateWealthBtn.addEventListener('click', calculateWealth)