// import Manager from "./Manager";
import Manager from "./Manager";
import titleBack from "../../assets/images/titleBack.svg";
import {FormattedMessage} from "react-intl";
import axios from "axios";
import {EndPoints} from "../../Config/EndPoints";
import {useState, useEffect} from "react";
import ButtonLoader from "../common/ButtonLoader";
import {useSelector} from "react-redux";

export default function Home(){
    const { isMobileView }                                          = useSelector(state => state.project);
    const [loadingGeneratorBtn, setLoadingGeneratorBtn]             = useState(false);
    const [showErrorMsg, setShowErrorMsg]                           = useState(false);
    const [style, setStyle]                                         = useState("bohemian");
    const [color, setColor]                                         = useState("1");
    const [layouts, setLayouts]                                     = useState([]);
    const [moodBoards, setMoodBoards]                               = useState([]);

    const handleStyleChange = (e) => {
        setStyle(e.target.value);
    }
    const generateArtwork = () => {
        setShowErrorMsg(false);
        setLoadingGeneratorBtn(true);
        axios.get(`${EndPoints.generateArtwork}?style=${style}&color=${color}&user_id=1`)
            .then(res => {
                setLoadingGeneratorBtn(false);
                const { layout, moodboards } = res.data;
                setLayouts(layout);
                setMoodBoards(moodboards);
            })
            .catch(err => {
                console.log(err)
                setLoadingGeneratorBtn(false);
                setShowErrorMsg(true);
            })
    }

    return (
        <>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isMobileView ? 'p-1' : 'p-5'}`}>
                <div>
                    <div className="flex justify-center items-center flex-col">
                        <img src={titleBack} />
                        <div className="-translate-y-16 w-1/2 text-center" style={{fontSize: '38px'}}>
                            <FormattedMessage id="getYourDesign" />
                        </div>
                        <div className="flex gap-5 justify-between py-10">
                            <select className="home-inputs-dropdown" onClick={handleStyleChange}>
                                <option value="bohemian">Bohemian</option>
                                <option value="Scandinavian">Scandinavian</option>
                                <option value="new classic">New Classic</option>
                            </select>
                            <select className="home-inputs-dropdown">
                                <option>Room</option>
                                <option>Room1</option>
                                <option>Room2</option>
                            </select>
                        </div>
                        <div className="flex gap-5 justify-between">
                            <select className="home-inputs-dropdown">
                                <option>Budget</option>
                                <option>Budget1</option>
                                <option>Budget1</option>
                            </select>
                            <select className="home-inputs-dropdown" onChange={(e) => setColor(e.target.value)}>
                                <option value="1">Color 1</option>
                                <option value="2">Color 2</option>
                                <option value="4">Color 4</option>
                                <option value="5">Color 5</option>
                            </select>
                        </div>
                        <div className="flex items-center flex-col py-16 w-1/2">
                            <button className="generate-btn w-full py-4 bg-indigo-500"
                            onClick={generateArtwork}
                            >
                                {loadingGeneratorBtn ? <ButtonLoader text="Generating..." /> : "Generate"}
                            </button>
                            {showErrorMsg && <span style={{color: 'red'}}>Something went wrong! Please try again</span>}
                        </div>
                    </div>
                </div>

                <Manager
                    layouts={layouts}
                    moodBoards={moodBoards}
                />
            </div>
        </>
    )
}
