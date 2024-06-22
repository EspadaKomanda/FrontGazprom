import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function Search_bar({props}) {

    return (
        <>
            <div className={"flex flex-row gap-4"}>
                <div className={"flex flex-row items-center border-2 border-blue-500 rounded-lg w-full"}>
                    <input
                        type="text"
                        className={"w-full h-10 px-2 py-1 focus:outline-none text-gray-500 rounded-l-lg"}
                        placeholder="Поиск фото..."/>
                    <div className={"bg-blue-500 text-white rounded-r p-1 pl-2"}>
                        <FaMagnifyingGlass className={"h-8 w-8"}/>
                    </div>
                </div>
                <div className={"flex flex-row gap-1 items-center bg-blue-500 rounded-lg p-1"}>
                    <CiFilter className={"h-8 w-8 text-white"}/>
                    <button className={"text-white"}>Фильтры</button>
                </div>
                <div className={"flex flex-row gap-1 items-center bg-blue-500 rounded-lg p-1"}>
                    <IoMdCheckmarkCircle className={"h-8 w-8 text-white"}/>
                    <button className={"text-white"}>Выбрать</button>
                </div>
            </div>


        </>
    )

}