
export default function Apartments() {
    const data = [
        {
            id: '1234',
            name: 'Product A',
            location: 'New York',
            price: 100,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            createdAt: '2023-06-24T10:15:30Z'
        },
        {
            id: '5678',
            name: 'Product B',
            location: 'Los Angeles',
            price: 150,
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            createdAt: '2023-06-23T15:45:00Z'
        },
        {
            id: '9101',
            name: 'Product C',
            location: 'Chicago',
            price: 120,
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            createdAt: '2023-06-22T08:30:20Z'
        },
        {
            id: '2345',
            name: 'Product D',
            location: 'Miami',
            price: 80,
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            createdAt: '2023-06-21T12:00:00Z'
        },
        {
            id: '6789',
            name: 'Product E',
            location: 'San Francisco',
            price: 200,
            description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            createdAt: '2023-06-20T09:00:00Z'
        },
        {
            id: '1011',
            name: 'Product F',
            location: 'Seattle',
            price: 130,
            description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
            createdAt: '2023-06-19T18:30:00Z'
        },
        {
            id: '3456',
            name: 'Product G',
            location: 'Dallas',
            price: 95,
            description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
            createdAt: '2023-06-18T14:45:00Z'
        },
        {
            id: '7890',
            name: 'Product H',
            location: 'Houston',
            price: 180,
            description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.',
            createdAt: '2023-06-17T11:20:00Z'
        },
        {
            id: '1112',
            name: 'Product I',
            location: 'Boston',
            price: 110,
            description: 'Et harum quidem rerum facilis est et expedita distinctio.',
            createdAt: '2023-06-16T16:10:00Z'
        },
        {
            id: '4567',
            name: 'Product J',
            location: 'Atlanta',
            price: 160,
            description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.',
            createdAt: '2023-06-15T20:00:00Z'
        },
        {
            id: '8901',
            name: 'Product K',
            location: 'Phoenix',
            price: 140,
            description: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae.',
            createdAt: '2023-06-14T09:30:00Z'
        },
        {
            id: '1123',
            name: 'Product L',
            location: 'Denver',
            price: 170,
            description: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
            createdAt: '2023-06-13T15:15:00Z'
        }
    ];

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-gray-200 p-4 rounded-lg">
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
                        <tr key={item.id} className="border-b border-gray-300 hover:bg-white hover:border-gray-400 hover:scale-105">
                            <td className="py-4 px-3"><div className="p-1.5 rounded-lg bg-gray-300">{item.id}</div></td>
                            <td className="py-4 px-3">{item.name}</td>
                            <td className="py-4 px-3">{item.location}</td>
                            <td className="py-4 px-3">${item.price}</td>
                            <td className="py-4 px-3 max-w-xs truncate">{item.description}</td>
                            <td className="py-4 px-3">{item.createdAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
