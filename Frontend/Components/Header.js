import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className="flex justify-between bg-[#34495e] text-[#ecf0f1] p-3">
        <div className="Left flex list-none space-x-3">
            <li>Products</li>
            <li>Add Product</li>
        </div>
        <div className="Right flex list-none space-x-3">
          <Link href="/SignUp">
            <li>Sign Up</li>
          </Link>
            <li>Log In</li>
        </div>
    </div>
  )
}

export default Header