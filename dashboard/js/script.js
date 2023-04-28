// let wholePage = document.getElementById('page_wrapper');
// let btn = document.getElementById('nav_collapse_btn');


// btn.addEventListener('click', collapse);

// function collapse() {
//   wholePage.classList.toggle('collapsed');
//   if(wholePage.classList.contains('collapsed')){
//     btn.innerHTML = "<i class='bx bxs-chevrons-right'></i>"; 
//   } else {
//     btn.innerHTML = "<i class='bx bxs-chevrons-left'></i>"; 
//   } 
// }

//   let darkMode = localStorage.getItem('dark_mode');
// var toggleBtn = document.querySelector('#theme_switch');

// const enableDarkMode = () => {
//   document.body.classList.add('dark_mode');
//   localStorage.setItem('darkMode', 'enabled');
//   console.log('enabled');
// }

// const disableDarkMode = () => {
//   document.body.classList.remove('dark_mode');
//   localStorage.setItem('darkMode', null);
//   console.log('null');
// }

// toggleBtn.addEventListener('click', ()=>{
//   darkMode = localStorage.getItem('darkMode');
  
//   if(darkMode !== 'enabled'){
//     enableDarkMode();
//   } else {
//     disableDarkMode();
//   }
// })



async function fetchData() {
    return await fetch('http://localhost:3000/api/products')
                .then(res => res.json())
                .catch(err => err)
}

console.log(await fetchData())


const data = await fetchData()
document.getElementById('tbody').innerHTML = data.map((item)=> {
        var {
            product_id, 
            product_name, 
            product_category, 
            product_price, 
            product_qty, 
            product_description, 
            product_img } = item
        
        return (`<tr data-id=${product_id}>
                    <td class="id">#${product_id}</td>
                    <td class="name">${product_name}</td>
                    <td class="category">${product_category}</td>
                    <td class="price">${product_price}</td>
                    <td class="qty">${product_qty}</td>
                    <td class="desc" style="position: relative;">${product_description}</td>
                    <td class="img">${product_img}</td><td>`+
                    "<button class='edit-btn'><i class='fa-solid fa-pen-to-square' style='color: #ffffff;'></i></button>"+
                    "<button class='delete-btn'><i class='fa-solid fa-trash' style='color: #ffffff;'></i></button>"+
                    `</td>
                </tr>`)

}).join('')

const form =  document.getElementById('form')
const tbody = document.getElementById('tbody')
const deleteBtns = document.querySelectorAll('.delete-btn')
const editBtns = document.querySelectorAll('.edit-btn')
const clearBtn = document.querySelector('.clear')
let edit = false
let editId

editBtns.forEach(btn => btn.addEventListener('click', editProduct));
deleteBtns.forEach(btn => btn.addEventListener('click', deleteProduct));
clearBtn.addEventListener('click', clear)
form.addEventListener('submit', createProduct)

function clear() {
    document.getElementById('name').value = ''
    document.getElementById('price').value = ''
    document.getElementById('qty').value = ''
    document.getElementById('desc').value = ''
    document.getElementById('img').value = ''
    document.getElementById('category').value = ''

    if (edit) {
        document.getElementById('submit').innerHTML = 'Submit'
        document.getElementById('clear').innerHTML = 'Clear'
        edit = false
    }
}

async function displayProduct() {
    const data = await fetchData()
    document.getElementById('tbody').innerHTML = data.map((item)=> {
        var {
            product_id, 
            product_name, 
            product_category, 
            product_price, 
            product_qty, 
            product_description, 
            product_img } = item
        
        return (`<tr>
                    <td class="id">#${product_id}</td>
                    <td class="name">${product_name}</td>
                    <td class="category">${product_category}</td>
                    <td class="price">${product_price}</td>
                    <td class="qty">${product_qty}</td>
                    <td class="desc" style="position: relative;">${product_description}</td>
                    <td class="img">${product_img}</td><td>`+
                    "<button class='edit-btn'><i class='fa-solid fa-pen-to-square' style='color: #ffffff;'></i></button>"+
                    "<button class='delete-btn'><i class='fa-solid fa-trash' style='color: #ffffff;'></i></button>"+
                    `</td>
                </tr>`)

    }).join('')
    
}

async function createProduct(e) {
    e.preventDefault()
    let newProduct = {
        "product_name": document.getElementById('name').value,
        "product_price": parseInt(document.getElementById('price').value), 
        "product_qty": parseInt(document.getElementById('qty').value),
        "product_description": document.getElementById('desc').value,
        "product_img": document.getElementById('img').value,
        "product_category": document.getElementById('category').value,
    }

    let empty = false
    for (const key in newProduct) {
        if (newProduct[key] === ''){empty = true; break;}
    }

    if (empty) {
        alert(`There is and empty property.`)
    } else {
        if (edit){
            const result = window.confirm('Are you sure you want to update the '+ editId + ' product ?')
    
            if (result){
                const result = await fetch(`http://localhost:3000/api/products/${editId}`, {
                    method: 'PATCH',
                    body: JSON.stringify(newProduct),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json())
                .catch(err => err)
                
                console.log(result)
                displayProduct()
            }
            clear()
        } else {
            // make a post requeset with the new data of the product
            await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                body: JSON.stringify(newProduct),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
            .catch(err => err)
            
            // diplay product
            displayProduct()
            clear()
        }
    }

}

async function deleteProduct(e) {
    // e.preventDefault()
    const id = e.currentTarget.parentElement.parentElement.dataset.id
    const result = window.confirm('Are you sure you want to delete the '+ id+ ' product ?')
    
    if (result){
        await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
        .catch(err => err)
        
        // diplay product
        displayProduct()
    }
}

function editProduct(e) {
    edit = true
    editId = e.currentTarget.parentElement.parentElement.dataset.id
    const element = e.currentTarget.parentElement.parentElement

    document.getElementById('name').value = element.getElementsByClassName('name')[0].innerHTML
    document.getElementById('price').value = element.getElementsByClassName('price')[0].innerHTML
    document.getElementById('qty').value = element.getElementsByClassName('qty')[0].innerHTML
    document.getElementById('desc').value = element.getElementsByClassName('desc')[0].innerHTML
    document.getElementById('img').value = element.getElementsByClassName('img')[0].innerHTML
    document.getElementById('category').value = element.getElementsByClassName('category')[0].innerHTML
    document.getElementById('submit').innerHTML = 'Edit'
    document.getElementById('clear').innerHTML = 'Cancel'

}



