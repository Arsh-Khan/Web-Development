"use client"
import Header from '@/components/Header'
import Image from 'next/image'
import { useState,useEffect } from 'react';

export default function Home() {

  const [productForm, setProductForm] = useState({})
  const [products, setproducts] = useState([])
  const [alert, setalert] = useState("")
  const [query, setquery] = useState("")
  const [loading, setloading] = useState(false)
  const [loadingaction, setloadingaction] = useState(false)

  const [dropdown, setdropdown] = useState([])

  useEffect(() => {
    const fetchProducts = async()=>{
      const response = await fetch('/api/product')
      let rjson = await response.json()
      setproducts(rjson.products) 
    }
    fetchProducts()
  }, [])
  

  const handleChange = (e)=>{
    setProductForm({...productForm,[e.target.name]:e.target.value})
  }

  const addProduct = async (e)=>{
    e.preventDefault()

    try{
      const response = await fetch('/api/product',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(productForm)
      })

      if (response.ok){
        //product added successfully
        console.log("Product added successfully")
        setalert("Your product is added")
        setProductForm({})
      }else{
        console.log("Error adding product")
      }
    }catch(error){
      console.log(error)
    }
    //fetch all the products to sync back
    const response = await fetch('/api/product')
      let rjson = await response.json()
      setproducts(rjson.products)
  }

  const onDropdownEdit = async(e)=>{
    let value = e.target.value
    setquery(value)
    if(value.length>3){
      setloading(true)
      const response = await fetch('/api/search?query='+ query)
      let rjson = await response.json()
      setdropdown(rjson.products)
      setloading(false) 
    }else{
      setdropdown([])
    }
  }

  const buttonAction = async(action,slug,initialQuantity)=>{
    // immediately change the quantity of the product with given slug in Products
    let index = products.findIndex((item)=> item.slug == slug)
    let newProducts = JSON.parse(JSON.stringify(products))
    if(action == 'plus'){
      newProducts[index].quantity = parseInt(initialQuantity)+1
    }else{
      newProducts[index].quantity = parseInt(initialQuantity)-1
      
    }
    setproducts(newProducts)
    
    // immediately change the quantity of the product with given slug in Dropdown
    let indexdrop = dropdown.findIndex((item)=> item.slug == slug)
    let newDropdown = JSON.parse(JSON.stringify(dropdown))
    if(action == 'plus'){
      newDropdown[indexdrop].quantity = parseInt(initialQuantity)+1
    }else{
      newDropdown[indexdrop].quantity = parseInt(initialQuantity)-1
      
    }
    setdropdown(newDropdown)
    
    setloadingaction(true)

    const response = await fetch('/api/action',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({action,slug,initialQuantity})
    })

    let r = await response.json()
    console.log(r)

    setloadingaction(false)

  }

  return (
    <>
      <Header />
      <div className='text-center text-green-800'>{alert}</div>
      <div className='container  mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Search a product</h1>
        <div className='flex mb-2'>
          <input type="text" onChange={onDropdownEdit} placeholder='Enter a product' className='flex-1 border border-gray-500'/>
          <select className='border border-gray-300 px-4 py-2 rounded-r-md'>
            <option value="">All</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
        </div>
          {
            loading && <div className="flex justify-center items-center">
              <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
              margin: "auto",
              background: "none",
              display: "block",
              shapeRendering: "auto",
            }}
            width="40px"
            height="40px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#000000"
              strokeWidth="10"
              r="35"
              strokeDasharray="164.93361431346415 56.97787143782138"
              transform="rotate(108 50 50)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
              ></animateTransform>
            </circle>
          </svg>
            </div> 
          }
          <div className="dropcontainer absolute w-[80vw] border-1 bg-purple-100 rounded-r-md">
          {dropdown.map(item =>{
            return <div key={item.slug} className="container flex justify-between bg-purple-200 my-3 border-b-2">
              <span className='slug'>{item.slug} ({item.quantity} available for ₹{item.price})</span>
              <div className="mx5">
              <button onClick={()=>{buttonAction("minus",item.slug,item.quantity)}} disabled={loadingaction} className='subtract inline-block px-3 py-1 cursor-pointer bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200'>-</button>
              <span className='quantity mx-3'>{item.quantity}</span>
              <button disabled={loadingaction} onClick={()=>{buttonAction("plus",item.slug,item.quantity)}} className='add inline-block px-3 py-1 cursor-pointer bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200'>+</button>
              </div>
            </div>
          }
          )}
         </div> 
      </div>

      <div className='container  mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Add a product</h1>
        <form>
          <label htmlFor='productName' className='block mb-2'>Product Slug:</label>
          <input
          name='slug'
            type='text'
            id='productName'
            className='w-full border border-grey-300 px-4 py-2'
            onChange={handleChange}
            value={productForm?.slug || ""}
          />
          <label htmlFor='productQuantity' className='block mb-2'>Product Quantity:</label>
          <input
          name='quantity'
            type='number'
            id='productQuantity'
            className='w-full border border-grey-300 px-4 py-2'
            onChange={handleChange}
            value={productForm?.quantity || ""}
          />
          
          <label htmlFor='price' className='block mb-2'>Price:</label>
          <input
            name='price'
            type='number'
            id='price'
            className='w-full border border-grey-300 px-4 py-2'
            onChange={handleChange}
            value={productForm?.price || ""}
          />
          <button onClick={addProduct} type='submit' className='bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl'>Add Product</button>
        </form>
    </div>
          
      <div className='container my-6  mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Current Stock</h1>

        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Product Name</th>
              <th className='px-4 py-2'>Quantity</th>
              <th className='px-4 py-2'>Price</th>
            </tr>
          </thead>
          <tbody>
            { products.map(product=>{
              return <tr key={product.slug}>
              <td className='border x-4 py-2'>{product.slug}</td>
              <td className='border px-4 py-2'>{product.quantity}</td>
              <td className='border px-4 py-2'>₹{product.price}</td>
            </tr>
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
