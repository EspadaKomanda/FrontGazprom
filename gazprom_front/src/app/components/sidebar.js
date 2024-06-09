import Logo from '../../../public/logo.svg';
import Pen from '../../../public/pen.svg';
import "../styles/sidebar.css";
import Image from 'next/image';


const SideBare = () => {

// const [editingIndex, setEditingIndex] = useState(null);
//     const handleEditClick = (index) => {
//         setEditingIndex(index);
//     };

    return (
        <div className="bg-indigo-200 w-1/4 max-w-96 p-6 h-screen overflow-y-auto scrollbar-hide">
            <Image src={Logo} alt="logo" width={192} className='mx-auto mb-8' />
            <h2 className="text-base">История запросов</h2>
            <div className="flex flex-col space-y-4 mt-12 gap-12">
                <div>
                    <h3 className="text-lg mb-4">Сегодня</h3>
                    <ul>
                        <li className="text-sm mb-3">Картинки для итоговой презе... <Image src={Pen} alt="pencil" className="inline-block ml-2" /></li>
                        <li className="text-sm mb-3">Картинки для итоговой презе... <Image src={Pen} alt="pencil" className="inline-block ml-2" /></li>
                        <li className="text-sm mb-3">Картинки для итоговой презе... <Image src={Pen} alt="pencil" className="inline-block ml-2" /></li>
                        <li className="text-sm mb-3">Картинки для итоговой презе... <Image src={Pen} alt="pencil" className="inline-block ml-2" /></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg mb-4">Вчера</h3>
                    <ul>
                        <li className="text-sm mb-3">Картинки для итоговой презе... <Image src={Pen} alt="pencil" className="inline-block ml-2" /></li>
                        <li className="text-sm mb-3">Картинки для итоговой презе... <Image src={Pen} alt="pencil" className="inline-block ml-2" /></li>
                        <li className="text-sm mb-3">Картинки для итоговой презе... <Image src={Pen} alt="pencil" className="inline-block ml-2" /></li>
                        <li className="text-sm mb-3">Картинки для итоговой презе... <Image src={Pen} alt="pencil" className="inline-block ml-2" /></li>
                        <li className="text-sm mb-3">Картинки для итоговой презе... <Image src={Pen} alt="pencil" className="inline-block ml-2" /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBare;