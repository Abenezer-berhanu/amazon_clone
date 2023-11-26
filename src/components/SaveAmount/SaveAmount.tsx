import PriceRounder from '@/utils/PriceRounder'
import React from 'react'

function SaveAmount(props:{oldPrice:number, price:number}) {
  return (
    <p className="absolute top-2 text-sm font-bold hover:underline right-2 tracking-wide animate-bounce">
            {props.oldPrice ? <>!save: <PriceRounder amount={Number(props.oldPrice! - props.price)} /></> : ""}
          </p>
  )
}

export default SaveAmount