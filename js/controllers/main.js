import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {
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
    deleteButton.addEventListener("click", () => deleteCard(card));

    productContainer.appendChild(card);
    return card;
}

function deleteCard (card){
    
    console.log(deleteCard);
    card.remove()
}
 

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();

        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
        });
    } catch (error) {
        console.log(error);
    }

};

form.addEventListener("submit", async (e)=> {
    e.preventDefault();

    const name = document.querySelector("[data-name ]").value;
    const price = document.querySelector("[data-price ]").value;
    const image = document.querySelector("[data-image ]").value;

    try {
        const newId = await servicesProducts.getId();

        await servicesProducts.createProducts(name, price, image, newId);
        createCard(name, price, image, newId);
    } catch (error) {
        console.log(error);
    }
});

render();