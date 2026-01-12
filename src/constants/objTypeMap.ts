export const objTypeMap = {
    'text': {setValueAs: (v: string) => v === "" ? null : v},
    'select': {setValueAs: (v: string) => v === 'true'},
    'number': {valueAsNumber: true},
    'date': {valueAsDate: true}
}