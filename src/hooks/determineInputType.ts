export const determineInputType = (type: string) => {
    switch(type) {
        case 'nvarchar':
        case 'varchar':
            return 'text'
        case 'int':
        case 'float':
            return 'number'
        case 'bit':
            return 'select'
        case 'date':
            return 'date'
    }
    return 'text'
}