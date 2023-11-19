import Manager from "./Manager";
import titleBack from "../../assets/images/titleBack.svg";
import {FormattedMessage} from "react-intl";

export default function Home(){
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
                <div>
                    <div className="flex justify-center items-center flex-col">
                        <img src={titleBack} />
                        <div className="-translate-y-16 w-1/2 text-center" style={{fontSize: '38px'}}>
                            <FormattedMessage id="getYourDesign" />
                        </div>
                        <div className="flex gap-5 justify-between py-10">
                            <select className="home-inputs-dropdown">
                                <option>Style</option>
                                <option>Style1</option>
                                <option>Style2</option>
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
                            <select className="home-inputs-dropdown">
                                <option>Color Palette</option>
                                <option>Color1</option>
                                <option>Color2</option>
                            </select>
                        </div>
                        <div className="py-16 w-1/2">
                            <button className="generate-btn w-full py-4">Generate</button>
                        </div>
                    </div>
                </div>

                <Manager />
            </div>
        </>
    )
}
