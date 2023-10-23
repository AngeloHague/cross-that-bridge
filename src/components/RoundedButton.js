import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React from 'react'
import { AnimatedButton } from './MotionComponents'

export default function RoundedButton({ text, onClick, delay, icon="chevron-right" }) {
    return (
        <AnimatedButton delay={delay} className='soft-white rounded-2xl flex my-5 w-full box-border p-3 pl-4 justify-between' onClick={onClick}>
            <p className='uppercase text-xl font-semibold'>{text}</p>
            <FeatherIcon icon={icon} />
        </AnimatedButton>
    )
}
