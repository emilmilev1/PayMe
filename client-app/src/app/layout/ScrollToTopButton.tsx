import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { KeyboardArrowUp } from "@mui/icons-material";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <IconButton
                    aria-label="Scroll to top"
                    onClick={scrollToTop}
                    sx={{
                        position: "fixed",
                        bottom: "2rem",
                        right: "2rem",
                        zIndex: 9999,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        "&:hover": {
                            bgcolor: "primary.dark",
                        },
                    }}
                >
                    <KeyboardArrowUp />
                </IconButton>
            )}
        </>
    );
};

export default ScrollToTopButton;
