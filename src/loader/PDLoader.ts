
export const pdLoader = async (level: string, request: Request, fetchHook:(url: string, requestType: string, body?: BodyInit | undefined, baseURL?: string) => Promise<Response>) => {
    /* null | {pageNum: number, columnPageNum: number, limit: string, totalPages: number, totalColumnPages: number, items: } */
    let data = null
    const url = new URL(request.url)
    const response = await fetchHook(`/excelInfo/${level}/?${url.searchParams}`, "GET", undefined, import.meta.env.VITE_EXCELINFO)
    
    if (!response.ok) {
        return null
    } else {
        data = await response.json()
    }
    
    return {level, ...data}
}

export type PDLoaderResponse = Awaited<ReturnType<typeof pdLoader>>;