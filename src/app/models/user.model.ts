interface User {
    name: string,
    last_name: string,
    email: string;
    password: string;
}

interface UpdateUser {
    id: any,
    name: string,
    last_name: string,
    email: string;
    password: string;
}

interface GetUser {
    id: any,
    name: string,
    last_name: string,
    email: string;    
}

interface Login {
    email: string;
    password: string;
}

export {
    User,
    Login,
    UpdateUser,
    GetUser
}