const productList = async () => {
    try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de productos del servidor.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
        return [];
    }
};

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
            throw new Error('No se pudo crear el producto.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al crear el producto:', error);
    }
};

const deleteProducts = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error('No se pudo eliminar el producto.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
};

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
    }
};


export const servicesProducts = {
    productList,
    createProducts,
    deleteProducts,
    getId
};