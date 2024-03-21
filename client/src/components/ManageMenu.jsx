import React from 'react'
import CategoryMenu from './CategoryMenu'
import FoodItems from './FoodItems'

const ManageMenu = () => {
  return (
    <>
     <h1>ManageMenu</h1>
    <CategoryMenu />
    <FoodItems userRole={"admin"} />
   
    </>
  )
}

export default ManageMenu