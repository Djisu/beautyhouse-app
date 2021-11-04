import React, { useState } from 'react'

export default function SearchBox(props) {
  const [country, setCountry] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    props.history.push(`/search/country/${country}`)
  }
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          country="q"
          placeholder="Search for country"
          id="q"
          onChange={(e) => setCountry(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  )
}
