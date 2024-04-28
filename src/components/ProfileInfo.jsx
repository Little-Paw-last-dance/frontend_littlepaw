import React from 'react'

const ProfileInfo = ({title, content}) => {
  return (
    <div className="flex flex-row gap-[1rem] font-roboto font-bold">
        <p className="text-[2rem] text-third ">{title}:</p>
        <p className="text-[2rem] text-fourth">{content}</p>

    </div>
  )
}

export default ProfileInfo