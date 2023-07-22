import React, { useState } from 'react';
import Group from '../Assets/Images/Group.png'
import Search from '../Assets/Images/Vector.png'
import bookIcon from '../Assets/Images/book-heart.png'
import diamondIcon from '../Assets/Images/diamond.png'
import notificationIcon from '../Assets/Images/notification.png'
import accountIcon from '../Assets/Images/account.png'

const NavBar = (props) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        let arr = query.split(" ");
        let qur = arr.join("+");
        props.setApiOne(qur);
        props.setApiTwo([]);
        setQuery("");
    }
    return (
        <div className='navbar-container'>
            <div className='logo-container'>
                <img src={Group} alt='logo' />
                <div className='text'>
                    <span id='logo1'>KeazoN</span>
                    <span id='logo2'>BOOKS</span>
                </div>
            </div>

            <div className='search-container'>
                <img src={Search} alt='search-icon' />
                <input
                    type='text'
                    placeholder='Search for the book you want and read it now... Sherlock Holmes, Harry Pot...'
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className='account-container'>
                <img src={bookIcon} />
                <img src={notificationIcon} />
                <img src={diamondIcon} />
                <img src={accountIcon} />
            </div>
        </div>
    )
}

export default NavBar;