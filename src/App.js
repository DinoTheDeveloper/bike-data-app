import React, { useState, useEffect } from 'react';
import bikeData from './bikes_response.json';
import './App.css';

function App() {
  //here i created the variables as well as the states
  const [bikes, setBikes] = useState([]);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBikes, setFilteredBikes] = useState([]);


  //i also created the useeffct function here for the bike data and filter
  useEffect(() => {
    setBikes(bikeData);
    setFilteredBikes(bikeData);
  }, []);

  //sorting method that i added
  const handleSort = (field) => {
    const direction = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);

    const sortedBikes = [...filteredBikes].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredBikes(sortedBikes);
  };

  //searching methjod that i aded, can type in either lower or higher case
  const handleSearch = () => {
    const filtered = bikes.filter((bike) =>
      bike.Make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bike.Model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBikes(filtered);
  };


  //here is the basic table i created to show the data
  return (
    <div className="App">
      <h1>Dino's Bike Shop</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Make"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p></p>
        <button id='btnSearch' onClick={handleSearch}>Search</button>
      </div>
      <p>Click The Headings To Sort</p>
      <p></p>
      <table>
        <thead>
          <tr>
            <th id='Heading' onClick={() => handleSort('BikeID')}>ID</th>
            <th onClick={() => handleSort('Make')}>Make</th>
            <th onClick={() => handleSort('Model')}>Model</th>
            <th onClick={() => handleSort('Year')}>Year</th>
            <th onClick={() => handleSort('Displacement')}>Displacement</th>
            <th onClick={() => handleSort('Price')}>Price</th>
            <th onClick={() => handleSort('Terrain')}>Terrain</th>
            <th onClick={() => handleSort('Description')}>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredBikes.map((bike) => (
            <tr key={bike.BikeID}>
              <td>{bike.BikeID}</td>
              <td>{bike.Make}</td>
              <td>{bike.Model}</td>
              <td>{bike.Year}</td>
              <td>{bike.Displacement}</td>
              <td>${bike.Price}</td>
              <td>{bike.Terrain}</td>
              <td>{bike.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;