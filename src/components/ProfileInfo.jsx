import React from 'react'

/**
 * Componente que muestra una sección de información de perfil, con un título y un contenido.
 * 
 * @component
 * 
 * @param {String} title - Título de la sección de información.
 * @param {String} content - Contenido de la sección de información.
 * 
 * @returns {React.Component} - Componente de información de perfil.
 * 
 * @example
 * // Ejemplo de uso:
 * <ProfileInfo title="Nombre" content="Juan Pérez" />
 */

const ProfileInfo = ({title, content}) => {
  return (
    <div className="flex flex-row gap-[1rem] font-roboto font-bold">
        <p className="text-[2rem] text-third ">{title}:</p>
        <p className="text-[2rem] text-fourth">{content}</p>

    </div>
  )
}

export default ProfileInfo