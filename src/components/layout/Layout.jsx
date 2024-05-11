import Header from "../main/Header";
import Home from "../main/Home";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setIsMobileView} from "../../store/main/projectSlice";

export default function Layout(){
    const dispatch = useDispatch();

    useEffect(() => {
        let mobileView = window.innerWidth < 639;
        dispatch(setIsMobileView(mobileView));
    }, []);

    return (
        <>
            {/*<Header />*/}
            <Home />
        </>
    )
}
