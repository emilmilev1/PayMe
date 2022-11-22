import { Container } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
const styles = require("./Carousel.css");

const CarouselImages = () => {
    return (
        <Container maxWidth="xl">
            <Carousel
                fade
                indicators={false}
                controls={false}
                className={styles.carousel}
            >
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/checks/check_1.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/checks/check_2.png"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/checks/check_3.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </Container>
    );
};

export default CarouselImages;
