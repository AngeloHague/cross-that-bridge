import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React from 'react'
import { useOverlay } from './OverlayContext';
import Heading from './Heading';

export default function Overlay({ title, children, fill=true, closeBtn=true }) {

  const { closeOverlay } = useOverlay();

    const handleClose = () => {
        closeOverlay(); 
    };

    let classlist = "Overlay p-6 text-white open"

    return (
        <div className={classlist}>
            <div className={(fill) ? 'App-Window fill' : 'App-Window'}>
                <div className='w-full flex justify-end'>
                    {closeBtn ? <div className='w-16 h-16 flex-shrink-0'></div> : <></>}
                    {title ? 
                    <h6 className="w-full uppercase text-2xl font-medium h-16 flex items-center justify-center">{title}</h6> : <></>}
                    {closeBtn ? <button className='p-4' onClick={handleClose}><FeatherIcon icon={"x"} size={32} /></button> : <></>}
                </div>
                {children}
            </div>
        </div>
    )
}
