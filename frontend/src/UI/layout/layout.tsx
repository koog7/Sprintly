import React from "react";
import Header from "../header/header.tsx";
import Container from "@mui/material/Container";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <Header />
            <Container
                maxWidth={false}
                component="main"
                disableGutters
                sx={{ minHeight: "80vh" }}
            >
                {children}
            </Container>
        </div>
    );
};

export default Layout;