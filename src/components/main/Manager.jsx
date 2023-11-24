import {useEffect, useState} from "react";
import dislikeIcon from "../../assets/icons/dislike.svg";
import heartIcon from "../../assets/icons/heart.svg";
import shareIcon from "../../assets/icons/arrow-share.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import cartIcon from "../../assets/icons/cart.svg";

import moodBoardData from "../../data";

// import {fabric} from "fabric";

export default function Manager( { layouts, moodBoards }){
    // const dispatch = useDispatch();
    const [selectedDesignData, setSelectedDesignData] = useState({});
    const [showSwapPanel, setShowSwapPanel] = useState();
    const [budget, setBudget] = useState("");
    const [currencyUnit, setCurrencyUnit] = useState("");


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
                let scale = scaleToWidth*imgHeight <= (placeHolderHeight - placeHolderStroke) ? scaleToWidth : scaleToHeight;
                // if(value === 'width') return (scale * imgWidth).toString();
                // if(value === 'height') return (scale * imgHeight).toString();
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
        const { Items, moodboard_Template_ID, moodboard_id, total_price, currency } = data;
        setBudget(total_price);
        setCurrencyUnit(currency || "SAR");
        const matchLayout = layouts.find(e => e.moodboard_Template_ID === moodboard_Template_ID);
        const {items, mood_board_canvas} = matchLayout;

        let mobileView = window.innerWidth < 639 ? 1 : 2;
        const widthRatio = (window.innerWidth/mobileView * 0.955) / mood_board_canvas.width;
        const heightRatio = (window.innerHeight * 0.6) / mood_board_canvas.height;

        let newData = [];

        for(let i=0;i<Items.length;i++){
            const { category, ImageURL } = Items[i];
            const matchedData = items.find(e => e.category.toLowerCase() === category.toLowerCase())
            const { left, top } = matchedData;
            const {width, height} = await getScaleAndPosition(matchedData, ImageURL);
            let obj = {
                width: width * widthRatio,
                height: height * heightRatio,
                left: left * widthRatio,
                top: top * heightRatio,
                src: ImageURL,
            };
            newData.push(obj);
        };

        setSelectedDesignData({
            id: moodboard_id,
            items: newData
        })
    };

    useEffect(() => {
        if(moodBoards.length > 0){
            handleSelectedDesign(moodBoards[0]);
        }
    }, [moodBoards])

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

    const toggleSwapPanel = (index) => {
        // if(index === undefined || showSwapPanel === index){
        //     setShowSwapPanel(null);
        //     return;
        // }
        // setShowSwapPanel(index)
    }

    const swapImage = (src, index) => {
        console.log('selected design...', selectedDesignData);
        let data = [...selectedDesignData.placeHolders];
        data[index] = {
            ...data[index],
            src
        }
        setSelectedDesignData({
            ...selectedDesignData,
            placeHolders: data
        });
        toggleSwapPanel(undefined);
    }

    return (
        <>
            <div className="pt-5" id="canvas-wrapper">
                <div className="border-4 border-black rounded-2xl canvas-container flex flex-col justify-center overflow-hidden">
                    {/*<canvas id="editor-canvas" />*/}
                    <div className="relative" style={{width: window.innerWidth/2 * 0.955, height: window.innerHeight * 0.6}}>
                        {selectedDesignData?.items?.map( (p, index) => {
                            return (
                                <>
                                    <div className="absolute" style={{width: p.width, height: p.height, left: p.left, top: p.top}}>
                                        <img src={p.src} width={p.width} height={p.height} onClick={() => toggleSwapPanel(index)} />
                                        {showSwapPanel === index &&
                                            <div
                                                className="flex items-center justify-center relative border-2 border-black rounded-md p-2 ml-1 overflow-x-scroll"
                                                 style={{ maxWidth: window.innerWidth/2 * 0.9, backgroundColor: 'white', zIndex: '9999', transform: 'translateY(-155px)'}}
                                            >
                                            {p.items?.map(e => {
                                                return (
                                                    <div className="flex flex-col justify-center items-center cursor-pointer">
                                                        <div>
                                                            <img src={e.image} width="100" onClick={() => swapImage(e.image, index)} />
                                                        </div>
                                                        <div>Price: ${e.price}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>}
                                    </div>
                                </>
                            )
                        })}
                    </div>
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
                    <div className="flex items-center gap-5">
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
                    <button className="generate-btn py-2 px-5" onClick={previousDesign}>
                        Previous
                    </button>
                    <button className="generate-btn py-2 px-8" onClick={nextDesign}>
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
        </>
    )
}
