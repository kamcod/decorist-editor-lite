import {useEffect, useState} from "react";
import dislikeIcon from "../../assets/icons/dislike.svg";
import heartIcon from "../../assets/icons/heart.svg";
import shareIcon from "../../assets/icons/arrow-share.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import cartIcon from "../../assets/icons/cart.svg";
import leftArrow from "../../assets/icons/left-arrow.svg";
import rightArrow from "../../assets/icons/right-arrow.svg";

import moodBoardData from "../../data";
import PageLoader from "../common/PageLoader";
import {useSelector} from "react-redux";
import axios from "axios";
import {EndPoints} from "../../Config/EndPoints";

// import {fabric} from "fabric";

export default function Manager( { layouts, moodBoards }){
    const { isMobileView }                                          = useSelector(state => state.project);
    const [isLoadingData, setIsLoadingData]                         = useState(false);
    const [selectedDesignData, setSelectedDesignData]               = useState({});
    const [showSwapPanel, setShowSwapPanel]                         = useState();
    const [swapItemsList, setSwapItemsList]                         = useState();
    const [current, setCurrent]                                     = useState(1);
    const [budget, setBudget]                                       = useState("");
    const [currencyUnit, setCurrencyUnit]                           = useState("");

    const DIMENSION = isMobileView ? 370 : 528;
    const LIMIT = 3;
    const PAGES = Math.floor(swapItemsList?.length / LIMIT);
    const swapItemsPerPage = swapItemsList?.slice((current - 1) * LIMIT, current * LIMIT);

    const getImageDimensions = (src) => {
        let data;
        const imgObj = new Image();
        imgObj.src = src;

        imgObj.onload = function () {
            data = { width: imgObj.width, height: imgObj.height}
        };
        return data;
    }
    const getScaleAndPosition = ( data, imgUrl) => {
        const placeHolderStroke = 1;
        const { width, height, left, top } = data;
        const placeHolderWidth = width;
        const placeHolderHeight = height;
        return new Promise((resolve, reject) => {
            const imgObj = new Image();
            imgObj.src = imgUrl;

            imgObj.onload = function () {
                data = { width: imgObj.width, height: imgObj.height}
                const imgWidth = imgObj.width, imgHeight = imgObj.height;
                const scaleToWidth = (placeHolderWidth - placeHolderStroke)/imgWidth;
                const scaleToHeight = (placeHolderHeight - placeHolderStroke)/imgHeight;
                let scale = scaleToWidth * imgHeight <= (placeHolderHeight - placeHolderStroke) ? scaleToWidth : scaleToHeight;
                resolve({
                    scale,
                    left: left + placeHolderStroke,
                    top: top + placeHolderStroke,
                    width: (scale * imgWidth).toString(),
                    height: (scale * imgHeight).toString()
                })
            };
        })
    };

    const handleSelectedDesign = async (data) => {
        console.log('DATA00000000', data);
        setIsLoadingData(true);
        const { Items, moodboard_Template_ID, moodboard_id, total_price, currency } = data;
        setBudget(total_price);
        setCurrencyUnit(currency || "SAR");
        const matchLayout = layouts.find(e => e.mood_Template_ID === moodboard_Template_ID);
        const {items, mood_board_canvas} = matchLayout;

        const ratio = DIMENSION / mood_board_canvas.width;

        let newData = [];

        for(let i=0;i<items.length;i++){
            const { category, left, top } = items[i];
            const matchedData = Items.find(e => e.category.toLowerCase() === category.toLowerCase())
            if(matchedData){
                const { ImageURL, id, price, category } = matchedData;
                const {width, height} = await getScaleAndPosition(items[i], ImageURL);
                let obj = {
                    id, price, category,
                    width: width * ratio,
                    height: height * ratio,
                    left: left * ratio,
                    top: top * ratio,
                    src: ImageURL,
                };
                newData.push(obj);
            }
            if(i === items.length - 1){
                setIsLoadingData(false);
            }
        };

        setSelectedDesignData({
            id: moodboard_id,
            items: newData
        })
    };

    const previousDesign = () => {
        const index = moodBoards.findIndex(i => i.moodboard_id === selectedDesignData.id);
        if(index === 0){
            handleSelectedDesign(moodBoards[moodBoards.length-1])
        } else {
            handleSelectedDesign(moodBoards[index - 1])
        }
    }

    const nextDesign = () => {
        const index = moodBoards.findIndex(i => i.moodboard_id === selectedDesignData.id);
        if(index === moodBoards.length-1){
            handleSelectedDesign(moodBoards[0])
        } else {
            handleSelectedDesign(moodBoards[index + 1])
        }
    }

    const getSwapItemsList = (id) => {
        axios.get(`${EndPoints.getSwapItems}?item_id=${id}&category=chair&style=New Classic&size=30`)
            .then(res => setSwapItemsList(res.data.similarProducts))
            .catch(err => console.log(err))
    }

    const toggleSwapPanel = (index, id) => {
        if(index === undefined || showSwapPanel === index){
            setShowSwapPanel(null);
            setSwapItemsList(null);
            return;
        }

        getSwapItemsList(id);
        setShowSwapPanel(index)
    }

    const swapImage = (src, index) => {
        console.log('selected design...', selectedDesignData);
        let data = {...selectedDesignData};
        data.items[index] = {
            ...data.items[index],
            src
        }
        setSelectedDesignData(data);
        toggleSwapPanel(undefined);
    }

    const onPreviousItems = () => {
        if(current === 1) return;
        setCurrent(c => c-1);
    };

    const onNextItems = () => {
        if(current === PAGES) return;
        setCurrent(c => c+1);
    };

    const getSwapListStyle = () => {
        return { maxWidth: DIMENSION * 0.9, width: DIMENSION * 0.8, backgroundColor: '#F3F3F3', zIndex: '9999', transform: 'translateY(-155px)', border: '1px solid #71CFBC'}
    }

    useEffect(() => {
        if(moodBoards.length > 0){
            handleSelectedDesign(moodBoards[0]);
        }
    }, [moodBoards]);

    return (
        <>
            <div className="pt-5 flex justify-end" id="canvas-wrapper">
                <div style={{maxWidth: DIMENSION}}>
                    <div
                        style={{width: DIMENSION, height: DIMENSION}}
                        className="relative border-4 border-black rounded-2xl canvas-container flex flex-col justify-center overflow-hidden">
                        {isLoadingData ? (
                            <PageLoader text="Loading Items..." />
                        ) : (
                            <>
                                {selectedDesignData?.items?.map( ({id, width, height, left, top, src, items}, index) => {
                                    return (
                                        <div key={id} className="absolute" style={{width, height, left, top}}>
                                            <img src={src} width={width} height={height} onClick={() => toggleSwapPanel(index, id)} />
                                            {showSwapPanel === index &&
                                                <div
                                                    className="flex items-center gap-2 justify-center relative border-2 rounded-md p-2 ml-1 overflow-x-scroll"
                                                    style={getSwapListStyle}
                                                >
                                                    <button disabled={current === 1}>
                                                        <img src={leftArrow} onClick={onPreviousItems} />
                                                    </button>

                                                    {swapItemsPerPage ? swapItemsPerPage?.map(({ ImageURL, price}) => {
                                                        return (
                                                            <div className="flex flex-col justify-center items-center cursor-pointer">
                                                                <div>
                                                                    <img src={ImageURL} width="100" onClick={() => swapImage(ImageURL, index)} />
                                                                </div>
                                                                <div>Price: ${price}</div>
                                                            </div>
                                                        )
                                                    }) : <></>}

                                                    <button disabled={current === PAGES}>
                                                        <img src={rightArrow} onClick={onNextItems} />
                                                    </button>
                                                </div>}
                                        </div>
                                    )
                                })}
                            </>
                        )}
                        {/*<div className="relative" style={{width: (window.innerWidth/(isMobileView ? 1 : 2)) * 0.955, height: window.innerHeight * 0.6}}>*/}

                        {/*</div>*/}
                        {/*<div className="flex justify-center items-center" style={{transform: 'translateY(75px)'}}>*/}
                        {/*    <div*/}
                        {/*        className="flex justify-center items-center rounded"*/}
                        {/*        style={{backgroundColor: "#71CFBC", width: "308px", height: "67px"}}*/}
                        {/*    >*/}
                        {/*        <FormattedMessage id="budget" />: $3000*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="flex gap-2 p-5">
                        <div className={`flex items-center ${isMobileView ? 'gap-2' : 'gap-5'}`}>
                            <button>
                                <img src={dislikeIcon} />
                            </button>
                            <button>
                                <img src={heartIcon} />
                            </button>
                            <button>
                                <img src={shareIcon} />
                            </button>
                            <button>
                                <img src={bookmarkIcon} />
                            </button>
                        </div>
                        <div className="grow"></div>
                        <button className="generate-btn py-2 px-5" disabled={isLoadingData} onClick={previousDesign}>
                            Previous
                        </button>
                        <button className="generate-btn py-2 px-8" disabled={isLoadingData} onClick={nextDesign}>
                            Next
                        </button>
                    </div>
                    <div className="generate-btn p-2 flex items-center justify-between">
                        <div>{`${budget} ${currencyUnit}`}</div>
                        <button>
                            <img src={cartIcon} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
