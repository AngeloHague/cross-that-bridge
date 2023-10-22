import React from 'react'

export default function Divider({className}) {
    return (
        <div className='w-full box-border px-8'>
            <div className={'Divider h-1 mt-3 mb-8 rounded w-full' + className}>
            </div>
        </div>
    )
}
