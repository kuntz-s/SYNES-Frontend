import React from 'react'

const ChartLegend = ({data, colors}) => {
  return (
    <div className='flex flex-wrap justify-around'>
        {
            data.map((elt,id)=> {
                return(
                    <div className="flex items-center mt-1" key={id}>
                        <p className='p-2  mr-1' style={{backgroundColor: colors[id% colors.length].hex}}></p>
                        <p className='font-thin'>{elt.name}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ChartLegend