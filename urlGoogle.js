const getGoogleUrl = () => {
    const url = "https://accounts.google.com/o/oauth2/v2/auth";
    const query = {
        client_id:
            "1079737502847-ettbdto8bntesbgoqts1ie73sp4b6l68.apps.googleusercontent.com",
        redirect_uri: "http://localhost:3001/api/user/login_google",
        response_type: "code",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
        prompt: "consent",
        access_type: "offline",
    };
    const queryString = new URLSearchParams(query).toString();
    return `${url}?${queryString}`;
};

const urlGoogle = getGoogleUrl();

// Dùng hàm trên để lấy được url của trang đăng nhập Google, chính là đường href của thẻ a hoặc redirect
// Sau khi đăng nhập thành công, trên params của url sẽ chứa dữ liệu của user
