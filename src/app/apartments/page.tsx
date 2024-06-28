'use client'

import {useEffect, useState} from 'react';
import {supabase} from '@/utils/supabase';
import {Apartment} from '@/utils/types';
import Link from 'next/link';


export default function Apartments() {
    const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
    const [apartaments, setApartaments] =  useState<Apartment[]>([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        fetchApartments();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await supabase
                .from('apartments')
                .insert([
                    {
                        name: formData.name,
                        price: parseInt(formData.price),
                        location: formData.location,
                        description: formData.description
                    }
                ]);
            const {data, error} = response;

            if (error) {
                console.log(error);
            }

            setFormData({
                name: '',
                location: '',
                price: '',
                description: ''
            });

            alert('Apartment added successfully!');
            fetchApartments();
        } catch (error) {
            console.error('Error adding room: ', error);
            alert('Failed to add room. Please try again later.');
        }
    };

    const handleClickRow = (apartment: Apartment) => {
        setSelectedApartment(apartment);
    };

    const handleCloseModal = () => {
        setSelectedApartment(null);
        setOpenAddModal(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleCloseModal();
        }
    };

    const fetchApartments = async () => {
        try {
            const response = await supabase.from('apartments').select('*');
            const {data, error} = response;

            if (error) {
                console.log(error);
            }

            setApartaments(data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching apartments:', error);
        }
    };

    const filterApartments = (apartment: Apartment) => {
        return (
            apartment.location.toLowerCase().includes(filter.toLowerCase()) ||
            String(apartment.price).includes(filter)
        );
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    const handleClickAdd = () => {
        setOpenAddModal(true);
    };

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="bg-gray-200 p-8 rounded-lg overflow-x-auto h-5/6">
                <div className="flex justify-between mb-5">
                    <span className="text-3xl font-bold">Apartaments</span>
                    <div className="flex gap-4">
                        <button className="bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-md text-white"
                                onClick={handleClickAdd}>Add
                        </button>
                        <input
                            type="text"
                            placeholder="Filter by Location or Price"
                            value={filter}
                            onChange={handleFilterChange}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>
                </div>
                <table className="min-w-[895.8px]">
                    <thead>
                    <tr className="bg-white text-gray-600 text-center border-b-2 border-gray-300 sticky top-0 z-40">
                        <th className="py-5 px-3">ID</th>
                        <th className="py-5 px-3">Name</th>
                        <th className="py-5 px-3">Location</th>
                        <th className="py-5 px-3">Price</th>
                        <th className="py-5 px-3">Description</th>
                        <th className="py-5 px-3">Created At</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600">
                    {loading ? (
                            <>
                                {[...Array(12)].map((_, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-4 animate-pulse h-[69.1167px] w-[76.0667px]">
                                            <div className="bg-gray-300 rounded w-full h-full"></div>
                                        </td>
                                        <td className="px-3 py-4 animate-pulse h-[69.1167px] w-[186.833px]">
                                            <div className="bg-gray-300 rounded w-full h-full"></div>
                                        </td>
                                        <td className="px-3 py-4 animate-pulse h-[69.1167px] w-[130.3px]">
                                            <div className="bg-gray-300 rounded w-full h-full"></div>
                                        </td>
                                        <td className="px-3 py-4 animate-pulse h-[69.1167px] w-[74.3834px]">
                                            <div className="bg-gray-300 rounded w-full h-full"></div>
                                        </td>
                                        <td className="px-3 py-4 animate-pulse h-[69.1167px] w-[320px]">
                                            <div className="bg-gray-300 rounded w-full h-full"></div>
                                        </td>
                                        <td className="px-3 py-4 animate-pulse h-[69.1167px] w-[108.217px]">
                                            <div className="bg-gray-300 rounded w-full h-full"></div>
                                        </td>
                                    </tr>
                                ))}
                            </>
                    ) : (
                        apartaments.filter(filterApartments).map((item) => (
                            <tr key={item.id}
                                className="border-b h-[120px] border-gray-300 cursor-pointer hover:bg-white hover:border-gray-400 hover:scale-105"
                                onClick={() => handleClickRow(item)}>
                                <td className="py-4 px-3">
                                    <div className="p-1.5 rounded-lg bg-gray-300">{item.id.slice(0, 4)}</div>
                                </td>
                                <td className="py-4 px-3">{item.name}</td>
                                <td className="py-4 px-3">{item.location}</td>
                                <td className="py-4 px-3">${item.price}</td>
                                <td className="py-4 px-3 max-w-xs truncate">{item.description}</td>
                                <td className="py-4 text-xs font-extralight">{item.createdAt.slice(0, 10)}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
            {selectedApartment && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative z-10">
                        <div className="flex justify-between mb-2">
                            <h2 className="text-lg font-bold">{selectedApartment.name}</h2>
                            <button
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-5 h-5 rounded-full text-xs"
                                onClick={handleCloseModal}>x
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{selectedApartment.location}</p>
                        <p className="text-gray-700">{selectedApartment.description}</p>
                        <p className="text-xs text-gray-500 mt-2">Price: ${selectedApartment.price}</p>
                        <div className="flex justify-center mt-4">
                            <div className="flex items-center justify-center">
                                <Link href={`/apartment/${selectedApartment.id}`}>Ver Detalles</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {openAddModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative z-10">
                        <div className="flex justify-between mb-2">
                            <h2 className="text-lg font-bold">Add Apartament</h2>
                            <button
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-5 h-5 rounded-full text-xs"
                                onClick={handleCloseModal}
                            >
                                x
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-gray-500 hover:bg-gray-600 py-2 px-6 rounded-md text-white"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
