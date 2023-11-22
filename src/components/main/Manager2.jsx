import {useEffect, useState} from "react";
import dislikeIcon from "../../assets/icons/dislike.svg";
import heartIcon from "../../assets/icons/heart.svg";
import shareIcon from "../../assets/icons/arrow-share.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import cartIcon from "../../assets/icons/cart.svg";

import moodBoardData from "../../data";

const DATA = [
    [
        [
            {
                "chair_image": "https://www.westelm.com.sa/assets/VariantProductImages/129466664/129466664_sku_hero_image_url.jpg",
                "chair_price": "5,850.00",
                "chair_trend_factor": 10,
                "coffee_table_image": "https://www.westelm.com.sa/assets/VariantProductImages/PW4736656/202316_0257_img47z.jpg",
                "coffee_table_price": "2,850.00",
                "coffee_table_trend_factor": 10,
                "moodboard_id": 54,
                "sofa_image": "https://www.westelm.com.sa/assets/VariantProductImages/130957614/130957614_v1_sku_hero_image_url.jpg",
                "sofa_price": "15,400.00",
                "sofa_trend_factor": 10
            },
            {
                "chair_image": "https://www.westelm.com.sa/assets/VariantProductImages/PW4711958/202316_0182_img54z.jpg",
                "chair_price": "2,375.00",
                "chair_trend_factor": 10,
                "coffee_table_image": "https://www.westelm.com.sa/assets/VariantProductImages/PW3588927/202248_0125_img8z.jpg",
                "coffee_table_price": "2,075.00",
                "coffee_table_trend_factor": 10,
                "moodboard_id": 28,
                "sofa_image": "https://www.westelm.com.sa/assets/VariantProductImages/PW2684499/202134_0056_img76z.jpg",
                "sofa_price": "16,100.00",
                "sofa_trend_factor": 10
            },
        ],
        {
            "theme": 2.0
        }
    ],
    [
        [
            {
                "chair_image": "https://www.westelm.com.sa/assets/VariantProductImages/129386533/202152_0201_img51z.jpg",
                "chair_price": "4,375.00",
                "chair_trend_factor": 10,
                "coffee_table_image": "https://www.westelm.com.sa/assets/VariantProductImages/PW4736656/202316_0257_img47z.jpg",
                "coffee_table_price": "2,850.00",
                "coffee_table_trend_factor": 10,
                "moodboard_id": 108,
                "sofa_image": "https://www.westelm.com.sa/assets/VariantProductImages/PW5942664/202308_0265_img63z.jpg",
                "sofa_price": "15,100.00",
                "sofa_trend_factor": 10
            },
            {
                "chair_image": "https://www.westelm.com.sa/assets/VariantProductImages/129386533/202152_0201_img51z.jpg",
                "chair_price": "4,375.00",
                "chair_trend_factor": 10,
                "coffee_table_image": "https://www.westelm.com.sa/assets/VariantProductImages/PW2637657/202316_0148_img3z.jpg",
                "coffee_table_price": "2,625.00",
                "coffee_table_trend_factor": 10,
                "moodboard_id": 104,
                "sofa_image": "https://www.westelm.com.sa/assets/VariantProductImages/PW5700097/202130_0469_img1z.jpg",
                "sofa_price": "16,100.00",
                "sofa_trend_factor": 10
            },
        ],
        {
            "theme": 6.0
        }
    ]
];
// import {fabric} from "fabric";

export default function Manager(){
    // const dispatch = useDispatch();
    const [designData, setDesignData] = useState([]);
    const [selectedDesignData, setSelectedDesignData] = useState({});
    const [showSwapPanel, setShowSwapPanel] = useState();

    useEffect(() => {
        setTimeout(() => {
            setDesignData(moodBoardData);
        }, [3000])
    }, []);


    const getImageDimensions = (src) => {
        let data;
        const imgObj = new Image();
        imgObj.src = src;

        imgObj.onload = function () {
            data = { width: imgObj.width, height: imgObj.height}
        };
        return data;
    }
    const getScaleAndPosition = ( data) => {
        const placeHolderStroke = 1;
        const { width, height, left, top, items } = data;
        const placeHolderWidth = width;
        const placeHolderHeight = height;
        return new Promise((resolve, reject) => {
            const imgObj = new Image();
            imgObj.src = items[0].image;

            imgObj.onload = function () {
                data = { width: imgObj.width, height: imgObj.height}
                const imgWidth = imgObj.width, imgHeight = imgObj.height;
                const scaleToWidth = (placeHolderWidth - placeHolderStroke)/imgWidth;
                const scaleToHeight = (placeHolderHeight - placeHolderStroke)/imgHeight;
                let scale = scaleToWidth*imgHeight <= (placeHolderHeight - placeHolderStroke) ? scaleToWidth : scaleToHeight;
                console.log('width/scale', scale , imgWidth)
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
        let newData = [];
        if(data?.placeHolders){
            for(let i=0;i<data.placeHolders.length;i++){
                const { left, top, items } = data.placeHolders[i];
                const {width, height} = await getScaleAndPosition(data.placeHolders[i])
                let obj = {
                    width,
                    height,
                    left,
                    top,
                    src: items[0].image,
                    items
                };
                newData.push(obj);
            };
            console.log('see now is ....', {
                id: data.id,
                placeHolders: newData
            })
            setSelectedDesignData({
                id: data.id,
                placeHolders: newData
            })
        }
    };

    useEffect(() => {
        handleSelectedDesign(designData[0]);
    }, [designData])

    const previousDesign = () => {
        const index = designData.findIndex(i => i.id === selectedDesignData.id);
        if(index === 0){
            handleSelectedDesign(designData[designData.length-1])
        } else {
            handleSelectedDesign(designData[index - 1])
        }
    }

    const nextDesign = () => {
        const index = designData.findIndex(i => i.id === selectedDesignData.id);
        if(index === designData.length-1){
            handleSelectedDesign(designData[0])
        } else {
            handleSelectedDesign(designData[index + 1])
        }
    }

    const toggleSwapPanel = (index) => {
        if(index === undefined || showSwapPanel === index){
            setShowSwapPanel(null);
            return;
        }
        setShowSwapPanel(index)
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
                        {selectedDesignData?.placeHolders?.map( (p, index) => {
                            console.log('ppppppppppppppp', p);
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
                    <div>5,600 SAR</div>
                    <button>
                        <img src={cartIcon} />
                    </button>
                </div>
            </div>
        </>
    )
}
