import {RootState, useAppSelector} from "../../app/store.ts";
import {selectUser} from "../auth/userSlice.ts";
import HomeUser from "./components/HomeUser.tsx";
import HomeGuest from "./components/HomeGuest.tsx";
import {useSelector} from "react-redux";
import {useEffect} from "react";

const Home = () => {
    const user = useAppSelector(selectUser);
    const loader = useSelector((state: RootState) => state.User.loader);

    useEffect(() => {
        console.log(loader)
    }, [loader]);
    return (
        <div>
            {!user? <HomeGuest /> : <HomeUser/>}
        </div>
    );
};

export default Home;