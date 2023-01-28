import React from 'react'
import AuthContext from '../context/AuthContext'


class ReminderForm extends React.Component {

    static contextType = AuthContext;

    constructor(props){
        super(props);
        
        this.state = {
            categories: [],
            loading: true
        }

        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        let {authTokens, logoutUser} = this.context;
        let token = 'Bearer ' + String(authTokens.access);


       fetch('http://127.0.0.1:8000/api/categories/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':token,
            },
        }).then((res) => { 
            if (res.statusText === 'Unauthorized')
            {
                logoutUser();
            }
            return res.json();})
        .then((json) => {
            this.setState({
                categories: json,
                loading: false
            });
        })
    }

    async addReminder (data){
        let {authTokens, logoutUser} = this.context;
        let token = 'Bearer ' + String(authTokens.access);

        let response = await fetch('http://127.0.0.1:8000/api/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':token,
            },
            body:JSON.stringify(data)
        })
    
        if (!response.ok){
            if (response.statusText === 'Unauthorized'){
                logoutUser();
            }
            console.log(response.statusText)
        }   

        alert('Reminder added succesfully!')

    }

    submitHandler (e, checked) {
        e.preventDefault();

        const {categories} = this.state;

        if (e.target.title.value === '' || e.target.body.value === '' ||
            e.target.date.value === '' || e.target.time.value === ''){
                return;
        }

        let selectedCategories = []
        
        categories.map((itemCategory) => {
            let cat
            if(checked.indexOf(itemCategory.id) > -1) {
                cat = {
                    id: itemCategory.id,
                    category: itemCategory.category
                }
                selectedCategories.push(cat);
            }
            return itemCategory;
        })
    
        let reminder = {
            title:e.target.title.value,
            body:e.target.body.value,
            date:e.target.date.value,
            time:e.target.time.value,
            importance:e.target.importance.value,
            category:selectedCategories
        }

        this.addReminder(reminder)

        e.target.reset();
    }

         

    render(){
        const {categories, loading} = this.state;
        var checked = []

        if (loading) return <div><h1>Please wait...</h1></div>

        return (
            <form onSubmit={(event)=>this.submitHandler(event, checked)} className='row mx-5 justify-content-center my-4'>
                <div className= 'col-md-12'>
                    <label className='form-label text-white'>Title</label>
                    <input type='text' name='title' className='form-control mb-3'/> 
                </div>

                <div className='col-md-4'>
                    <label className='form-label text-white'>Date</label>
                    <input type='date' name='date' className='form-control mb-3'/> 
                </div>
                <div className='col-md-4'>
                    <label className='form-label text-white'>Time</label>
                    <input type='time' name='time' className='form-control mb-3'/> 
                </div>
                <div className='col-md-4'>
                    <label className='form-label text-white'>Importance</label>
                    <select name='importance' className='form-select mb-3 '>
                        <option value='low'>Low importance</option>
                        <option value='medium'>Medium importance</option>
                        <option value='high'>High importance</option>
                    </select> 
                </div>
                                
                <div className= 'col-md-12'>
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
                <div >
                    <label for='body' className='form-label text-white mt-3'>Body</label>
                    <textarea type='text' name='body' rows='5' className='form-control mb-3'/>
                </div>

                <button type='submit' className='btn btn-primary col-md-3'>Save</button>
            </form>
        )
    }
}

export default ReminderForm
