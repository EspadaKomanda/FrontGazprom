import Logo from '../../../public/logo.svg';
import Image from 'next/image';
import ResponsList from './respons_list_component';


const SideBare = () => {


    return (
        <div className="bg-indigo-200 w-1/4 max-w-80 p-6 h-screen overflow-y-auto scrollbar-hide font-light">
            <Image src={Logo} alt="logo" width={192} className='mx-auto mb-8' />
            <h2 className="text-base ">История запросов</h2>
            <div className="flex flex-col space-y-4 mt-12 gap-12">
                <ResponsList/>
            </div>
        </div>
    )
}

export default SideBare;