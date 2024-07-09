import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

let products = [];

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
                <button class="delete-button" data-id="${id}">
                    <img src="assets/img/delete.svg" alt="Eliminar">
                </button>
            </div>
        </div>
    `;

    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", async () => {
        try {
            await servicesProducts.deleteProducts(id);
            deleteCard(card, id);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    });

    productContainer.appendChild(card);
    return card;
}

function deleteCard(card, id) {
    card.remove();
    products = products.filter(product => product.id !== id);
}

const render = async () => {
    try {
        products = await servicesProducts.productList();
        products.forEach(product => {
            createCard(product);
        });
    } catch (error) {
        console.error('Error al renderizar los productos:', error);
    }
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    try {
        const newId = await servicesProducts.getId();
        await servicesProducts.createProducts(name, price, image, newId);
        createCard({ name, price, image, id: newId });
        products.push({ name, price, image, id: newId });
    } catch (error) {
        console.error('Error al crear el producto:', error);
    }
});

render();
