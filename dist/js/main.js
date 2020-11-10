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