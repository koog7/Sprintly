import {useAppSelector} from "../../app/store.ts";
import {selectUser} from "../auth/userSlice.ts";
import HomeUser from "./components/HomeUser.tsx";
import HomeGuest from "./components/HomeGuest.tsx";

const Home = () => {
    const user = useAppSelector(selectUser);

    return (
        <div>
            {user? <HomeUser/> : <HomeGuest />}
        </div>
    );
};

export default Home;