import {useState} from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Filter_slider({props}) {

    const [keywordIndex, setKeywordIndex] = useState(0);
    const MAX_KEYWORDS = 10;

    function handleAddKeyword() {
        setKeywordIndex(keywordIndex + 1);
    }

    function handleRemoveKeyword() {
        setKeywordIndex(keywordIndex - 1);
    }

    function handleResetKeywords() {
        setKeywordIndex(0);
    }

    function handleSelectKeyword(keyword) {
        if (props.selectedKeyword.includes(keyword)) {
            props.setSelectedKeyword(props.selectedKeyword.filter(item => item !== keyword));
        } else {
            props.setSelectedKeyword([...props.selectedKeyword, keyword]);
        }
    }

    const getKeywordIndex = (currentIndex, keywordsLength) => {
        return currentIndex % keywordsLength;
    };

    return (
        <>
            <div className={"flex flex-row gap-2 items-center"}>
                <IoIosArrowBack className={"h-6 w-6 text-blue-500 cursor-pointer"}
                                onClick={handleRemoveKeyword}
                                style={{userSelect: 'none'}}/>
                <div className={"w-full flex flex-row gap-2 "}>
                    {
                        props.keywords.map((keyword, index) => {
                            const actualIndex = getKeywordIndex(keywordIndex + index, props.keywords.length);

                            return (
                                <div
                                    className={props.selectedKeyword.includes(props.keywords[actualIndex].keyWord) ? "bg-blue-500 text-white rounded-lg p-1 pr-3 pl-3 cursor-pointer w-full text-center" : "bg-gray-200 text-black rounded-lg p-1 pr-3 pl-3 cursor-pointer w-full text-center"}
                                    key={index}
                                    onClick={() => handleSelectKeyword(props.keywords[actualIndex].keyWord)}
                                    style={{userSelect: 'none'}}
                                >
                                    {props.keywords[actualIndex].keyWord}
                                </div>
                            );
                        })
                    }
                </div>
                <IoIosArrowForward className={"h-6 w-6 text-blue-500 cursor-pointer"}
                                   onClick={handleAddKeyword}
                                   style={{userSelect: 'none'}}/>
            </div>
        </>
    )

}