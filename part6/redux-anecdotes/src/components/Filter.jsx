import React from "react"
import { setFilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {

    const dispatch = useDispatch()
    const handleChange = (event) => {
        const inputValue = event.target.value
        dispatch(setFilter(inputValue))
        
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input name="filter" onChange={handleChange} />
        </div>
    )
}

export default Filter

