import React from 'react'

export default function Heading({align="center", children}) {
    
    return (
        <h6 className="w-full uppercase text-2xl font-medium ">{children}</h6>
    )
}
