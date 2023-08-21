import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CarouselComponent: React.FC = () => {
    const images: string[] = [
        "/checks/check_1.jpg",
        "/checks/check_2.png",
        "/checks/check_3.jpg",
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % images.length;
            setCurrentSlide(nextSlide);
        }, 2500);

        return () => {
            clearInterval(interval);
        };
    }, [currentSlide, images.length]);

    return (
        <div style={{ maxWidth: "50%", marginBottom: "30px" }}>
            <Carousel
                selectedItem={currentSlide}
                showThumbs={false}
                showStatus={false}
                showArrows={false}
            >
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;
