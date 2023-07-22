import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

const Home = () => {
    const [apiOne, setApiOne] = useState('harry+potter');
    const [apiTwo, setApiTwo] = useState('Sherlock+Holmes');
    const [dataOne, setDataOne] = useState([]);
    const [dataTwo, setDataTwo] = useState([]);
    const [card, setCard] = useState({});
    const [err, setError] = useState("")

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${apiOne}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDataOne(data.items);
            })
            .catch((err) => {
                console.log(err);
                setError('Please enter a valid mavie name');
            });

        if (apiTwo.length > 0) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${apiTwo}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setDataTwo(data.items);
                })
                .catch((err) => console.log(err));
        }
    }, [apiOne]);

    return (
        <div>
            <NavBar setApiOne={setApiOne} setApiTwo={setApiTwo} />
            {
                Object.keys(card).length !== 0 ?
                    <div>
                        <div className='clicked-container'>
                            {console.log(card)}
                            <div className='clicked-img'>
                                <img src={card.volumeInfo.imageLinks.thumbnail} alt={card.volumeInfo.title} />
                            </div>
                            <div className='clicked-description'>
                                <div className='clicked-title'>
                                    <h1>{card.volumeInfo.title}</h1>
                                    <p>Published on : {card.volumeInfo.publishedDate}</p>
                                </div>
                                <span>{card.volumeInfo.authors[0]}</span>
                                <div className='clicked-details'>{card.volumeInfo.description}</div>
                                <div className='rating-container'>
                                    <p>Avg Rating : {card.volumeInfo.averageRating}</p>
                                    <p>Rating Count : {card.volumeInfo.ratingsCount}</p>
                                    <p>Publisher : {card.volumeInfo.publisher}</p>
                                    <p>Language : {card.volumeInfo.language}</p>
                                </div>
                                <div className='clicked-button-container'>
                                    <button><a href={card.volumeInfo.previewLink} target='_blank'>Now Read</a></button>
                                    <button><a href={card.volumeInfo.infoLink} target='_blank'>More Info</a></button>
                                </div>
                            </div>
                        </div>
                        <h1>More Books Like This</h1>
                    </div>
                    :
                    <div>
                        <p>{err}</p>
                    </div>
            }
            <div className='api-one-container'>
                {
                    Object.keys(dataOne).length !== 0 ?
                        dataOne.map((data) => (
                            <div key={data.id} className='one-card'>
                                <div>
                                    <img src={data.volumeInfo.imageLinks.thumbnail} alt={data.volumeInfo.title} />
                                </div>
                                <div className='description-container'>
                                    <p className='title'>{data.volumeInfo.title}</p>
                                    <div className='over'>
                                        <p>{data.volumeInfo.description}</p>
                                    </div>
                                    <button onClick={() => setCard(data)}>Now Read</button>
                                </div>
                            </div>
                        ))
                        :
                        <div>
                            <p>{err}</p>
                        </div>
                }
            </div>
            <h1>More Books</h1>
            <div className='api-one-container'>
                {
                    Object.keys(dataTwo).length !== 0 ?
                        dataTwo.map((data) => (
                            <div key={data.id} onClick={() => setCard(data)}>
                                <div>
                                    <img src={data.volumeInfo.imageLinks.thumbnail} alt={data.volumeInfo.title} />
                                </div>
                            </div>
                        ))
                        :
                        <div>
                            <p>{err}</p>
                        </div>
                }
            </div>
            <div className='footer'></div>
        </div>
    )
}

export default Home;