function formWrapper() {
    (function () {
        'use strict'

        window.addEventListener('load', function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation')

            // Loop over them and prevent submission
            Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
        }, false)
    })()


    class Item {
        constructor(name, price, isnew, imagePath) {
            this.name = name;
            this.price = price;
            this.isNew = isnew;
            this.imagePath = imagePath;
        }
    }


    const myForm = document.querySelector('.myForm');
    const myName = document.querySelector('#firstName');
    const myPrice = document.querySelector('#lastName');
    const myIsNew = document.querySelector('#is-new');
    const myImageName = document.querySelector('#file');

    myForm.addEventListener('submit', function (e) {
        // console.log(myName.value);
        // console.log(myPrice.value);
        // if (myIsNew.checked) {
        //     console.log(true);
        // } else {
        //     console.log(false);
        // }

        // for (file of myImageName.files) {
        //     console.log(file.name);

        // };
        e.preventDefault();
        let fileNames = [];
        for (file of myImageName.files) {
            fileNames.push(file.name);
        }
        console.log(JSON.stringify(new Item(myName.value, myPrice.value, myIsNew.checked, fileNames)));
        // console.log(new Item(myName.value, myPrice.value, myIsNew.checked, fileNames));



    })
    myImageName.addEventListener('change', function () {
        for (file of myImageName.files) {
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            document.querySelector('.append').appendChild(image);
        };
    })

    myImageName.addEventListener('click', function () {
        let images = document.querySelectorAll('.append img');
        images.forEach(img => {
            img.parentNode.removeChild(img);
        });
    })
}
// const items = document.querySelector('.items');

// let itemsJson;

const container = document.querySelector('.items');

function fetchWrapper() {
    fetch('myjsonfile.json').then(function (response) {
        if (response.ok) {
            response.json().then(function (json) {
                products = json;
                for (item of products) {
                    let itemWrapper = document.createElement('div');
                    let header = document.createElement('h1');
                    let para = document.createElement('p');
                    let inputWrapper = document.createElement('div');
                    let minusBtn = document.createElement('span');
                    let input = document.createElement('input');
                    let plusBtn = document.createElement('span');
                    inputWrapper.classList.add('order-count');
                    minusBtn.classList.add('input-change');
                    minusBtn.textContent = '-';
                    minusBtn.addEventListener('click', () => {
                        if (minusBtn.nextElementSibling.value != '1') {
                            minusBtn.nextElementSibling.value = parseInt(minusBtn.nextElementSibling.value) - 1;
                        }
                    })
                    plusBtn.classList.add('input-change');
                    plusBtn.textContent = '+';

                    plusBtn.addEventListener('click', () => {
                        plusBtn.previousElementSibling.value = parseInt(plusBtn.previousElementSibling.value) + 1;
                    })

                    input.type = 'number';
                    input.value = 1;
                    input.min = 1;
                    input.setAttribute('readonly', '');
                    inputWrapper.appendChild(minusBtn);
                    inputWrapper.appendChild(input);
                    inputWrapper.appendChild(plusBtn);
                    let button = document.createElement('button');
                    header.textContent = item.name;
                    para.textContent = item.price;
                    button.textContent = "BUY";
                    button.value = item.id;


                    itemWrapper.appendChild(header);
                    itemWrapper.appendChild(para);
                    itemWrapper.appendChild(inputWrapper);
                    itemWrapper.appendChild(button);
                    container.appendChild(itemWrapper);

                    button.addEventListener('click', () => {
                        let inputValue = parseInt(button.previousSibling.children[1].value);
                        if (localStorage.order) {
                            console.log(inputValue);
                            if (inputValue > 1) {
                                localStorage.order += ',' + button.value + 'x' + inputValue;

                            } else {
                                localStorage.order += ',' + button.value;
                            }

                        } else {
                            console.log(inputValue);
                            if (inputValue > 1) {
                                localStorage.setItem('order', `${button.value}x${inputValue}`);

                            } else {
                                localStorage.setItem('order', `${button.value}`);
                            }
                        }

                    });
                }
            });
        } else {
            console.log(
                "Network request for products.json failed with response " +
                response.status +
                ": " +
                response.statusText
            );
        }
    });
}
//FOR ALREADY EXISTING BUTTONS
function wrapper2() {
    const inputButMinus = document.querySelector('.input-change-minus');
    inputButMinus.addEventListener('click', () => {
        if (inputButMinus.nextElementSibling.value != '1') {
            inputButMinus.nextElementSibling.value = parseInt(inputButMinus.nextElementSibling.value) - 1;
        }
    })

    const inputButPlus = document.querySelector('.input-change-plus');
    inputButPlus.addEventListener('click', () => {
        inputButPlus.previousElementSibling.value = parseInt(inputButMinus.nextElementSibling.value) + 1;
    })
}
// _______________________________________

// let ordered = ['2222', '3333', '1111', '2111', '1234', '3333x5', '2222x3', '2222', '2222', '2111x3', '2111', '2222'];
// arrayElements = ["a", "b", "c", "d", "e", "a", "b", "c", "f", "g", "h", "h", "h", "e", "a"];

// ordered.sort();
// console.log(ordered);

function orderToObject(orderStr) {
    let arrayElements = orderStr.split(',')
    arrayElements.sort();

    let current = null;
    let cnt = 0;
    let fullOrder = {}; //NEW OBJECT
    for (let i = 0; i < arrayElements.length; i++) {
        if (!arrayElements[i].includes(current)) {
            if (!arrayElements[i].includes('x')) {
                if (cnt > 0) {
                    fullOrder[current] = cnt;
                    // console.log(current + ' comes --> ' + cnt + ' times<br>');
                }
                current = arrayElements[i];
                cnt = 1;
            }

        } else {
            if (arrayElements[i].includes('x')) {
                // console.log(arrayElements[i].indexOf('x'));
                // console.log(arrayElements[i].slice(arrayElements[i].indexOf('x') + 1));
                cnt += parseInt(arrayElements[i].slice(arrayElements[i].indexOf('x') + 1));
            } else {
                cnt++;

            }
        }
    }
    if (cnt > 0) {
        fullOrder[current] = cnt;
        // console.log(current + ' comes --> ' + cnt + ' times');
    }
    // console.log(fullOrder);
    return fullOrder; //RETURN OBJECT WITH KEY/VALUE ID/COUNT FROM TAKEN STRING
}


// count(ordered);



// for (let i in oo) {
//     console.log(i + ' ' + oo[i]);
// }
// orderToString(orderToObject(ordered.join(',')));
// count(localStorage.order).entries();

function orderToString(fullOrder) {
    let newOrder = '';
    let arrayObj = Object.entries(fullOrder); //Object to array of arrays
    arrayObj.forEach(element => {
        // console.log(arrayObj.indexOf(element));

        if (arrayObj.indexOf(element) === arrayObj.length - 1) { //If index of item is last
            newOrder += element[0] + 'x' + element[1];

        } else {
            newOrder += element[0] + 'x' + element[1] + ',';

        }
    });
    // console.log(newOrder);
    return newOrder; //RETURN NEW STRING LIKE WAS TAKEN FROM LOCALSTORAGE BUT PROCESSED
}

// console.log();



function countElementsInArray(array) {
    let count = {};
    array.forEach(function (i) {
        count[i] = (count[i] || 0) + 1;
    });
    return count;
}

function fetchingJSONandGetItemsByID() {
    fetch('myjsofile.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong');
            } else {
                return response.json()
            }
        })
        .then(jsonFile => {
            for (item of jsonFile) {
                if (item.id === '4444')
                    console.log(item);
            }
        })
        .catch(error => {
            console.log('There has been an:' + error.message);
        });
}


function functionsExecutedRightAway() {
    (function () {
        console.log('HI MY NAME IS JEFF');
    })();

    (async () => {
        let response = await fetch('myjsonfile.json');
        let jsonFile = await response.json();
        console.log(jsonFile);
    })();
}



const mainHeader = document.querySelector('.main-header');
const butDrinks = document.querySelector('.d');
const butOrder = document.querySelector('.o');

// console.log(mainHeader.textContent);


async function sortBy(string) {
    let response = await fetch('myjsonfile.json');
    let jsonFile = await response.json();
    if (string === 'Drinks') {
        for (item of jsonFile) {
            if (item.type === 'drinks') {
                let itemWrapper = document.createElement('div');
                let para = document.createElement('p');
                para.textContent = item.name;
                itemWrapper.appendChild(para);
                container.appendChild(itemWrapper);

            }
        }
    } else if (string === 'Order') {
        let oo = orderToObject(localStorage.order);
        for (let i in oo) {
            for (item of jsonFile) {
                if (item.id === i) {
                    let itemWrapper = document.createElement('div');
                    let para = document.createElement('p');
                    para.textContent = oo[i] + ' items of ' + item.name + ' cost ' + (oo[i] * item.price) + '$ each is ' + item.price;
                    itemWrapper.appendChild(para);
                    container.appendChild(itemWrapper);
                }
            }
        }
    }
}

sortBy(mainHeader.textContent);

console.log(mainHeader.textContent);
butDrinks.addEventListener('click', () => {
    mainHeader.textContent = 'Drinks';
    sortBy(mainHeader.textContent);
    // console.log(mainHeader.textContent);
});
butOrder.addEventListener('click', () => {
    mainHeader.textContent = 'Order';
    sortBy(mainHeader.textContent);
});