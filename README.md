# QLTCNodeJS

## Node verison 20.11.0

-   Sau khi clone repo về, mở terminal chạy "npm i" để cài đặt các thư viện
-   Đổi tên file .env.example thành .env và cop giá trị các biến môi trường vào
-   Để chạy project, mở terminal chạy "npm start"

### Với các api:

-   Case thành công: trả về status 200 và 1 object chứa result (Các data trả về) và message (Thông báo thành công)
-   Case thất bại: trả về status lỗi tương ứng và 1 object chứa message (Thông báo lỗi)

### Auth Api

-   [POST]"http://localhost:3001/api/user/register"

    -   body: {  
        "email": "dat@gmail.com",  
        "password": "123456",  
        "name": "Đạgggggt",  
        "phone_number": "0123456789",  
        "birthday": "13/12/2022",  
        "gender": 1,
        "address": "01"
        }

-   [POST]"http://localhost:3001/api/user/login"

    -   body: {  
        "email": "datt@gmail.com",  
        "password": "123456"  
        }

-   [POST]"http://localhost:3001/api/user/logout"

### User Api

-   [POST]"http://localhost:3001/api/user/forgot-password"

    -   body: {  
        "email": "datt@gmail.com",  
        }

-   [POST]"http://localhost:3001/api/user/reset-password"

    -   body: {  
        "email": "datt@gmail.com",  
        "token": "dvnsjkhfcnjkacsu\xfmanct9sxxigmxuieo",  
        "password": "123456"  
        }

-   [GET]"http://localhost:3001/api/user/get-all-user"
-   [GET]"http://localhost:3001/api/user/get-list-province"

### Wallet Api

-   [POST]"http://localhost:3001/api/wallet/create"

    -   body: {  
        "name": "Ví 1",  
        "description": "Đây là ví 1",  
        "money": 200000,  
        "currency": "VND"  
        }

-   [POST]"http://localhost:3001/api/wallet/update"

    -   body: {  
        "wallet_id": "65f549a7bb75a2469271276d",  
        "name": "Ví 1",  
        "description": "Đây là ví 1",  
        "money": 200000,  
        "currency": "VND"  
        }

-   [POST]"http://localhost:3001/api/wallet/delete"

    -   body: {  
        "wallet_id": "65f549a7bb75a2469271276d",  
        }

-   [GET]"http://localhost:3001/api/wallet/get-all"

### Catagories Api

-   [POST]"http://localhost:3001/api/categories/create"

    -   body: {  
        "image": "Link file ảnh",  
        "name": "Ăn uống",  
        "type": 1 (0 for In, 1 for Out),  
        }

-   [POST]"http://localhost:3001/api/categories/delete"

    -   body: {  
        "category_id": "65f58d456e68dfb6cbbad515",  
        }

-   [GET]"http://localhost:3001/api/categories/get-all"

### Spending Api

-   [POST]"http://localhost:3001/api/spending/create"

    -   body: {  
         wallet_id: "65f549a7bb75a2469271276d",  
         description: "Uống ...",  
         with_people: "",  
         money: 50000,  
         to_wallet_id: "65f549a7bb75a2469271276d"  
         category_id: "65f549a7bb75a2469271276d",  
         date: "13/12/2022",  
        }

-   [GET]"http://localhost:3001/api/categories/get-all"
