import Image from "next/image";
import {useState} from "react";
import {IoMdDownload} from "react-icons/io";

function Image_box({props}) {

    const [hovered, setHovered] = useState(false);

    return (
        <>
            <div
                className={"relative hover:scale-105"}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Image
                    className={"rounded-lg border-2 border-gray-500 shadow shadow-gray-500 cursor-pointer"}
                    src={props.image} alt={"image"} width={192} height={192}
                    placeholder={"blur"}
                    blurDataURL={"https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/96595bcc-dee6-435c-ae56-babfb4a03f82/width=1152,quality=90/20240613001400%2057465469%20by%20Ted%20Nasmith%20and%20[Boris%20Kustodiev_Greg%20Hildebrandt]%20in%20the%20style%20of%20[Alena%20Aenami_Leiji%20Matsumoto_0.25].jpeg"}
                />
                {hovered && (
                    <div className="absolute top-0 right-0 m-2">
                        <a href={props.image} download>
                            <IoMdDownload className="text-white bg-blue-500 rounded-full p-2 cursor-pointer"/>
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}

function PageNavigation({props}) {

    return (
        <>
            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-500 text-white rounded-lg p-2"
                    onClick={() => props.prevPage()}
                >
                    Назад
                </button>
                <button
                    className="bg-blue-500 text-white rounded-lg p-2 ml-2"
                    onClick={() => props.nextPage()}
                >
                    Вперед
                </button>
            </div>
        </>
    );
}

export default function Image_container({props}) {
    const [currentPage, setCurrentPage] = useState(0);

    const nextPage = () => {
        props.setPageImages(currentPage + 1)
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage === 0) {
            return;
        }
        props.setPageImages(currentPage - 1)
        setCurrentPage(currentPage - 1);
    };

    return (
        <>
            <div className={"grid grid-cols-6 gap-5"}>
                {props.images.map((image, index) => (
                    <Image_box key={index} props={{ image: image }} />
                ))}
            </div>
            <PageNavigation props={{page: currentPage, nextPage: nextPage, prevPage: prevPage}} />
        </>
    );
}