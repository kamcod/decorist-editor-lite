import Manager from "./Manager";
import titleBack from "../../assets/images/titleBack.svg";
import {FormattedMessage} from "react-intl";

export default function Home(){
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
                <div className="">
                    <div className="flex justify-center items-center flex-col">
                        <img src={titleBack} />
                        <div className="-translate-y-12 text-2xl">
                            <FormattedMessage id="getYourDesign" />
                        </div>
                    </div>
                </div>
                <div className="">
                    <Manager />
                </div>
            </div>
        </>
    )
}
