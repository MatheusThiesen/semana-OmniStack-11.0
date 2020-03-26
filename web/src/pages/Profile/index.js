import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'

import {FiPower, FiTrash2} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

import api from '../../service/api'

import './style.css'

export default function Profile() {
  const history = useHistory();
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(()=>{
    async function loadIncidents() {
      console.log(ongId);
      try {
        const response =  await api.get('profile', {
          headers: {
            Authorization:ongId
          }})

        setIncidents(response.data);
      } catch (error) {
        console.log(error);                
      }
      
    }
    loadIncidents();
  },[ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers:{
          Authorization:ongId
        }
      })

      setIncidents(incidents.filter(incidents => incidents.id !== id))
    } catch (error) {
      alert('Erro ao deletar caso, tente novamente')
    }
  }

  async function handleLogout() {
    localStorage.clear();

    history.push('/')
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Bem vindo, {ongName}</span>

        <Link className='button' to='/incidents/new'>Cadastar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower color='e02041' />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map (incident=>(
          <li key={incident.id}>
            <p>{incident.id}</p>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

            <button type="button" onClick={() => {handleDeleteIncident(incident.id)}}>
              <FiTrash2 size={20} color='#a8a8b3' />
            </button>
          </li>        
        ))}        
      </ul>
    </div>
  )
}