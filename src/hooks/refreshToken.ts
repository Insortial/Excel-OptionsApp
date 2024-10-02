let accessToken:string|null = null;
let refreshingPromise:Promise<string|null>|null = null;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const getToken = async () => {
    if (accessToken) {
        return accessToken;
    }

    // If a refresh is in progress, wait for it to complete
    if (refreshingPromise) {
        return refreshingPromise;
    }

    refreshingPromise = refreshToken();
    accessToken = await refreshingPromise;
    refreshingPromise = null; // Reset the promise after resolving
    return accessToken;
};

const refreshToken = async ():Promise<string|null> => {
    myHeaders.set("Authorization", `Bearer ${accessToken}`);

    try {
        const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/token`, {
            method: "POST",
            headers: myHeaders,
            credentials: "include"
        });
        const data = await response.json();
        accessToken = data.accessToken;
        return accessToken;
    } catch (err) {
        console.error("Error refreshing token:", err);
        accessToken = null; // Reset on error
        return null;
    }
};

export { getToken };