import Image from "next/image";
import {useState} from "react";
import {IoIosArrowBack, IoIosArrowForward, IoMdCheckmarkCircle} from "react-icons/io";
import { RiDownload2Fill } from "react-icons/ri";

function Image_box({props}) {

    const [hovered, setHovered] = useState(false);

    const handleDownload = () => {
        fetch(props.image)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'image.jpg');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    };

    return (
        <>
            <div
                className={"relative hover:scale-105"}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <a href={props.image} download>
                    <Image
                        className={"rounded-lg border-2 border-gray-500 shadow shadow-gray-500"}
                        src={props.image} alt={"image"} width={192} height={192}
                        placeholder={"blur"}
                        blurDataURL={"https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/96595bcc-dee6-435c-ae56-babfb4a03f82/width=1152,quality=90/20240613001400%2057465469%20by%20Ted%20Nasmith%20and%20[Boris%20Kustodiev_Greg%20Hildebrandt]%20in%20the%20style%20of%20[Alena%20Aenami_Leiji%20Matsumoto_0.25].jpeg"}
                    />
                </a>
                    {
                        props.selectMode &&
                        <>
                            {
                                props.selectedImages.includes(props.image) ?
                                    <div className={`absolute top-0 m-2 z-10 ${hovered ? "right-7" : "right-0"}`}>
                                        <IoMdCheckmarkCircle
                                            className="text-white hover:text-blue-500 h-6 w-6 cursor-pointer"
                                            onClick={() => props.setSelectedImages(props.selectedImages.filter(image => image !== props.image))}/>
                                    </div> :
                                    <div className={`absolute top-0 m-2 z-10 right-7 ${hovered ? "opacity-100" : "opacity-0"}`}>
                                        <div
                                            className={"w-6 h-6 rounded-full bg-opacity-0 border-2 border-white"}
                                            onClick={() => props.setSelectedImages([...props.selectedImages, props.image])}
                                        >
                                        </div>
                                    </div>
                            }
                        </>
                    }
                    {hovered && (
                        <>
                            <div className="absolute top-0 right-0 m-2 z-10">
                                <button onClick={handleDownload}>
                                    <RiDownload2Fill className="text-white hover:text-blue-500 h-6 w-6 cursor-pointer"/>
                                </button>
                            </div>
                        </>
                    )}
            </div>
        </>
    );
}

function PageNavigation({props}) {

    return (
        <>
            <div className={"flex flex-row gap-2 items-center"}>
                {
                    props.page === 0 ?
                        <p className={"h-8 w-8"}/>
                        :
                        <IoIosArrowBack className={"h-8 w-8 text-blue-500 cursor-pointer"}
                                        onClick={props.prevPage}
                                        style={{userSelect: 'none'}}/>
                }

                <div className={"flex flex-row gap-2"}>
                    <div
                        className={"bg-blue-500 text-white rounded-lg pt-1 pb-1 cursor-pointer w-8 h-8 text-center"}
                        style={{userSelect: 'none'}}
                    >
                        {props.page + 1}
                    </div>
                </div>
                {
                    props.page === props.maxPages - 1 ?
                        <p className={"h-8 w-8"}/>
                        :
                        <IoIosArrowForward className={"h-8 w-8 text-blue-500 cursor-pointer"}
                                           onClick={props.nextPage}
                                           style={{userSelect: 'none'}}/>
                }
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
                    <Image_box key={index} props={{
                        image: image,
                        selectMode: props.selectMode,
                        selectedImages: props.selectedImages,
                        setSelectedImages: props.setSelectedImages
                    }}/>
                ))}
            </div>
            <PageNavigation props={{page: currentPage, maxPages: props.maxPages, nextPage: nextPage, prevPage: prevPage}}/>
            <p className={"pb-2"}></p>
        </>
    );
}