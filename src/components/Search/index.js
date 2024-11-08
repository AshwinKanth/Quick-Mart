import React from "react";
import { Component } from "react";

import { IoSearchCircle } from "react-icons/io5";

import "./index.css"

class Search extends Component {
    render() {
        return (
            <div className="search-container">
                <IoSearchCircle  size={25}/>
                <input type="search" className="searchInput"  placeholder="Search for products..." />
            </div>
        )
    }
}

export default Search
