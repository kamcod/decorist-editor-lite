import {useEffect, useState} from "react";
import { fabric } from "fabric";
import dislikeIcon from "../../assets/icons/dislike.svg";
import heartIcon from "../../assets/icons/heart.svg";
import shareIcon from "../../assets/icons/arrow-share.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import cartIcon from "../../assets/icons/cart.svg";

import { FormattedMessage } from "react-intl";
// import {setCanvas, setActiveObject} from "../../store/editor/editorSlice";
// import {useDispatch, useSelector} from "react-redux";

export default function Manager(){
    // const dispatch = useDispatch();

    const selectionCreated = (e) => {
        let canvasObject = e.selected[0];
        // dispatch(setActiveObject(canvasObject));
    };
    const selectionUpdated = (e) => {
        let canvasObject = e.selected[0];
        // dispatch(setActiveObject(canvasObject));
    };
    const selectionCleared = () => {
        // dispatch(setActiveObject(null));
    };

    const initEvents = (canvas) => {
        canvas.on({
            // 'object:modified': modifiedObject,
            "selection:created": selectionCreated,
            "selection:updated": selectionUpdated,
            "selection:cleared": selectionCleared,
            // 'object:added': addedObject,
            // 'object:removed': objectRemoved,
            // 'object:moving': objectMoved,
            // 'object:scaling': objectScaled,
            // 'object:rotating': objectRotated,
            // 'drop': objectDropped,
            // 'mouse:move': mouseMove,
            // 'mouse:down': mouseDown,
            // 'mouse:up': mouseUp,
            // 'after:render':createBoundingRect,
            //'text:changed': adjustTextLine
        });
    };
    const initializeFabricCanvas = () => {
        let tempCanvas = new fabric.Canvas("editor-canvas", {
            targetFindTolerance: 10,
            selection: true,
            preserveObjectStacking: true,
            height: window.innerHeight * 0.45,
            width: window.innerWidth/2 * 0.8,
            backgroundColor: "white",
        });

        tempCanvas.on("object:added", function (o) {
            o.target.setControlsVisibility({
                bl: true,
                br: true,
                mb: false,
                ml: false,
                mr: false,
                mt: false,
                tl: true,
                tr: true,
                mtr: false,
            });

        });
        initEvents(tempCanvas);
        tempCanvas.renderAll();
        window.canvas = tempCanvas;
        // dispatch(setCanvas(tempCanvas));
    }
    useEffect(()=>{
        // CANVAS INITIALIZED FOR THE FIRST TIME WHEN COMPONENT LOADS
        initializeFabricCanvas()
    },[]);

    return (
        <>
            <div className="pt-5" id="canvas-wrapper">
                <div className="border-4 border-black rounded-2xl canvas-container flex flex-col justify-center py-10">
                    <canvas id="editor-canvas" />
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
                    <button className="generate-btn py-2 px-5">Previous</button>
                    <button className="generate-btn py-2 px-8">Next</button>
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