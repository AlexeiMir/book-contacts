import React from 'react'

export const AboutList = ({obj}) => {
    return (
        <ul>
            {Object.keys(obj).map(key =>
                <li key={key}>
                    {/*All properties begin with capital letter */}
                    <span><b>{key.charAt(0).toUpperCase()+key.slice(1)}:</b></span>
                    {/*Check if properties object or string*/}
                    <span><span>
                                        {obj[key] instanceof Object
                                            ? 'Coordinates'
                                            :obj[key]
                                        }</span></span>
                </li>)}
            </ul>
            )
            }
