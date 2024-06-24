"use client";

import {useEffect} from "react";

export const useClickOutside = (ref, onClick) => {

    const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClick();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);
}