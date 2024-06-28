'use client'

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {supabase} from '@/utils/supabase';
import {Room} from '@/utils/types';

export default function Apartment({ params }: { params: { id: string } }) {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        size: '',
        equipment: '',
        image: null as File | null
    });
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await supabase
                .from('rooms')
                .select('*')
                .eq('apartmentId', params.id);

            if (response.error) {
                console.log(response.error);
            }

            setRooms(response.data || []);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                image: e.target.files[0]
            });
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            let imageUrl = '';
            if (formData.image) {
                const { data, error } = await supabase.storage
                    .from('rooms')
                    .upload(`images/${formData.image.name}`, formData.image);

                if (error) {
                    console.log(error);
                }

                imageUrl = data?.fullPath || '';
            }

            const response = await supabase
                .from('rooms')
                .insert([
                    {
                        apartmentId: params.id,
                        name: formData.name,
                        size: parseInt(formData.size),
                        equipment: formData.equipment,
                        imageUrl: imageUrl
                    }
                ]);

            if (response.error) {
                console.log(response);
            }

            setFormData({
                name: '',
                size: '',
                equipment: '',
                image: null
            });

            alert('Room added successfully!');
            fetchRooms();
        } catch (error) {
            console.error('Error adding room:', error);
            alert('Failed to add room. Please try again later.');
        }
    };

    const handleClickAdd = () => {
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
    };

    const getImage = (path: string) => {
        console.log(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`);
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div className="bg-gray-200 p-8 rounded-lg overflow-x-auto h-5/6">
                <div className="flex pb-3 justify-between">
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold pb-1">Name</span>
                        <span className="font-extralight">{params.id.slice(0, 4)}</span>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-md text-white"
                                onClick={handleClickAdd}>Add
                        </button>
                    </div>
                </div>
                <table className="min-w-[895.8px]">
                    <thead>
                    <tr className="bg-white text-gray-600 text-center border-b-2 border-gray-300 sticky top-0 z-40">
                        <th className="py-5 px-3">ID</th>
                        <th className="py-5 px-3">Name</th>
                        <th className="py-5 px-3">Size</th>
                        <th className="py-5 px-3">Equipment</th>
                        <th className="py-5 px-3">Image</th>
                        <th className="py-5 px-3">Created At</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600">
                    {rooms.map((room) => (
                        <tr key={room.id}
                            className="border-b h-[120px] border-gray-300 cursor-pointer hover:bg-white hover:border-gray-400 hover:scale-105">
                            <td className="py-4 px-3">
                                <div className="p-1.5 rounded-lg bg-gray-300">{room.id.slice(0,4)}</div>
                            </td>
                            <td className="py-4 px-3">{room.name}</td>
                            <td className="py-4 px-3">{room.size}</td>
                            <td className="py-4 px-3 max-w-xs truncate">{room.equipment}</td>
                            <td className="py-4 px-3">
                                <Image
                                    className="rounded-lg"
                                    src={getImage(room.imageUrl)}
                                    alt={room.name}
                                    width={80}
                                    height={80}
                                />
                            </td>
                            <td className="py-4 px-3 text-xs font-extralight">{room.createdAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {openAddModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative z-10">
                        <div className="flex justify-between mb-2">
                            <h2 className="text-lg font-bold">Add Room</h2>
                            <button
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-5 h-5 rounded-full text-xs"
                                onClick={handleCloseAddModal}
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
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Size</label>
                                <input
                                    type="number"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Equipment</label>
                                <textarea
                                    name="equipment"
                                    value={formData.equipment}
                                    onChange={handleChange}
                                    rows={3}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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