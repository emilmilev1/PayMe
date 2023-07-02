import { PaletteMode } from "@mui/material";
import CreateCheck from "../../components/CreateCheck/CreateCheck";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Homepage/Navbar";

const CreateCheckPage = () => {
    return (
        <>
            <Navbar />
            <CreateCheck />
            <Footer />
        </>
    );
};

export default CreateCheckPage;
