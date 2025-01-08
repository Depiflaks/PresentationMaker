import React, { useState, useEffect, useRef } from "react";
import styles from "./ImportError.module.css";
import { headerIconsMap } from "~/store/icons/header/headerIcons";

interface ImportErrorProps {
    duration?: number;
    onClose: () => void;
}

export default function ImportError({ duration = 50000, onClose }: ImportErrorProps) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            clearTimeout(timer);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [duration]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <div
            ref={containerRef}
            className={`${styles.container} ${isVisible ? styles.visible : ""}`}
        >
            <div className={styles.icon}>
                <img src={headerIconsMap.alert}/>
            </div>
            <div className={styles.message}><span>invalid file format</span></div>
        </div>
    );
}
