import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'

import logoImg from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../service/api'

import './style.css'

export default function NewIncidenst() {
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [value, setValue] = useState();

  async function handleNewIncidents(e) { 
    e.preventDefault();
    
    const data = {title, description, value};

    try {      
      await api.post('/incidents', data, {
        headers:{
          Authorization:ongId
        }        
      })
      
      history.push('/profile')
    } catch (error) {
      alert('Erro ao cadastrar caso, teste novamente')
    }    
  }

  return(
   <div className="newIncident-container">
     <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link to="/profile" className='back-link'>
            <FiArrowLeft size={16} color="#E02041"/>
              Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncidents}>
          <input 
            placeholder='Titulo do caso'
            value={title}
            onChange={e=>{setTitle(e.target.value)}}
          />
          <textarea 
            placeholder='Descrição'
            value={description}
            onChange={e=>{setDescription(e.target.value)}}
          />
          <input 
            placeholder='Valor em Reais'
            value={value}
            onChange={e=>{setValue(e.target.value)}}          
          />

          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
   </div>
  )
}