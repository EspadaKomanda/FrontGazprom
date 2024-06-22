import Logo from '../../public/logo.svg';
import Image from 'next/image';
import ResponsList from './respons_list_component';


export default function SideBare({props}) {

    return (
        <div className="bg-indigo-100 w-1/5 max-w-80 p-6 pr-2 h-screen overflow-y-auto scrollbar-hide font-light border-r-2 border-r-gray-400">
            <Image src={Logo} alt="logo" width={192} className='mx-auto mb-8' />
            <h2 className="text-base ">История запросов</h2>
            <div className="flex flex-col space-y-4 mt-12 gap-12">
                <ResponsList />
            </div>
        </div>
    )
}