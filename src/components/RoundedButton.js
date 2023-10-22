import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React from 'react'

export default function RoundedButton({ text, onClick }) {
    return (
        <button className='soft-white rounded-2xl flex my-5 w-full box-border p-3 pl-4 justify-between' onClick={onClick}>
            <p className='uppercase text-xl font-semibold'>{text}</p>
            <FeatherIcon icon="chevron-right" />
        </button>
    )
}
