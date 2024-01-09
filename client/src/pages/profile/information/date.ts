export const month = [
    {value: 'Январь', label: 'Январь',key: '0'+1},
    {value: 'Февраль', label: 'Февраль',key: '0'+2},
    {value: 'Март', label: 'Март',key: '0'+3},
    {value: 'Апрель', label: 'Апрель',key: '0'+4},
    {value: 'Май', label: 'Май',key: '0'+5},
    {value: 'Июнь', label: 'Июнь',key: '0'+6},
    {value: 'Июль', label: 'Июль',key: '0'+7},
    {value: 'Август', label: 'Август',key: '0'+8},
    {value: 'Сентябрь', label: 'Сентябрь',key: '0'+9},
    {value: 'Октябрь', label: 'Октябрь',key: 10},
    {value: 'Ноябрь', label: 'Ноябрь',key: 11},
    {value: 'Декабрь', label: 'Декабрь',key: 12},
]

export const years = Array.from(Array(new Date().getFullYear() - 1919),
    (v, i) => ({value: i + 1920,label: i + 1920}));

export const day = Array.from({length: 31},
    (v, i) => ({value:  i < 9 ? `${0}`+ (i+1) : i + 1, label: i < 9 ? `${0}`+ (i+1) : i + 1}));