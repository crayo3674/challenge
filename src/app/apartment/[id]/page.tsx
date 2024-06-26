import Image from 'next/image'
import {roomData} from '../../../../public/staticData'

export default function Apartment({ params }: { params: { id: string } }) {

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-gray-200 p-8 rounded-lg">
                <h1 className="text-3xl font-bold pb-4">{params.id}</h1>
                <table>
                    <thead>
                    <tr className="bg-white text-gray-600 text-center border-b-2 border-gray-300 sticky top-0">
                        <th className="py-5 px-3">ID</th>
                        <th className="py-5 px-3">Name</th>
                        <th className="py-5 px-3">Size</th>
                        <th className="py-5 px-3">Equipment</th>
                        <th className="py-5 px-3">Image</th>
                        <th className="py-5 px-3">Created At</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600">
                    {roomData.map((room) => (
                        <tr key={room.id} className="border-b border-gray-300 cursor-pointer hover:bg-white hover:border-gray-400 hover:scale-105">
                            <td className="py-4 px-3"><div className="p-1.5 rounded-lg bg-gray-300">{room.id}</div></td>
                            <td className="py-4 px-3">{room.name}</td>
                            <td className="py-4 px-3">{room.size}</td>
                            <td className="py-4 px-3 max-w-xs truncate">{room.equipment}</td>
                            <td className="py-4 px-3">
                                <Image
                                    className="rounded-lg"
                                    src={room.image}
                                    alt={room.name}
                                    width={80}
                                    height={80}
                                />
                            </td>
                            <td className="py-4 px-3 text-xs text-gray-400">{room.createdAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}