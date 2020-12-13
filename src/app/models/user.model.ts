interface User {
    name: string,
    last_name: string,
    email: string;
    password: string;
}

interface Login {
    email: string;
    password: string;
}

export {
    User,
    Login
}