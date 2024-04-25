import React from 'react'

const ProfileInfo = ({title, content}) => {
  return (
    <div className="flex flex-row gap-[1rem] font-bold">
        <p className="text-[2rem] text-secondary ">{title}:</p>
        <p className="text-[2rem] text-white">{content}</p>

    </div>
  )
}

export default ProfileInfo