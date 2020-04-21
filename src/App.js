import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
 
      api.get('/repositories').then(
        response => {
          setRepositories(response.data);
        }
      );

  },[]);

  async function handleAddRepository() {
    // TODO
    const repository = {
      title: `Desafio ReactJS ${Date.now()}`,
      url: "https://github.com/josepholiveira",
      techs: ["React", "Node.js"],
    }

    const response = await api.post('/repositories',repository);

    if(response){
      setRepositories([...repositories,response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    // TODO
    try{
      await api.delete(`/repositories/${id}`);

      const repos = repositories.filter(repository => repository.id !== id);

      setRepositories(repos);
    }catch(err){
      console.log('error - ', err);
    } 

  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => (
        <li key={repository.id}>

          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li> ))}
        </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
