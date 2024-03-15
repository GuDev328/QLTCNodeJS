# QLTCNodeJS

## Node verison 20.11.0

-   Sau khi clone repo về, mở terminal chạy "npm i" để cài đặt các thư viện
-   Để chạy project, mở terminal chạy "npm start"
-   Đổi tên file .env.example thành .env và cop giá trị các biến môi trường vào

### Với các api:

-   Case thành công: trả về status 200 và 1 object chứa result (Các data trả về) và message (Thông báo thành công)
-   Case thất bại: trả về status lỗi tương ứng và 1 object chứa message (Thông báo lỗi)

### Auth Api

-   "http://localhost:3001/api/user/register"

    -   body: {  
        "email": "dat@gmail.com",  
        "password": "123456",  
        "name": "Đạgggggt",  
        "phone_number": "0123456789",  
        "birthday": "13/12/2022",  
        "gender": 1  
        }

-   "http://localhost:3001/api/user/login"

    -   body: {  
        "email": "datt@gmail.com",  
        "password": "123456"  
        }

-   "http://localhost:3001/api/user/logout"
