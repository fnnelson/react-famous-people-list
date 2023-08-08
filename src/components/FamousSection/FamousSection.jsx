import React, { useState, useEffect } from 'react';
import './FamousSection.css';
import axios from 'axios';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function
  useEffect(() => {
    fetchPeople();
  }, [])

  const fetchPeople = () => {
    // TODO: fetch the list of people from the server
    axios.get('/people')
      .then((response) => {
        console.log("response.data", response.data)
        setPeopleArray(response.data)
      })
      .catch((error) => {
        console.log("error GET /creature", error)
      })
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);

    // TODO: create POST request to add this new person to the database
    axios.post('/people', { name: famousPersonName, role: famousPersonRole })
      .then((response) => {
        console.log("response.data", response)
        fetchPeople();
      })
      .catch((error) => {
        console.log("error in POST /creature")
      })
    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property

  }

  console.log("array right before render", famousPeopleArray)

  return (
    <section className="new-person-section">
      <form onSubmit={addPerson}>
        <label htmlFor="name-input">Name:</label>
        <input id="name-input" onChange={e => setPersonName(e.target.value)} />
        <label htmlFor="role-input">Famous for:</label>
        <input id="role-input" onChange={e => setPersonRole(e.target.value)} />
        <button type="submit">Done</button>
      </form>
      <p>
        {famousPersonName} is famous for "{famousPersonRole}".
      </p>
      <ul>
        {/* TODO: Render the list of famous people */}
        {famousPeopleArray?.map(person => (
            <li key= {person.id}>
              {person.name} is famous for "{person.role}".
            </li>
        ))}
      </ul>
    </section>
  );
}

export default FamousSection;
