export interface User {
    id: string | number
    name: string
    email: string
    phone: string
    username: string
    website?: string
    company: {
        name: string
        catchPhrase?: string
        bs?: string
    }
    address: {
        street: string
        suite?: string
        city: string
        zipcode: string
    }
}

