import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React from 'react'
import { useOverlay } from './OverlayContext';
import Heading from './Heading';

export default function Overlay({ title, children }) {

  const { closeOverlay } = useOverlay();

    const handleClose = () => {
        closeOverlay(); 
    };

    let classlist = "Overlay p-6 text-white open"

    return (
        <div className={classlist}>
            <div className='App-Window fill'>
                <div className='w-full flex justify-end'>
                    <div className='w-16 h-16 flex-shrink-0'></div>
                    {title ? 
                    <h6 className="w-full uppercase text-2xl font-medium flex items-center justify-center">{title}</h6> : <></>}
                    <button className='p-4' onClick={handleClose}><FeatherIcon icon={"x"} size={32} /></button>
                </div>
                {children}
            </div>
        </div>
    )
}
