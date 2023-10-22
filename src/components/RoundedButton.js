import { Button, Text, View } from '@aws-amplify/ui-react'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React from 'react'

export default function RoundedButton({ text }) {
    return (
        <button className='soft-white rounded-2xl flex my-5 w-full box-border p-3 pl-4 justify-between'>
            <p className='uppercase font-semibold'>{text}</p>
            <FeatherIcon icon="chevron-right" />
        </button>
    )
}
