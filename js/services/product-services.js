//Retrieves a list of products from the server (file: db.json).
const productList = async () => {
    try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
            throw new Error("No se pudo obtener la lista de productos del servidor.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener la lista de productos:", error);
        return [];
    }
};

//Implementation of the POST method to create products
const createProducts = async (name, price, image, id) => {
    try {
        const response = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price, image, id }),
        });
        if (!response.ok) {
            throw new Error("No fue posible agregar el producto.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        return null;
    }
};

//Implementation of the DELETE method to delete products
const deleteProducts = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("No fue posible eliminar el producto.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        return null;
    }
};

//Function to generate a new id
const getId = async () => {
    try {
        const products = await productList();
        if (products.length === 0) {
            return "1"; 
        }
        const maxId = Math.max(...products.map(product => parseInt(product.id, 10) || 0));
        return (maxId + 1).toString();
    } catch (error) {
        console.log("Error al obtener el nuevo ID:", error);
        return "1";
    }
};


export const servicesProducts = {
    productList,
    createProducts,
    deleteProducts,
    getId
};