import {useEffect, useRef, useState} from "react";

export default function DropDown({options, selected, setSelected}){
    const menuRef = useRef();
    const [show, setShow] = useState(false);
    const selectedName = options?.find(i => i.id === selected);

    useEffect(() => {
        const clickOutSide = (event) => {
            if(menuRef.current && !menuRef.current.contains(event.target)){
                setShow(false);
            }
        };
        document.body.addEventListener('click', clickOutSide);

        return () => {
            document.body.removeEventListener('click', clickOutSide);
        }
    });

    return (
        <div className="relative inline-block text-left w-full">
            <div>
                <button type="button"
                        className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        id="menu-button" aria-expanded="true" aria-haspopup="true"
                        onClick={() => setShow(!show)}
                        ref={menuRef}
                >
                    {selectedName?.name || selectedName?.description}
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                         aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>

            {show && <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                    {options.map((option) => <div key={option.id} className="cursor-pointer">
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"
                               tabIndex="-1" id="menu-item-0">{option.name || option.description}</a>
                        </div>
                        )}
                </div>
            </div>}
        </div>
    )
}
