"use client";

import Search_bar from "@/components/search_bar";
import {useEffect, useState} from "react";
import Filter_slider from "@/components/filter_slider";
import Image_container from "@/components/image_container";

const PAGE_SIZE = 18;

function getKeywords() {
    return ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"];
}

function getImages() {
    return [
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/32ee04ac-06bf-4b92-8d67-ed4be6314e6d/width=832,quality=90/3B834CC68E2EE17CF223CFBCEA7BEB5B2CA6C413EF65D9768354BB304F94F837.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/203f6c45-e2d9-4db0-82e4-dab478120a3a/width=1344,quality=90/00191-3519880462.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/e1ca16c8-f7af-49f6-94cd-df2e0aef073a/width=1080,quality=90/01731-3628085265.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/7458bcfb-dfc4-4c78-b07c-ad688e69d224/width=896,quality=90/ComfyUI_temp_xmmmo_00115_.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/81f8e626-a822-4815-b8be-361ff65b0d88/width=832,quality=90/23A0FB2A01E317435B7230A636151C162866EEB32ABD98040799169E1E764A01.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/78a0c776-fbda-4528-86ed-44d039e91ea4/width=1664,quality=90/00199.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/55d2d500-5a4c-436b-a25e-ae3ddcaa583a/width=832,quality=90/8EDB1FAC02247FE7356D2040FDE1BC28961ECE05E37EB3828241D92BE5C97CC3.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/47b2aca0-1a8b-4c45-8a62-76610da4519e/width=450/6176E28F224949F5B7677079D52A28DB99429F3B6137AD3DD24C07B89B0C6AAC.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/3435b177-2ed8-4fd9-8d14-b797e9d7e1d0/width=450/897.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/7189ca2a-1438-4e20-94bb-380b390d9e2d/width=450/00049.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/83b57b7b-9c1b-44f6-8bbd-fd958fa40c3b/width=450/B8B7FE8D3C03F98AB1AD8A0175C2C1798AC523037610F4DFEEE6FC49B1B343BA.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/aa521cc9-680a-411f-a0d2-87d0993457f5/width=450/ComfyUI-MH_173341_3464294380_00288.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/cb5b186b-9530-475f-9e85-8c1649e1431a/width=450/2024-06-12_03-34-34_zavychromaxl_v80.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/c4440847-32b7-45b2-b065-753dd545b9a4/width=450/ComfyUI_temp_flphy_00009_.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/4ebc5ea9-2db7-4abe-a29a-684e1026e418/width=450/E8606E514E9A380524B81D19BCDEFE84CCC61B108FE299BA220A3FCC88E8B39E.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/74f402a6-aabb-4e9a-aad8-9622974b4fe9/width=450/00412-536695581.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/32ee04ac-06bf-4b92-8d67-ed4be6314e6d/width=832,quality=90/3B834CC68E2EE17CF223CFBCEA7BEB5B2CA6C413EF65D9768354BB304F94F837.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/203f6c45-e2d9-4db0-82e4-dab478120a3a/width=1344,quality=90/00191-3519880462.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/e1ca16c8-f7af-49f6-94cd-df2e0aef073a/width=1080,quality=90/01731-3628085265.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/7458bcfb-dfc4-4c78-b07c-ad688e69d224/width=896,quality=90/ComfyUI_temp_xmmmo_00115_.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/81f8e626-a822-4815-b8be-361ff65b0d88/width=832,quality=90/23A0FB2A01E317435B7230A636151C162866EEB32ABD98040799169E1E764A01.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/78a0c776-fbda-4528-86ed-44d039e91ea4/width=1664,quality=90/00199.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/55d2d500-5a4c-436b-a25e-ae3ddcaa583a/width=832,quality=90/8EDB1FAC02247FE7356D2040FDE1BC28961ECE05E37EB3828241D92BE5C97CC3.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/47b2aca0-1a8b-4c45-8a62-76610da4519e/width=450/6176E28F224949F5B7677079D52A28DB99429F3B6137AD3DD24C07B89B0C6AAC.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/3435b177-2ed8-4fd9-8d14-b797e9d7e1d0/width=450/897.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/7189ca2a-1438-4e20-94bb-380b390d9e2d/width=450/00049.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/83b57b7b-9c1b-44f6-8bbd-fd958fa40c3b/width=450/B8B7FE8D3C03F98AB1AD8A0175C2C1798AC523037610F4DFEEE6FC49B1B343BA.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/aa521cc9-680a-411f-a0d2-87d0993457f5/width=450/ComfyUI-MH_173341_3464294380_00288.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/cb5b186b-9530-475f-9e85-8c1649e1431a/width=450/2024-06-12_03-34-34_zavychromaxl_v80.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/c4440847-32b7-45b2-b065-753dd545b9a4/width=450/ComfyUI_temp_flphy_00009_.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/4ebc5ea9-2db7-4abe-a29a-684e1026e418/width=450/E8606E514E9A380524B81D19BCDEFE84CCC61B108FE299BA220A3FCC88E8B39E.jpeg",
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/74f402a6-aabb-4e9a-aad8-9622974b4fe9/width=450/00412-536695581.jpeg",
    ]
}

function getPage(page) {
    return getImages().slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
}

export default function Biblioteca() {

    const [keywords, setKeywords] = useState([]);
    const [selectedKeyword, setSelectedKeyword] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectMode, setSelectMode] = useState(false);

    function setPageImages(page) {
        setImages(getPage(page));
    }

    useEffect(() => {
        setKeywords(getKeywords());
        setImages(getPage(0));
    }, []);

    return (
        <>
            <div className={"flex flex-col items-center gap-6 pt-10"}>
                <div className={"w-full"} style={{maxWidth: '1100px'}}>
                    <Search_bar />
                </div>
                <div className={"w-full"} style={{maxWidth: '1263px'}}>
                    <Filter_slider props={{keywords: keywords, selectedKeyword: selectedKeyword, setSelectedKeyword: setSelectedKeyword}} />
                </div>
                    <Image_container props={{images: images, setPageImages: setPageImages, selectedImages: selectedImages, setSelectedImages: setSelectedImages, selectMode: selectMode, setSelectMode: setSelectMode}} />
            </div>

        </>
    );

}