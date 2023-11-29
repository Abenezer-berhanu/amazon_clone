import React from 'react'

function Box({label, amount, index, price}: {label:string, amount: number , index:number |string, price?: boolean}) {
  return (
    <div className={`p-5 text-bold text-xl sm:text-2xl capitalize flex flex-col justify-start items-start text-white shadow-lg rounded-md
    ${index == 1 ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' 
    : index == 2 ? 'bg-gradient-to-r from-red-500 from-10% to-pink-500 to-90%'
    : index == 3 ? 'bg-gradient-to-r from-indigo-500 from-10% to-blue-400 to-90%'
    : 'bg-gradient-to-r from-purple-500 from-10% via-purple-300 via-30% to-pink-400 to-90%'}`}>
        <p>{label}</p>
        <p>{price && '$'}{amount}</p>
    </div>
  )
}

export default Box