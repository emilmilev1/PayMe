import { Box, Container, Link, Typography, styled } from "@mui/material";
import { ResponsiveContainer } from "recharts";

const FooterWrapper = styled(Container)(
    ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
    return (
        <ResponsiveContainer>
            <FooterWrapper className="footer-wrapper">
                <Box
                    p={2}
                    display={{ xs: "block", md: "flex" }}
                    alignItems="center"
                    textAlign={{ xs: "center", md: "left" }}
                    justifyContent="space-between"
                >
                    <Box>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            align="center"
                        >
                            Copyright &copy; {new Date().getFullYear()} - PayMe
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            pt: { xs: 2, md: 0 },
                        }}
                        variant="subtitle1"
                    >
                        Go back home{" "}
                        <Link
                            href="http://localhost:3000/"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                        >
                            PayMe.com
                        </Link>
                    </Typography>
                </Box>
            </FooterWrapper>
        </ResponsiveContainer>
    );
}

export default Footer;
