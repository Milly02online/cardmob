import { useState } from 'react'
import './App.css'

import Counter from './componentes/Counter'

function App() {
  const [count, setCount] = useState(0)

  function updateCount() {
    setCount(count+1);
  }

   //arraw function
  //const updateCount = () => {
  //  return count +1;
  //}

  return (
    <>
    <Counter title= "Contando..."/>
    <Counter initial="100"/>
    </>
  )
}

export default App
