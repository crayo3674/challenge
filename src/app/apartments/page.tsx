'use client'

import {useEffect, useState} from 'react';
import {data} from '../../../public/staticData';
import Link from 'next/link';

interface Apartment {
    id: string;
    name: string;
    location: string;
    price: number;
    description: string;
    createdAt: string;
}

export default function Apartments() {
    const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

    const handleClickRow = (apartment: Apartment) => {
        setSelectedApartment(apartment);
    };

    const handleCloseModal = () => {
        setSelectedApartment(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleCloseModal();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-gray-200 p-8 rounded-lg">
                <table>
                    <thead>
                    <tr className="bg-white text-gray-600 text-center border-b-2 border-gray-300 sticky top-0">
                        <th className="py-5 px-3">ID</th>
                        <th className="py-5 px-3">Name</th>
                        <th className="py-5 px-3">Location</th>
                        <th className="py-5 px-3">Price</th>
                        <th className="py-5 px-3">Description</th>
                        <th className="py-5 px-3">Created At</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600">
                    {data.map((item) => (
                        <tr key={item.id} className="border-b border-gray-300 cursor-pointer hover:bg-white hover:border-gray-400 hover:scale-105" onClick={() => handleClickRow(item)}>
                            <td className="py-4 px-3"><div className="p-1.5 rounded-lg bg-gray-300">{item.id}</div></td>
                            <td className="py-4 px-3">{item.name}</td>
                            <td className="py-4 px-3">{item.location}</td>
                            <td className="py-4 px-3">${item.price}</td>
                            <td className="py-4 px-3 max-w-xs truncate">{item.description}</td>
                            <td className="py-4 px-3 text-xs">{item.createdAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {selectedApartment && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative z-10">
                        <h2 className="text-lg font-bold mb-2">{selectedApartment.name}</h2>
                        <p className="text-sm text-gray-600 mb-4">{selectedApartment.location}</p>
                        <p className="text-gray-700">{selectedApartment.description}</p>
                        <p className="text-xs text-gray-500 mt-2">Price: ${selectedApartment.price}</p>
                        <div className="flex justify-between">
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 mt-4 rounded-md" onClick={handleCloseModal}>Close</button>
                            <Link href={`/apartment/${selectedApartment.id}`}>Ver Detalles</Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
