export const inputForms = [
    {id: "date", label: "Дата", inputType: 'date'},
    {id: "name", label: "ФИО участника", inputType: 'text'},
    {id: "email", label: "Эл. почта", inputType: 'text'},
    {id: "phone", label: "Телефон", inputType: 'phone'},
    {id: "distance", label: "Дистанция", inputType: 'select'},
    {id: "payment", label: "Взнос", inputType: 'text'}
];

export const distanceOptions = [
    {id: '3', name: "3 км"},
    {id: '5', name: "5 км"},
    {id: '10', name: "10 км"},
]

export const emailPatt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/