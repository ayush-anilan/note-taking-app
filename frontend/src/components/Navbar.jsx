import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react';


const Navbar = () => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            navigate(`/notes?search=${searchQuery}`);
        }
    };

    return (
        <nav className='relative container mx-auto flex flex-col md:flex-row justify-between h-auto md:h-20 items-center'>
            <div className='flex font-bold text-[#D1510A] text-xl mb-5 md:mb-0 gap-5'>
                <div className='flex items-center'>
                    <Link to="/">NoteFlow</Link>
                </div>
                {userId && (
                    <div className='mb-5 md:mb-0 flex items-center'>
                        <form onSubmit={handleSearch}>
                            <div className='flex items-center justify-end max-sm:mt-5 max-md:mt-5'>
                                <input
                                    type="text"
                                    name="search"
                                    className='border px-4 py-2 md:px-9 md:py-2 w-full md:w-[300px] rounded-3xl border-[#D1510A]'
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className='absolute mr-5 cursor-pointer' onClick={handleSearch} />
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className='flex gap-5'>
                {userId ? (
                    <>
                        <div className='hidden md:flex items-center gap-3'>
                            <label htmlFor="userid" className='font-semibold'>UserID</label>
                            <Link to="/profile" >{userId}</Link>
                        </div>
                        <div className='px-4 py-2 md:px-9 md:py-2 rounded-3xl bg-[#D1510A] text-white font-medium'>
                            <Link to={'/notes'}>Notes</Link>
                        </div>
                        <div className='px-4 py-2 md:px-9 md:py-2 rounded-3xl bg-[#D1510A] text-white font-medium'>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='px-8 py-2 md:py-2 rounded-3xl bg-[#D1510A] text-white font-medium'>
                            <Link to="/login">Login</Link>
                        </div>
                        <div className='border px-8 py-2 md:py-2 rounded-3xl border-[#D1510A] text-[#D1510A] font-medium'>
                            <Link to="/register">Register</Link>
                        </div>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
