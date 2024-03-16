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

    -   Lưu ý: Data gửi lên là dạng formdata chứ không phải json như các api khác
    -   formdata: {  
        "image": file ảnh,  
        "name": "Ăn uống",  
        "type": 1 (0 for In, 1 for Out, 2 for Transfer, 3 for loan,4 for in debt),  
        }

-   [POST]"http://localhost:3001/api/categories/delete"

    -   body: {  
        "category_id": "65f58d456e68dfb6cbbad515",  
        }

-   [GET]"http://localhost:3001/api/categories/get-all"
