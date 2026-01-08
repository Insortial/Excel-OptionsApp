export const objTypeMap = {
    'text': {},
    'select': {setValueAs: (v: string) => v === 'true'},
    'number': {valueAsNumber: true},
    'date': {valueAsDate: true}
}