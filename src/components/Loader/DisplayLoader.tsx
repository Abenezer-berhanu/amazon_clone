import React from 'react'
import Loader from './Loader'

function DisplayLoader() {
  return (
    <div className="absolute left-[25%] right-[25%] width-[50%]">
        <Loader/>
    </div>
  )
}

export default DisplayLoader