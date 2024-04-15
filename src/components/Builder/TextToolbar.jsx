import { IconButton } from "@material-tailwind/react";

import { MdBookmarkBorder } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { MdSpatialAudio } from "react-icons/md";

export default function TextToolbar() {
    return (
        <div className='
            w-full 
            flex 
            flex-row 
            pt-1 
            group-hover:opacity-1
            group-focus:opacity-1
            group-hover:delay-75
        '>
            <IconButton
                ripple={false}
                className="bg-transparent h-5 w-5 mr-2"
            >
                <i>
                    <MdBookmarkBorder className="text-lg" />
                </i>
            </IconButton>
            <IconButton
                ripple={false}
                className="bg-transparent h-5 w-5 mr-2">
                <i>
                    <MdContentCopy className="text-lg " />
                </i>
            </IconButton>
            <IconButton
                ripple={false}
                className="bg-transparent h-5 w-5" >
                <MdSpatialAudio className="text-lg" />
            </IconButton>
        </div>
    )
}
