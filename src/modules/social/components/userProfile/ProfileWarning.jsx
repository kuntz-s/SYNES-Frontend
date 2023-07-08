import React from 'react'

const ProfileWarning = ({data}) => {
  return (
    <section className='w-full'>
    {
     data.avertissementList.length === 0 ? (<div className='h-[20vh] flex flex-col justify-center items-center'>
       <p className='text-lg'>Aucun avertissement publié pour le moment</p>
     </div>):(<div className='h-[20vh] flex flex-col justify-center items-center'>
       <p className='text-lg'>L'utilisateur a deux avertissements</p>
     </div>)
    }
   </section>
  )
}

export default ProfileWarning