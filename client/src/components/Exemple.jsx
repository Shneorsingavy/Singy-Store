import React, { useState } from 'react'
const fruits = [
    {
      name: "Apple",
      color: "Red",
      description: "A sweet, crisp fruit that's great for snacking."
    },
    {
      name: "Banana",
      color: "Yellow",
      description: "A soft, creamy fruit that's rich in potassium."
    },
    {
      name: "Orange",
      color: "Orange",
      description: "A juicy citrus fruit, perfect for juice or snacking."
    },
    {
      name: "Grapes",
      color: "Purple",
      description: "Small, sweet berries often eaten fresh or used in wine."
    },
    {
      name: "Strawberry",
      color: "Red",
      description: "A juicy, sweet berry popular in desserts and salads."
    },
    {
      name: "Blueberry",
      color: "Blue",
      description: "A small, round berry that's high in antioxidants."
    },
    {
      name: "Pineapple",
      color: "Yellow",
      description: "A tropical fruit with a tangy, sweet flavor."
    },
    {
      name: "Mango",
      color: "Orange",
      description: "A tropical fruit with a smooth, creamy texture."
    },
    {
      name: "Kiwi",
      color: "Brown",
      description: "A small, fuzzy fruit with a bright green, tangy flesh."
    },
    {
      name: "Watermelon",
      color: "Green",
      description: "A large, juicy fruit with a sweet red interior."
    }
  ];
  
  

const Exemple = () => {
   
function onSearch(event){
    event.preventDefault();
    console.log(event);
    const searchQuery =  event.target.elements["search-q"].value;
 setQuery(searchQuery)

}

const[query, setQuery] = useState('')

const filterData = fruits.filter( item => item.name.toLowerCase().startsWith(query.toLowerCase()))
  return (
    <form onSubmit={onSearch}>
        <label htmlFor="">Search for a fruit:</label>
        <input onChange={(event)=>setQuery(event.target.value)} id="search-q" type="text" className='border-2' />
        <button type='submit' className='border-2 ml-2 bg-blue-500 rounded-2xl p-1 text-white'>Search</button>
    <div className='grid grid-cols-5 gap-4 mt-6'>
{filterData.map( (item, index)=> ( <div key={index} className='flex flex-col border-2 rounded-lg justify-center items-center p-2'><h1>{item.name}</h1> <h2>{item.color}</h2> <p>{item.description}</p></div>))}
    </div>
    </form>
  )
}

export default Exemple