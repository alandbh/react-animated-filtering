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
  let [hlPosition, setHlPosition] = useState({left: 0, width: 50});

  useEffect(() => { // Used for calling a function as soon as the component is mounted on screen.
    
    setShuffleInstance(category);

  }, []);

 let highlightStyles = {
    left: hlPosition.left,
    width: hlPosition.width,
    bottom: 0,
    position: 'absolute',
    display: 'inline-block',
    height: 3,
    backgroundColor: 'orange',
}

function filterBy(cat, evt) {
  evt.persist()
  shuffleInstance.filter(cat);
  setCategory(cat);
  // evt.target.className = 'active';
  console.log(evt);

  setHlPosition({left: evt.target.offsetLeft, width: evt.target.offsetWidth});

}


return (
    
    <div className="App">
      <h1>Showing "{category || 'All'}" photos</h1>
      <div className="filter-container">
        
        <button style={category === 'space' ? buttonStyles.active : {}} onClick={(evt) => filterBy('space', evt)}>Space</button>
        <button style={category === 'animal' ? buttonStyles.active : {}} onClick={(evt) => filterBy('animal', evt)}>Animal</button>
        <button style={category === 'travel' ? buttonStyles.active : {}} onClick={(evt) => filterBy('travel', evt)}>Travel</button>
        <button style={category === '' ? buttonStyles.active : {}} onClick={(evt) => filterBy('', evt)}>All</button>
        <span style={highlightStyles}></span>
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
