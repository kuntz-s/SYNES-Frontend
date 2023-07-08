import React from 'react'



const ProfileAnnonce = ({data}) => {
  
  return (
    <section className='w-full'>
     {
      data.annonceList.length === 0 ? (<div className='h-[20vh] flex flex-col justify-center items-center'>
        <p className='text-lg'>Aucune annonce publiée pour le moment</p>
      </div>):(<div>il y'a une annonce</div>)
     }
    </section>
  )
}

export default ProfileAnnonce