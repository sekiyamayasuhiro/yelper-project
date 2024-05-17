import { useState } from 'react'
import './SearchBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBusinesses} from '../../redux/business'


function SearchBar() {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')



    const prices = ['$', '$$', '$$$', '$$$$']
    const categories = ['Restaurant', 'Coffee', 'Gym', 'Salon']

    const handleToggle = (type, value) => {
        if (type === 'category') {
            setCategory((prevCategory) => (prevCategory === value ? '' : value));
        } else if (type === 'price') {
            setPrice(prevPrice => (prevPrice === value ? '' : value))
        }
    }

    const handleSubmit =  (e) => {
        e.preventDefault()
        dispatch(getAllBusinesses({name, price, category}))
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
                            {prices.map((price, index) => (
                            <button key={index} value={price} onClick={() => handleToggle('price', price)}>{price}</button>
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
