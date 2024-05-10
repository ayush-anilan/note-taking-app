import React from 'react'
import Navbar from '../components/Navbar';
import HeroImage from '../assets/Taking notes-rafiki.svg'

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className='relative container mx-auto py-5'>
                <div className='  flex justify-between h-[750px] max-sm:flex-col '>
                    <div className='hero-image '>
                        <img src={HeroImage} alt="image" className=' h-[750px] w-full' />
                    </div>
                    <div className=' w-1/2 font-bold text-5xl px-20 flex flex-col gap-4 justify-center max-sm:w-full'>
                        <div>
                            <h1>Take Notes</h1>
                            <h1>Anywhere, Anytime</h1>
                        </div>
                        <div>
                            <p className='font-light text-2xl'>Organize your thoughts and ideas with our intuitive note-taking app</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home