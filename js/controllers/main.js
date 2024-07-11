import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
const title = document.getElementById("title");

//Function to create a product card
function createCard({ name, price, image, id }) {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="img-container">
            <img src="${image}" alt="${name}">
        </div>
        <div class="card-container--info">
            <p>${name}</p>
            <div class="card-container--value">
                <p>$ ${price}</p>
                <button type="button" class="delete-button" data-id="${id}">
                    <img class="delete-icon" src="assets/img/eliminar.png" alt="Eliminar">
                </button>
            </div>
        </div>
    `;
    //Handling for deleting product
    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            await servicesProducts.deleteProducts(id); // Call to delete product from server
            card.remove();
            checkProducts(); // Check if there are no products after deletion
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    });

    productContainer.appendChild(card);
    return card;
}

// Function to check if there are no products and change the message
function checkProducts() {
    
    if (products.length === 0) {
        title.innerText = `No se han agregado productos...`;
    } else {
        title.innerText = `MIS PRODUCTOS:` ;
    }
}

//Add a new product with a new ID
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    try {
        const newId = await servicesProducts.getId();
        const newProduct = await servicesProducts.createProducts(name, price, image, newId);
        if (newProduct) {
            createCard({ name, price, image, id: newId });
            checkProducts(); // Check the products array after adding a new product
        } else {
            console.error("Error al agregar el nuevo producto.");
        }
    } catch (error) {
        console.error("Error al agregar el producto.", error);
    }

    form.reset(); 
});

//Initially loads products from the server and creates product cards for each one.
const render = async () => {
    try {
        const products = await servicesProducts.productList();
        products.forEach(product => {
            createCard(product);
        });
        checkProducts(); // Check the products array after loading
    } catch (error) {
        console.error("Error al renderizar los productos:", error);
    }
};

render();
