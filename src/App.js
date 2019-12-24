import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.scss';
import Shuffle from 'shufflejs';


const buttonStyles = {
  active: {
    backgroundColor: '#c00',
    color: '#fff'
  }

}

const images = [
  {id: 1, cat: 'animal'},
  {id: 2, cat: 'space'},
  {id: 3, cat: 'travel'},
  {id: 4, cat: 'travel'},
  {id: 5, cat: 'travel'},
  {id: 6, cat: 'space'},
];

let shuffleInstance;

function setShuffleInstance(category) {
  shuffleInstance = new Shuffle(document.getElementById('grid'), {
    itemSelector: '.photo-item'
  });

  shuffleInstance.filter(category);
}

function App() {
  
  let [category, setCategory] = useState('');

  useEffect(() => { // Used for calling a function as soon as the component is mounted on screen.
    
    setShuffleInstance(category);

  }, []);


function filterBy(cat) {
  // evt.persist()
  shuffleInstance.filter(cat);
  setCategory(cat);
  // evt.target.className = 'active';
}


return (
    
    <div className="App">
      <h1>Showing "{category || 'All'}" photos</h1>
      <div>
        
        <button style={category === 'space' ? buttonStyles.active : {}} onClick={() => filterBy('space')}>Space</button>
        <button style={category === 'animal' ? buttonStyles.active : {}} onClick={() => filterBy('animal')}>Animal</button>
        <button style={category === 'travel' ? buttonStyles.active : {}} onClick={() => filterBy('travel')}>Travel</button>
        <button style={category === '' ? buttonStyles.active : {}} onClick={() => filterBy('')}>All</button>

      </div>
      <ul className="grid" id="grid">
        {
          images.map(
            index => <li key={index.id} data-groups={`["${index.cat}"]`} className="photo-item"><img src={`/images/image-0${index.id}.jpg`} alt="" /></li>
          )
        }
      </ul>
    </div>
  );
}

export default App;
