import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import AuthContext from '../context/AuthContext'

class MediaList extends React.Component {

    static contextType = AuthContext;

    constructor(props){
        super(props);

        this.state = {
            items: [],
            loading: true
        }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/media/')
            .then((res) => { 
                if (!res.ok)
                {
                    console.log('Media loading error: ' + res.statusText);
                }
                return res.json();})
            .then((json) => {
                this.setState({
                    items: json,
                    loading: false
                });
            })
    }

    render(){

        const {items, loading} = this.state;
        if (loading) return <div><h1>Please wait...</h1></div>

        return (
            <div className="w-100 mb-2">
                <Carousel>
                    {items.map((item) => ( 
                        <Carousel.Item key={item.id}>
                            <img
                                className="d-block w-100"
                                src={item.photo}
                                alt={'slide '+items.indexOf(item).toString()}
                                style={{width: 800, height: 600, objectFit: 'cover'}}
                            />
                            <Carousel.Caption>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))} 
                </Carousel>
            </div>
        )
    }
}

export default MediaList
