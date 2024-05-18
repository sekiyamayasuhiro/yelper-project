import { useState } from 'react'
import './SearchBar.css'
import { useDispatch } from 'react-redux'
import { getAllBusinesses} from '../../redux/business'
import { useNavigate } from 'react-router-dom'



function SearchBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')

    const prices = {1: '$', 2: '$$', 3: '$$$', 4: '$$$$'}
    const categories = ['Restaurant', 'Coffee', 'Gym', 'Salon']

    const handleToggle = (type, value) => {
        navigate('/')
        if (type === 'category') {
            setCategory((prevCategory) => (prevCategory === value ? '' : value));
        } else if (type === 'price') {
            setPrice(prevPrice => (prevPrice === +value ? '' : +value))
        }
    }

    const handleSubmit =  (e) => {
        e.preventDefault()
        navigate('/')
        dispatch(getAllBusinesses({name, price, category}, navigate))
    }

    return (
        <div >
            <form className="search-bar" onSubmit={handleSubmit}>
                <div className='input-group'>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Business Name' className='name'/>
                    <div className='price-category'>
                        <span>
                        Category
                        <div className='category'>
                        {categories.map((category, index) => (
                            <button key={index} value={category} onClick={() => handleToggle('category', category)}>{category}</button>
                        ))}
                        </div>
                        </span>
                        <span>
                            Price
                            <div className='price'>
                            {Object.entries(prices).map(([key, val]) => (
                            <button key={key} value={key} onClick={() => handleToggle('price', key)}>{val}</button>
                            ))}
                            </div>
                        </span>
                    </div>

                </div>
                <button>Search</button>
            </form>
        </div>

    )
}

export default SearchBar
