"use client";

import Search_bar from "@/components/search_bar";
import {useEffect, useState} from "react";
import Filter_slider from "@/components/filter_slider";
import Image_container from "@/components/image_container";
import config from "@/app/config";
import {toast, Toaster} from "sonner";

export default function Biblioteca() {

    const [keywords, setKeywords] = useState([]);
    const [selectedKeyword, setSelectedKeyword] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectMode, setSelectMode] = useState(false);
    const [maxPages, setMaxPages] = useState(0);
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [firstLoad, setFirstLoad] = useState(true);

    function getKeywords() {
        fetch(config.getKeyWords, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Access ${localStorage.getItem('accessToken')}`
            }
        }).then(async res => {
            if (res.status !== 200) {
                toast.error("Failed to get keywords");
                return;
            }
            const data = await res.json();
            setKeywords(data);
        })
    }

    function getImages() {
        if (selectedKeyword.length !== 0) {
            getImagesFilterByKeyword();
            return
        }
        toast.promise(
            fetch(config.getImagesPage, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    page: currentPage,
                })
            }).then(async r => {
                if (r.status !== 200) {
                    throw new Error("Failed to get images");
                }
                const data = await r.json();
                setImages(filterPagesByRoles(data));
                setFirstLoad(false);
            }),
            {
                loading: "Loading images...",
                success: "Success",
                error: "Failed",
            }
        )

    }

    function getMaxPages() {
        fetch(config.getPagesCount, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Access ${localStorage.getItem('accessToken')}`
            }
        }).then(async res => {
            if (res.status !== 200) {
                toast.error("Failed to get images");
                return;
            }
            const data = await res.text();
            setMaxPages(data);
        })
    }

    function getRoles() {
        fetch(config.getRoles, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Access ${localStorage.getItem('accessToken')}`
            }
        }).then(async res => {
            if (res.status !== 200) {
                toast.error("Failed to get roles");
                return;
            }
            const data = await res.json();
            setRoles(data);
        })
    }

    const cleanedKeywords = selectedKeyword.map(keyword => {
        const trimmedKeyword = String(keyword).trim(); // Преобразуем значение в строку и убираем лишние символы
        return { keyWord: trimmedKeyword };
    });

    function getImagesFilterByKeyword() {
        toast.promise(
            fetch(config.getImagesByKeyWords, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    keyWords: cleanedKeywords
                })
            }).then(async r => {
                if (r.status !== 200) {
                    throw new Error("Failed to get images");
                }
                const data = await r.json();
                setImages(filterPagesByRoles(data));
            }),
            {
                loading: "Please wait...",
                success: "Success",
                error: "Failed",
            }
        )

    }

    function filterPagesByRoles(images) {
        if (selectedRoles.length === 0) {
            return images;
        }
        console.log(selectedRoles)
        return images.filter(image => selectedRoles.includes(image.template.roleName));
    }

    useEffect(() => {
        getKeywords();
        getMaxPages();
        getRoles();
        getImages()
    }, []);

    useEffect(() => {
        if (firstLoad) {
            return
        }
        getImages();
    }, [currentPage]);

    useEffect(() => {
        if (firstLoad) {
            return
        }
        setCurrentPage(1);
        getImages();
    }, [selectedKeyword]);

    useEffect(() => {
        if (firstLoad) {
            return
        }
        setCurrentPage(1);
        getImages();
    }, [selectedRoles]);

    function downloadAllImage() {
        if (selectedImages.length === 0) {
            toast.error("No images selected");
            return;
        }
        toast.promise(
            fetch(config.getImagesZip, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    ids: selectedImages
                })
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
                .then(text => {
                    const url = text.replaceAll('"', "");
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'images.zip');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle error here
                }),
            {
                loading: "Wait a sec...",
                success: "Downloading started!",
                error: "Failed to download"
            }
        )
    }

    return (
        <>
            <Toaster theme={"light"} visibleToasts={5} richColors closeButton={true} position="top-right" reverseOrder={false} />
            <div className={"flex flex-col items-center gap-6 pt-10"}>
                <div className={"w-full"} style={{maxWidth: '1100px'}}>
                    <Search_bar props={{selectMode: selectMode, setSelectMode: setSelectMode, roles: roles, selectedRoles: selectedRoles, setSelectedRoles: setSelectedRoles, setSelectedImages: setSelectedImages, download: downloadAllImage}} />
                </div>
                <div className={"w-full"} style={{maxWidth: '1263px'}}>
                    <Filter_slider props={{keywords: keywords, selectedKeyword: selectedKeyword, setSelectedKeyword: setSelectedKeyword}} />
                </div>
                    <Image_container props={{images: images, setPageImages: getImages, selectedImages: selectedImages, setSelectedImages: setSelectedImages, selectMode: selectMode, page: currentPage, maxPages: maxPages}} />
            </div>

        </>
    );

}