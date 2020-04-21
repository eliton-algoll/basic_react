import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    async function loadRepositories(){
      const response = await api.get('/repositories');

      if(response.data){
        setRepositories(response.data);
      }
    }

    loadRepositories();

  },[repositories]);

  async function handleAddRepository() {
    // TODO
    const repositorie = {
      title: `Desafio ReactJS ${Date.now()}`,
      url: "https://github.com/josepholiveira",
      techs: ["React", "Node.js"],
    }

    const response = await api.post('/repositories',repositorie);

    if(response){
      setRepositories([...repositories,response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`/repositories/${id}`);

    if(response.status === 204){
      
      const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
   
      repositories.splice(repositorieIndex, 1);

      setRepositories(repositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repositorie => (
        <li key={repositorie.id}>

          {repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
          </li> ))}
        </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
