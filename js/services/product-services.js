const productList = () => {
    return fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

const createProducts = (name, price, image, id) => {
    return fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            price,
            image,
            id
        }),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

const deleteProducts = (id) => {
    return fetch("http://localhost:3000/products/${id}", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

const getId = async () => {
    try {
        const products = await productList();
        const maxId = Math.max(...products.map(product => parseInt(product.id, 10) || 0));
        return (maxId + 1).toString();
    } catch (error) {
        console.log(error);
        return "1"; // Default ID in case of error
    }
};


export const servicesProducts = {
    productList,
    createProducts,
    deleteProducts,
    getId
};