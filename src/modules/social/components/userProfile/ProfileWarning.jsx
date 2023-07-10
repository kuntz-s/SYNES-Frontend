import React from 'react';
import {AiOutlineWarning} from "react-icons/ai";

const ProfileWarning = ({data}) => {
  console.log("avrit ",data)
  return (
    <section className='w-full'>
    {
     data.avertissementList.length === 0 ? (<div className='h-[20vh] flex flex-col justify-center items-center'>
       <p className='text-lg'>Aucun avertissement reçu pour le moment</p>
     </div>):(<div className='min-h-[20vh] flex flex-col justify-center items-center'>
       <p className='text-lg'>L'utilisateur a reçu {data.avertissementList.length} avertissement(s) qui est (sont):</p>
       {
        data.avertissementList.length > 0 && (
          <div className='flex justify-center items-enter mt-2 '>
            {
              data.avertissementList.map((avertissement,id)=> {
                return(<p key={id} className='flex items-center'><AiOutlineWarning className='mr-2 text-yellow-400 scale-[1.4]'/> <span className='text-md'>{avertissement.raison}</span></p>)
              })
            }
            </div>
        )
       }
     </div>)
    }
   </section>
  )
}

export default ProfileWarning