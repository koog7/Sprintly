import './App.css'
import './styles/main.scss';
import Layout from "./UI/layout/layout.tsx";
import {Route, Routes} from "react-router-dom";
import AuthForm from "./features/auth/components/AuthForm.tsx";

const App = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/login" element={<AuthForm />} />
                    <Route path="/signup" element={<AuthForm />} />
                </Routes>
            </Layout>
        </>
    )
};

export default App
