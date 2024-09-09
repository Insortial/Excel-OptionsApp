export const packageLoader = async (packageID:string|undefined, accessToken:string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`)

    const config:RequestInit = {
        headers: myHeaders,
        credentials: "include"
    }

    console.log(accessToken)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getPackage/${packageID}`, config);
    const packages = await response.json();

    return {
        state: packages
    };
}

export type PackageLoaderResponse = Awaited<ReturnType<typeof packageLoader>>;