import Manager from "./Manager";
import titleBack from "../../assets/images/titleBack.svg";
import axios from "axios";
import {EndPoints} from "../../config/EndPoints";
import {useState, useEffect} from "react";
import ButtonLoader from "../common/ButtonLoader";
import {useSelector} from "react-redux";
import {LivingRoomIcon} from "../../assets/icons";
import cls from "./home.module.css";
import DropDown from "../common/DropDown";
import DescriptiveDropDown from "../common/DescriptiveDropDown";
import { MagicStars } from "../../assets/icons";

export default function Home(){
    const { isMobileView }                                          = useSelector(state => state.project);
    const [loadingGeneratorBtn, setLoadingGeneratorBtn]             = useState(false);
    const [showErrorMsg, setShowErrorMsg]                           = useState(false);
    const [filters, setFilters]                                     = useState({});
    const [selectedRoomType, setSelectedRoomType]                   = useState(1);
    const [selectedStyle, setSelectedStyle]                         = useState();
    const [selectedColor, setSelectedColor]                         = useState();
    const [selectedBudget, setSelectedBudget]                       = useState();
    const [layouts, setLayouts]                                     = useState([]);
    const [moodBoards, setMoodBoards]                               = useState([]);

    const { budget, color, room_type, style } = filters;
    const filteredStyle = style?.filter(i => i.room_id === selectedRoomType);
    const filteredColor = color?.filter(e => e.styles_filter_id === selectedStyle);
    const filteredBudget = budget?.filter(e => e.styles_filter_id === selectedStyle);

    // const handleStyleChange = (e) => {
    //     setStyle(e.target.value);
    // }
    const generateArtwork = () => {
        setShowErrorMsg(false);
        setLoadingGeneratorBtn(true);
        axios.get(`${EndPoints.generateArtwork}?color_id=${selectedColor}&budget_id=${selectedBudget}`)
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

    const getMoodBoardFilters = () => {
        axios.get(EndPoints.moodBoardFilters)
            .then(res => {
                setFilters(res.data.filters);
                console.log('res filters', res.data.filters);

            })
            .catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        getMoodBoardFilters();
    }, []);

    useEffect(() => {
        setSelectedStyle(filteredStyle?.length && filteredStyle[0].id);
    }, [selectedRoomType, filters]);

    useEffect(() => {
        if(filteredColor?.length){
            setSelectedColor(filteredColor[0].id);
        }
        if(filteredBudget?.length){
            setSelectedBudget(filteredBudget[0].id);
        }
    }, [selectedStyle]);

    return (
        <>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isMobileView ? 'p-1' : 'p-5'}`}>
                <div>
                    <div className="flex justify-center items-center flex-col">
                        <div className="flex items-center gap-2 p-1" style={{maxWidth: '50%', overflowX: 'auto'}}>
                            {room_type?.map((room) => <div
                                className={`${cls.room_types_grid} ${room.id === selectedRoomType ? cls.room_types_selected_grid : ''} p-3 cursor-pointer flex justify-center items-center flex-col`}
                                onClick={() => setSelectedRoomType(room.id)}
                            >
                                <div>
                                    <LivingRoomIcon fill={room.id === selectedRoomType ? 'white' : 'black'} />
                                </div>
                                <div className="whitespace-nowrap">
                                    {room.name}
                                </div>
                            </div>)}
                        </div>

                        {filteredStyle?.length > 0 && <div className="mt-5 w-1/2">
                            <DescriptiveDropDown options={filteredStyle} selected={selectedStyle} setSelected={setSelectedStyle}/>
                        </div>}
                        {filteredColor?.length > 0 && <div className="mt-1 w-1/2">
                            <DescriptiveDropDown options={filteredColor} selected={selectedColor} setSelected={setSelectedColor}/>
                        </div>}
                        {filteredBudget?.length > 0 && <div className="mt-1 w-1/2">
                            <DropDown options={filteredBudget} selected={selectedBudget} setSelected={setSelectedBudget}/>
                        </div>}

                        {/*<img src={titleBack} />*/}
                        {/*<div className="-translate-y-16 w-1/2 text-center" style={{fontSize: '38px'}}>*/}
                        {/*    <FormattedMessage id="getYourDesign" />*/}
                        {/*</div>*/}
                        {/*// <div className="flex gap-5 justify-between py-10">*/}
                        {/*    <select className="home-inputs-dropdown" onClick={handleStyleChange}>*/}
                        {/*        <option value="bohemian">Bohemian</option>*/}
                        {/*        <option value="Scandinavian">Scandinavian</option>*/}
                        {/*        <option value="new classic">New Classic</option>*/}
                        {/*    </select>*/}
                        {/*    <select className="home-inputs-dropdown">*/}
                        {/*        <option>Room</option>*/}
                        {/*        <option>Room1</option>*/}
                        {/*        <option>Room2</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        {/*// <div className="flex gap-5 justify-between">*/}
                        {/*//     <select className="home-inputs-dropdown">*/}
                        {/*        <option>Budget</option>*/}
                        {/*        <option>Budget1</option>*/}
                        {/*        <option>Budget1</option>*/}
                        {/*    </select>*/}
                        {/*    <select className="home-inputs-dropdown" onChange={(e) => setColor(e.target.value)}>*/}
                        {/*        <option value="1">Color 1</option>*/}
                        {/*        <option value="2">Color 2</option>*/}
                        {/*        <option value="4">Color 4</option>*/}
                        {/*        <option value="5">Color 5</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        <div className="flex items-center flex-col py-5 w-1/2">
                            <button className={`${cls.generate_btn_style} flex items-center justify-center gap-3 w-full py-2 bg-indigo-500`}
                            onClick={generateArtwork}
                            >
                                {loadingGeneratorBtn ? <ButtonLoader text="Generating..." /> : "Generate Magic"}
                                <MagicStars />
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
