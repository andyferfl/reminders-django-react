import React from 'react'
import { useState } from 'react';

function ReminderFilters({filterHandler, searchHandler, categories, resetHandler}) {
     const [checked, setChecked]= useState([])
    return (
        <div>
            <form onSubmit={(event)=>filterHandler(event, checked)} 
            onReset={(event) => {resetHandler(event); setChecked([])}} className='row mx-5 justify-content-start my-4'>

                <div className='col-md-2'>
                    <label className='form-label text-white'>Date</label>
                    <input type='date' name='date' className='form-control mb-3 text-center'/> 
                </div>

                <div className='col-md-2'>
                    <label className='form-label text-white'>Importance</label>
                    <select name='importance' className='form-select mb-3 '>
                        <option value=''></option>
                        <option value='low'>Low importance</option>
                        <option value='medium'>Medium importance</option>
                        <option value='high'>High importance</option>
                    </select> 
                </div>
                                
                <div className= 'col-md-6'>
                    <label className='form-label text-white'>Categories</label>
                    <div>
                        {categories.map((itemCategory) => (
                            <div className='form-check form-check-inline' key={itemCategory.id}>
                                <input className='form-check-input' type='checkbox' 
                                onChange={()=>{
                                    checked.indexOf(itemCategory.id) > -1 ?
                                    checked.splice(checked.indexOf(itemCategory.id),1) :
                                    checked.push(itemCategory.id);
                                }} value={itemCategory.id} name={itemCategory.category}/>
                                <label className='form-check-label text-white' >{itemCategory.category}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <button type='submit' className='btn btn-primary col-md-3 mt-3'>Filter</button>
                <div className='col-md-2 align-self-center mt-3'>
                    <button type='reset' className='btn btn-primary mt-1'>Clear</button>
                </div>
            </form>
            <form onSubmit={searchHandler} className='form-inline mx-5 my-4'>
                <div className='input-group'>
                    <input type='text' name='search' placeholder='text to search' className='form-control col-md-3'/> 
                    <button type='submit' className='btn btn-primary col-md-3'>Search</button>
                </div> 
            </form>
        </div>
    )
}

export default ReminderFilters