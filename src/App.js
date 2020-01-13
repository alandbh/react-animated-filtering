import React, { useEffect, useState } from 'react';
import './App.scss';
import Shuffle from 'shufflejs';


const buttonStyles = {
  active: {
    backgroundColor: 'darkorange',
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

    const btnAll = document.querySelector('#btn-all');
    setHlPosition({left: btnAll.offsetLeft, width: btnAll.offsetWidth});

  }, []);

 let highlightStyles = {
    left: hlPosition.left,
    width: hlPosition.width,
    
}

function filterBy(cat, evt) {
  evt.persist()
  shuffleInstance.filter(cat);
  setCategory(cat);

  setHlPosition({left: evt.target.offsetLeft, width: evt.target.offsetWidth});

}

return (
    
    <div className="App">
        <h1>React Animated Filtering</h1>
        <h2>Showing "{category || 'All'}" photos</h2>

        <div className="filter-container">
            
            <button style={category === 'space' ? buttonStyles.active : {}} onClick={(evt) => filterBy('space', evt)}>Space</button>
            <button style={category === 'animal' ? buttonStyles.active : {}} onClick={(evt) => filterBy('animal', evt)}>Animal</button>
            <button style={category === 'travel' ? buttonStyles.active : {}} onClick={(evt) => filterBy('travel', evt)}>Travel</button>
            <button id="btn-all" style={category === '' ? buttonStyles.active : {}} onClick={(evt) => filterBy('', evt)}>All</button>
            <span style={highlightStyles}></span>
        </div>
      
        <div id="grid-container">
            <ul className="grid" id="grid">
                {
                images.map(
                    index => <li key={index.id} data-groups={`["${index.cat}"]`} className="photo-item"><img src={`/images/image-0${index.id}.jpg`} alt="" /></li>
                )
                }
            </ul>
        </div>
    </div>
  );
}

export default App;
