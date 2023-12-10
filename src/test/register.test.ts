import axios from "axios";

test('create user', async () => {
    const response = await axios.post<{ id: number }>(
        "https://api.escuelajs.co/api/v1/users/",
        {
            email: "dummy@gmail.com",
            password: "123456",
            name: "Dummy",
            avatar: "https://cdn.fakercloud.com/avatars/calebogden_128.jpg"
        }
    );
    
    expect(response.status).toBe(201); // 201 Created

});