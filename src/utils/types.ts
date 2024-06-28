export interface Apartment {
    id: string;
    name: string;
    location: string;
    price: number;
    description: string;
    createdAt: string;
}

export interface Room {
    id: string;
    apartmentId: string;
    name: string;
    size: number;
    equipment: string;
    imageUrl: string;
    createdAt: string;
}
