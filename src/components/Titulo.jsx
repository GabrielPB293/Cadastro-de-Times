import { Link } from 'react-router'

export function Titulo() {
    return (
        <>
            <div className="flex bg-orange-500 text-white p-3">
                <img src="https://images.vexels.com/media/users/3/140819/isolated/preview/4d0ae33b94fc8088280c24d681c2d638-estadio-de-manaus.png" alt="Logo de Times"
                    className="ml-2 mr-4 w-16 h-16" />
                <div>
                    <h1 className="text-3xl font-bold">Enciclopédia de Times de Futebol</h1>
                    <h2 className="text-2xl italic">Conheça os maiores clubes do mundo</h2>
                </div>
            </div>
            <nav className='text-right'>
                <Link to="/" className='px-6 py-3 bg-orange-600 text-white font-bold no-underline hover:underline hover:bg-orange-500 hover:text-yellow-300'>Home</Link>&nbsp;&nbsp;
                <Link to="/inclusao" className='px-6 py-3 bg-orange-600 text-white font-bold no-underline hover:underline hover:bg-orange-500 hover:text-yellow-300'>Inclusão</Link>&nbsp;&nbsp;
                <Link to="/pesquisa" className='px-6 py-3 bg-orange-600 text-white font-bold no-underline hover:underline hover:bg-orange-500 hover:text-yellow-300'>Pesquisa</Link>&nbsp;&nbsp;
            </nav>
        </>
    )
}
