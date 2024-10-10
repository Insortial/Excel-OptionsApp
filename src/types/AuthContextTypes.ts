export type AuthInfoContextType = {
    accessToken: string,
    loggedIn: boolean,
    email: string,
    name: string,
    phone: string
}

export type AuthUpdateContextType = {
    saveAccessToken: (token: string) => void;
}

export type LoggedInUpdateContextType = {
    saveLogInState: (loggedIn: boolean) => void;
}

export type DecodedToken = {
    email: string,
    name: string,
    phone: string,
    roles: string[]
}