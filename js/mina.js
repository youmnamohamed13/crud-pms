var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategry = document.getElementById("productCategry");
var productDesc = document.getElementById("productDesc");

var productlist;
var counter;
var saveBtn = document.getElementById("saveBtn");
localStorage.getItem("productlist") == null ? productlist = [] : productlist = JSON.parse(localStorage.getItem("productlist"));
displayproduct();
function localStorageUpdate() {
    localStorage.setItem("productlist", JSON.stringify(productlist))
}
var addproductBtn =document.getElementById("addpoduct");
addproductBtn.addEventListener('click',addproduct)
function addproduct() {
    if (validName() & validPrice() & validCategry() & validDesc()) {
        var product = {
            name: productName.value,
            Price: productPrice.value,
            Categry: productCategry.value,
            Desc: productDesc.value,
        };
        productlist.push(product);
        localStorageUpdate()
        displayproduct();
        validName();
        validPrice();
        validCategry()
        validDesc();
        clearInput();
        saveBtn.classList.add("d-none");
    }
}
function displayproduct() {
    var addTable = ``;
    for (var i = 0; i < productlist.length; i++)
        addTable += `
        <tr>
          <td>${i + 1}</td>
          <td>${productlist[i].name}</td>
          <td>${productlist[i].Price}</td>      
          <td>${productlist[i].Categry}</td>
          <td>${productlist[i].Desc}</td>
          <td><button onclick="updateProduct(${i})" class="btn btn-warning">update</button></td>
          <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
        </tr> `
    document.getElementById("bodyTable").innerHTML = addTable;
}
function deleteProduct(index) {
    productlist.splice(index, 1)
    localStorageUpdate()
    displayproduct(productlist)
}
function clearInput() {
    productName.value = '';
    productPrice.value = '';
    productCategry.value = '';
    productDesc.value = '';
}
function updateProduct(index) {
    productName.value = productlist[index].name;
    productPrice.value = productlist[index].Price;
    productCategry.value = productlist[index].Categry;
    productDesc.value = productlist[index].Desc;
    counter = index;
    saveBtn.classList.remove("d-none");
}
var saveproductBtn =document.querySelector(".saveChangeBtn");
saveproductBtn.addEventListener('click',saveUpdate)

function saveUpdate() {
    productlist[counter].name = productName.value;
    productlist[counter].Price = productPrice.value;
    productlist[counter].Categry = productCategry.value;
    productlist[counter].Desc = productDesc.value;
    saveBtn.classList.add("d-none");
    localStorageUpdate();
    displayproduct();
    clearInput();
}

// function searchProduct(data) {
//     var addTable = '';
//     var newData = data.toLowerCase();
//     for (var i = 0; i < productlist.length; i++) {
//         if (productlist[i].name.toLowerCase().includes(newData)) {
            
//             productlist[i].newName = productlist[i].name.toLowerCase().replace(newData, `<span class="text-danger fw-bold" >${newData}</span>`)
//             addTable += 
//             `<tr>
//             <td>${i + 1}</td>
//             <td>${productlist[i].newName}</td>
//             <td>${productlist[i].Price}</td>      
//             <td>${productlist[i].Categry}</td>
//             <td>${productlist[i].Desc}</td>
//             <td><button onclick="updateProduct(${i})" class="btn btn-warning">update</button></td>
//             <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
//             </tr> `
//         }
//         document.getElementById("bodyTable").innerHTML = addTable;
//     }
// }
function searchProduct(data) {
    var addTable = '';
    var newData = data.toLowerCase();
    for (var i = 0; i < productlist.length; i++) {
        if (productlist[i].name.toLowerCase().includes(newData)) {
            var regex = new RegExp(`(${data})`, 'gi');
            productlist[i].newName  = productlist[i].name.replace(regex, `<span class="text-danger fw-bold">${data}</span>`);
            addTable += 
            `<tr>
            <td>${i + 1}</td>
            <td>${productlist[i].newName}</td>
            <td>${productlist[i].Price}</td>      
            <td>${productlist[i].Categry}</td>
            <td>${productlist[i].Desc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-warning">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
            </tr> `;
        }
        document.getElementById("bodyTable").innerHTML = addTable;
    }
    }
 var validNameBtn =document.querySelector("#productName");
 validNameBtn.addEventListener('input',validName)
function validName() {
    var regexName = /^[A-Z]{4}$/
    if (regexName.test(productName.value)) {
        productName.style.border = "none";
        document.getElementById("massName").classList.add("d-none");
        return true;
    }
    else {
        productName.style.border = "solid 5px red";
        document.getElementById("massName").classList.remove("d-none");
        return false;
    }
}


var validPriceBtn =document.querySelector("#productPrice");
validPriceBtn.addEventListener('input',validPrice)
function validPrice() {
    regexPrice = /^[1-9][0-9]{2,5}$/;
    if (regexPrice.test(productPrice.value)) {
        productPrice.style.border = "none";
        document.getElementById("massPrice").classList.add("d-none");
        return true;
    }
    else {
        productPrice.style.border = "solid 5px red";
        document.getElementById("massPrice").classList.remove("d-none");
        return false;
    }
}


var validCategryBtn =document.querySelector("#productCategry");
validCategryBtn.addEventListener('input',validCategry)
function validCategry() {

    regexCategry = /^[A-Fa-f]$/;
    if (regexCategry.test(productCategry.value)) {
        productCategry.style.border = "none";
        document.getElementById("massCategry").classList.add("d-none");
        return true;
    }
    else {
        productCategry.style.border = "solid 5px red";
        document.getElementById("massCategry").classList.remove("d-none");
        return false;
    }
}


var validDescBtn =document.querySelector("#productDesc");
validDescBtn.addEventListener('input',validDesc)
function validDesc() {
    regexDesc = /^[A-Za-z0-9\s]+$/;
    if (regexDesc.test(productDesc.value)) {
        productDesc.style.border = "none";
        document.getElementById("massDesc").classList.add("d-none");
        return true;
    }
    else {
        productDesc.style.border = "solid 5px red";
        document.getElementById("massDesc").classList.remove("d-none");
        return false;
    }
}