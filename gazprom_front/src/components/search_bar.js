"use client";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { IoMdCheckmarkCircle } from "react-icons/io";
import {useState} from "react";

export default function Search_bar({props}) {

    const [filterMode, setFilterMode] = useState(false);

    return (
        <>
            <div className={"flex flex-row gap-4"}>
                <div className={"flex flex-row items-center border-2 border-blue-500 rounded-lg w-full"}>
                    <input
                        type="text"
                        className={"w-full h-10 px-2 py-1 focus:outline-none text-gray-500 rounded-l-lg"}
                        placeholder="Поиск фото..."/>
                    <div className={"bg-blue-500 text-white rounded-r p-1 pl-2 cursor-pointer"}>
                        <FaMagnifyingGlass className={"h-8 w-8"}/>
                    </div>
                </div>
                <div
                    className={"cursor-pointer relative flex flex-row gap-1 items-center bg-blue-500 rounded-lg p-1"}
                     onClick={() => setFilterMode(!filterMode)}>
                    <CiFilter className={"h-8 w-8 text-white"}/>
                    <button className={"text-white"}>Фильтры</button>
                    {
                        filterMode &&
                        <div className={"absolute top-12 right-0 z-10"}>
                            <div
                                 className={"bg-blue-500 rounded-lg p-2 flex flex-col justify-start items-start"}
                                 style={{width: "277px", maxHeight: "300px"}}>
                                <div className={"flex flex-col gap-1 w-full items-start pr-2"}
                                     style={{height: "80%", overflowY: "scroll"}}>
                                    {
                                        props.roles.map((role, index) => (
                                            <button
                                                key={index}
                                                className={`rounded-lg p-1 pl-2 w-full text-start text-white ${props.selectedRoles?.includes(role.name) ? "bg-custom-purple" : ""}`}
                                                onClick={() => {
                                                    if (props.selectedRoles.includes(role.name)) {
                                                        props.setSelectedRoles(props.selectedRoles.filter(item => item !== role.name));
                                                    } else {
                                                        props.setSelectedRoles([...props.selectedRoles, role.name]);
                                                    }
                                                }}
                                            >
                                                {role.name}
                                            </button>
                                        ))
                                    }
                                </div>
                                <div className={"flex flex-row gap-1 items-center justify-between w-full pt-2"}>
                                    <button
                                        className={"text-blue-500 bg-white rounded-lg p-1 w-full"}
                                        onClick={() => props.setSelectedRoles([])}
                                    >
                                        Применить
                                    </button>
                                    <button
                                        className={"text-blue-500 bg-white rounded-lg p-1 w-full"}
                                        onClick={() => props.setSelectedImages([])}
                                    >
                                        Сбросить
                                    </button>
                                </div>
                            </div>
                        </div>
                    }

                </div>
                    <div className={"relative flex flex-row gap-1 items-center bg-blue-500 rounded-lg p-1"}>
                        <IoMdCheckmarkCircle className={"h-8 w-8 text-white"}/>
                        <button className={"text-white"} onClick={() => {
                            props.setSelectMode(!props.selectMode)
                        }}>Выбрать
                        </button>
                        <div className={"absolute top-12 right-0 z-10"}>
                            {
                                props.selectMode &&
                                <div className={"absolute top-0 right-0 z-10"}>
                                    <div
                                        className={"bg-blue-500 rounded-lg gap-1 p-2 flex flex-col justify-start items-start"}
                                        style={{width: "110px"}}>
                                    <button
                                        className={"text-white hover:text-gray-200"}
                                        onClick={() => {
                                            props.download();
                                            props.setSelectedImages([])
                                            props.setSelectMode(false)
                                        }
                                        }
                                    >
                                        Скачать
                                    </button>
                                    <button
                                        className={"text-white hover:text-gray-200"}
                                        onClick={() => {
                                            props.setSelectedImages([])
                                            props.setSelectMode(false)
                                        }}
                                    >
                                        Отменить
                                    </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>


            </>
            )

            }