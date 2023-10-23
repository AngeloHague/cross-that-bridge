import React from 'react'
import Overlay from '../Overlay'
import { useOverlay } from '../OverlayContext'

export default function ConfirmDeletionModal({confirmFn}) {
    const { closeOverlay } = useOverlay();
    const btnClassList = "rounded-xl py-2 px-4 w-1/2 text-xl font-semibold"
    return (
        <Overlay title={"Are you sure?"} fill={false} closeBtn={false}>
            <div className='px-8 uppercase text-center font-medium text-2xl'>
                <p>Once deleted, its gone forever.</p>
            </div>
            <div className='flex justify-evenly items-center p-8 pt-4 gap-4'>
                <button className={btnClassList+' bg-cancel-red'} onClick={confirmFn}>DELETE</button>
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="36" viewBox="0 0 4 36" fill="none">
                    <path d="M2 2L2 34" stroke="white" stroke-width="4" stroke-linecap="round"/>
                </svg>
                <button className={btnClassList+' bg-grey-blue'} onClick={closeOverlay}>NO</button>
            </div>
        </Overlay>
    )
}
