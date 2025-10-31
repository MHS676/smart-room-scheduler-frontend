import React from 'react'


export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => (
    <button {...rest} className={`px-4 py-2 rounded bg-blue-600 text-white ${rest.className ?? ''}`}>{children}</button>
)


export default Button