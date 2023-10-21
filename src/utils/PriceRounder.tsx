import React from 'react'

function PriceRounder({amount}: any) {
  return (
    <>
        ${Math.round(amount)}
    </>
  )
}

export default PriceRounder