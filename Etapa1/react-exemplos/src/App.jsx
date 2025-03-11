import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import Counter from './componentes/Counter';
import Photo from './componentes/Photo';

function App() {
  const [count, setCount] = useState(0);
  //cria as variáveis de estado para armazenar as fotos
  const [photos, setPhotos] = useState([]);

  //método para buscar as fotos
  const fetchPhotos = async () => {
    try {
      //sistema para tratar erros
      const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
      const response = await fetch(url); //faz a requisição por padrão é GET
      if (response.status === 200) {
        const data = await response.json()
        //console.log(data)
        const updatedPhotos = data.map( (photo) => ({
          ...photo, //expande os itens do elemento photo
          thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`
        }))
        // ...photo { id:1, title: "rotulo", thumbnailUrl: "https:///" ...}
        // { photo: { id:1, title: "rotulo", ...}}
        setPhotos(updatedPhotos)
      }
    } catch (error) {
      console.error('Erro ao buscar fotos', error);
    }
  };

  useEffect(() => {
    fetchPhotos()
  }, [])

  return (
    <>
      <Counter title="Contador Superior" />
      <Counter initial="77" />
      <article>
        <h1>Album da API</h1>
        {photos.map( (photo) => (
          <Photo photo={photo}/>

          // <article key={(photo.id)}>
          //     <h2> ID #{photo.id} {photo.title}</h2>
          //     <img src={photo.thumbnailUrl} alt={photo.title}/>
          // </article>
        ))}      {/*map: pega todos os itens e retorna */}
      </article>
    </>
  );
}

export default App;

// function => () -> return é implícito
// function => {} -> precisa colocar o return