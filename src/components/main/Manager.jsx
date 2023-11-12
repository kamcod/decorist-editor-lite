import {useEffect, useState} from "react";
import { fabric } from "fabric";
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
            height: 600,
            width: 1200,
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
            <div className="manager-wrapper grow relative" id="canvas-wrapper">
                <div className="canvas-container flex justify-center py-10">
                    <canvas  id="editor-canvas" />
                </div>
            </div>
        </>
    )
}
