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
        "gender": 1  
        }

-   [POST]"http://localhost:3001/api/user/login"

    -   body: {  
        "email": "datt@gmail.com",  
        "password": "123456"  
        }

-   [POST]"http://localhost:3001/api/user/logout"

### Wallet Api

-   [POST]"http://localhost:3001/api/wallet/create"

    -   body: {  
        "user_id": "65f47f28176d36a885a23da2",  
        "name": "Ví 1",  
        "description": "Đây là ví 1",  
        "money": 200000,  
        "currency": "VND"  
        }

-   [POST]"http://localhost:3001/api/wallet/update"

    -   body: {  
        "wallet_id": "65f549a7bb75a2469271276d",  
        "user_id": "65f47f28176d36a885a23da2",  
        "name": "Ví 1",  
        "description": "Đây là ví 1",  
        "money": 200000,  
        "currency": "VND"  
        }

-   [POST]"http://localhost:3001/api/wallet/delete"

    -   body: {  
        "wallet_id": "65f549a7bb75a2469271276d",  
        "user_id": "65f47f28176d36a885a23da2"  
        }

-   [GET]"http://localhost:3001/api/wallet/get-all"

    -   body: {  
        "user_id": "65f47f28176d36a885a23da2"  
        }
