import React from 'react'
import { Suspense } from "react";
import Subcategories from '@/components/Subcategories';
const SubcategoriesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Subcategories/>
    </Suspense> 
  )
}

export default SubcategoriesPage
