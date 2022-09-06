import './App.css';
import Header from './Header';
import Form from './Form';
import Item from './Item';
import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
  const [items, setItems] = useState([{
    title: "",
    completed: false,
  }])

  const [randomItem, setRandomItem] = useState("")

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function generateRandomItem () {
    const randomIndex = getRandomInt(items.length)

    setRandomItem(items[randomIndex].title)
  }

  function addItem(name) {
    setItems([...items, {
      id: nanoid(),
      title: name,
      completed: false,
    }])
  }
  
  function completeItem(id) {
    const updatedItems = items.map(item => {
      if (id === item.id) {
        return {...item, completed: !item.completed}
      }
      return item;
    });
    setItems(updatedItems);
  }
  
  function deleteCompleted() {
    const remainingItems = items.filter(item => item.completed === false)
    setItems(remainingItems)
  }
  
  const itemList = items.map(
    item => (
      item.title &&
      !item.deleted &&
      <Item
        id={item.id}
        title={item.title}
        completed={item.completed}
        completeItem={completeItem}
      />
    )
  )

  return (
    <div className="app">
      <Generator
        randomItem={randomItem}
        generateRandomItem={generateRandomItem}
      />
      <Header />
      <Form addItem={addItem} />
      {itemList}
      {items.length > 1 &&
      <button
        onClick={deleteCompleted}
        className="app--button"
      >Clear Completed</button>}
    </div>
  );
}

export default App;
