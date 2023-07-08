import React from 'react';
import event from "../../../../assets/img/event.svg"

const NoEvent = () => {
  return (
    <div className=" h-[80vh] flex flex-col justify-center items-center text-center ">
        <img src={event} alt="event" className='w-[150px] h-[150px]'/>
              <p className="font-medium text-xl">Aucun évènement trouvé</p>
              </div>
  )
}

export default NoEvent