import axios from "axios";

// create product successfully
test('create product', async () => {
    const { data } = await axios.get<{ id: number }[]>(
        "https://api.escuelajs.co/api/v1/categories"
    );

    const catId = data[0].id;

    const response = await axios.post(
        "https://api.escuelajs.co/api/v1/products",
        {
            title: "Snip",
            price: 20,
            description: "Snop",
            categoryId: catId,
            images: ["https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"]
        }
    );

    expect(response.status).toBe(201);
});

// getting admin products successfully 
test('get products', async () => {
    const { data } = await axios.get<{ id: number }[]>(
        "https://api.escuelajs.co/api/v1/products"
    );

    expect(data.length).toBeGreaterThan(0);
});

// deleting product successfully
test('delete product', async () => {
    const { data } = await axios.get<{ id: number }[]>(
        "https://api.escuelajs.co/api/v1/products"
    );

    const id = data[0].id;

    const response = await axios.delete(
        `https://api.escuelajs.co/api/v1/products/${id}`
    );

    expect(response.status).toBe(200);
});

// update product successfully
test('update product', async () => {
    const { data } = await axios.get<{ id: number }[]>(
        "https://api.escuelajs.co/api/v1/products"
    );

    const id = data[0].id;

    const response = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        {
            title: "Snip",
            price: 20,
            description: "Snop",
            categoryId: 1,
            images: ["https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"]
        }
    );

    expect(response.status).toBe(200);
});
