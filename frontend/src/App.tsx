import './App.css'
import './styles/main.scss';
import Layout from "./UI/layout/layout.tsx";
import {Route, Routes} from "react-router-dom";
import AuthForm from "./features/auth/components/AuthForm.tsx";
import Home from "./features/home/Home.tsx";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

const App = () => {
    return (
        <>
            <MantineProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<AuthForm />} />
                        <Route path="/signup" element={<AuthForm />} />
                    </Routes>
                </Layout>
            </MantineProvider>
        </>
    )
};

export default App
