import React from 'react'
import AuthContext from '../context/AuthContext'
import ReminderFilters from './ReminderFilters';



class Reminders extends React.Component {

    static contextType = AuthContext;

    constructor(props){
        super(props);
        
        this.state = {
            items: [],
            loading: true,
            currentPage: 1,
            maxPages: 1,
            pageNumbers: [],
            categories: [],
            search:'',
            importance:'',
            filterCategories:[],
            date:'',
        };

        this.searchHandler = this.searchHandler.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
    }

    async getCategories(){
        try{
            const {authTokens, logoutUser} =  this.context;
            let token = 'Bearer ' + String(authTokens.access);        
            await fetch('http://127.0.0.1:8000/api/categories/',{
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
                    categories: json
                })
            })
        }catch (error){
            console.log(error);
        }
        
    }

    async getReminders(){
        try {
            let {authTokens, logoutUser} = this.context;
            let {currentPage, search, importance, filterCategories, date} = this.state;
            let token = 'Bearer ' + String(authTokens.access);
            let extra = ''
            if (currentPage){
                extra += '?page=' + String(currentPage);
            }
            if (search !== '' && search){
                extra += '&search=' + search; 
            }
            if (importance !== '' && importance){
                extra += '&importance=' + importance 
            }
            if (filterCategories && filterCategories.length > 0){
                filterCategories.map((cat) =>{
                    extra += '&category=' + cat; 
                    return cat;
                })
            }
            if (date !== '' && date){
                extra += '&date=' + date; 
            }
        
            let url = 'http://127.0.0.1:8000/api/'+extra;

            await fetch(url,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':token,
                },
            }).then((res) => { 
                if (res.statusText === 'Unauthorized' || !res.ok)
                {
                    logoutUser();
                }
                return res.json();})
            .then((json) => {
    
                const temp = []
                for (let i = 1; i <= Math.ceil(json.count / 8); i++) {
                    temp.push(i);       
                }
    
                this.setState({
                    items: json.results,
                    loading: false,
                    maxPages: Math.ceil(json.count / 8),
                    pageNumbers:temp
                });    
            })
        } catch (error) {
            console.log(error);
        }
        
    }


    componentDidMount() {
        this.getReminders() 
        this.getCategories()
    }
    
    handlePagination(number){
        this.setState({
            items:[],
            loading:true,
            currentPage:number
        }, () => {
            this.getReminders()
        }) 
    }

    filterHandler(e,checked){
        e.preventDefault();

        this.setState({
            currentPage: 1,
            loading:true,
            date: e.target.date.value,
            importance: e.target.importance.value,
            filterCategories: checked
        }, () => {
            this.getReminders()
        }) 
    }

    searchHandler(e){
        e.preventDefault();

        this.setState({
            search: e.target.search.value,
            currentPage: 1,
            loading: true
        }, () => {
            this.getReminders();
        })
    }

    resetHandler(e){
        this.setState({
            importance:'',
            filterCategories:[],
            date:'',
            currentPage: 1,
            loading: true
        }, () => {
            this.getReminders();
        })
    }

    renderReminders(){
        const {items} = this.state;
        return(
            <div className="row my-3 mx-5 row-cols-1 row-cols-md-4 g-1 bg-secondary">    
                {items.map((item) => (
                    <div className='col' key={'col'+item.id} >
                        <div className='card' key={item.id}>
                            <div className='card-header'>
                                <h4 className='card-title text-center'>{item.title}</h4>
                            </div>   
                            <div className='card-body'>
                                <p className='card-text'>
                                    {item.body}
                                </p>
                            </div>
                            <div className='card-footer'>
                                { item.importance === "low" &&
                                    <span className='badge rounded-pill bg-success '>{item.importance} importance</span>
                                }
                                { item.importance === "medium" &&
                                    <span className='badge rounded-pill bg-warning text-dark '>{item.importance} importance</span>
                                }
                                { item.importance === "high" &&
                                    <span className='badge rounded-pill bg-danger '>{item.importance} importance</span>
                                }
                                <span className='badge rounded-pill text-bg-light'>{item.date.toString().split('-').reverse().join('/')}
                                    &emsp;{item.time.toString().slice(0,item.time.toString().lastIndexOf(':'))}</span>
                                <div>
                                    {item.category.map((itemCategory) => (
                                        <span className='badge rounded-pill bg-secondary' key={'category'+itemCategory.id+item.id}>{itemCategory.category}</span>
                                    ))}
                                </div>  
                            </div>                           
                        </div>
                    </div>  
                ))} 
            </div>
        )
    }

    render(){
        const {loading, pageNumbers, categories} = this.state;
        //if (loading) return <div><h1>Please wait...</h1></div>

        return (
            <div>
                <ReminderFilters categories={categories} filterHandler={this.filterHandler} searchHandler={this.searchHandler} getReminders={this.getReminders} renderReminders={this.renderReminders} resetHandler={this.resetHandler}/>
                { !loading? this.renderReminders() : <div className='h-100 bg-secondary'><h1>Please wait...</h1></div>}        
                
                <nav className='bg-secondary pb-3'>
                    <ul className='pagination justify-content-center'>
                        {pageNumbers.map(number => (
                            <li key={number} onClick={() => this.handlePagination(number)} className='page-item'>
                                <a key={number}  href='#!' className='page-link'>
                                    {number}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>               
            </div>
        )
    }
}

export default Reminders
