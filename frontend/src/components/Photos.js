import React from 'react'
import AuthContext from '../context/AuthContext'

class Photos extends React.Component {

    static contextType = AuthContext;

    constructor(props){
        super(props);

        this.state = {
            items: [],
            loading: true,
            limit: 2,
            offset: 0,
            hasMore: true,
            maxItems: 0,
        }

        window.onscroll = () =>{
            const {loading, hasMore} = this.state;
            if (loading || !hasMore) return;
            if (document.documentElement.scrollHeight -
                document.documentElement.scrollTop ===
                document.documentElement.clientHeight)
            {
                this.loadPhotos()
            }
        }

        this.uploadHandler = this.uploadHandler.bind(this);
    }

    loadPhotos() {

        const {authTokens, logoutUser} =  this.context;
        const {limit, offset, items} = this.state;
        let token = 'Bearer ' + String(authTokens.access);
        let url =  'http://127.0.0.1:8000/api/photos/?limit='+limit+'&offset='+offset;
        fetch(url,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':token,
                },
            })
            .then((res) => { 
                if(res.statusText === 'Unauthorized')
                {
                    logoutUser();
                }
                if (!res.ok)
                {
                    console.log('Media loading error: ' + res.statusText);
                }
                return res.json();})
            .then((json) => {
                this.setState({
                    items: [...items, ...json.results],
                    loading: false,
                    offset: offset + limit,
                    hasMore: ((json.count <= (offset + limit))? false : true)
                });
            })
    }

    async uploadPhoto (file) {
        try {
            let data = new FormData()
            data.append('photo', file)
            console.log(data)

            let {authTokens, logoutUser} = this.context;
            let token = 'Bearer ' + String(authTokens.access);
    
            let response = await fetch('http://127.0.0.1:8000/api/photos/', {
                method:'POST',
                headers:{
                    'Authorization':token,
                },
                body:data
            })
        
            if (!response.ok){
                if (response.statusText === 'Unauthorized'){
                    logoutUser();
                }
                console.log(response.statusText)
            }  
            else {
                alert('Photo added succesfully!')
            } 
        } catch (error) {
            console.log(error)
        }
    }

    uploadHandler(e) {
        e.preventDefault();
        let file = e.target.photo.files[0];
        if (!file){
            alert('Select a file to upload');
            return;
        }

       this.uploadPhoto(file);
       e.target.reset();
    }

    componentDidMount() {
        this.loadPhotos()
    }

    render(){

        const {items, loading} = this.state;
        if (loading) return <div><h1>Please wait...</h1></div>

        return (
            <div className='d-flex flex-column justify-content-center align-items-center'>

                <form className='form-inline mb-4' onSubmit={this.uploadHandler}>
                    <div className='input-group'>
                        <input className='form-control col-md-3' type='file' name='photo' accept='image/*'/>
                        <button type='submit' className='btn btn-primary col-md-3'>Upload</button>
                    </div>
                </form>

                <div className='row mx-5 justify-content-center' style={{overflowY:'scroll', flex: 1}}>
                    {items.map((item) => ( 
                            <img className='my-2'
                                src={item.photo}
                                alt={'slide '+items.indexOf(item).toString()}
                                style={{width: 800, height: 600, objectFit: 'cover'}}
                            />
                    ))} 

                </div>
            </div>
        )
    }
}

export default Photos
