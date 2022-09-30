import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TokenState } from '../../store/tokens/tokensReducer'

import User from '../../models/User'
import { buscaId } from '../../services/Service'

import './Perfil.css'

function Perfil() {

    let history = useNavigate()

    // Pega o ID guardado no Store
    const id = useSelector<TokenState, TokenState["id"]>(
        (state) => state.id
    );

    // Pega o Token guardado no Store
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    const [user, setUser] = useState<User>({
        id: +id,    // Faz uma conversão de String para Number
        nome: '',
        foto: '',
        usuario: '',
        senha: '',
    })

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado")
            history("/login")
        }
    }, [token])

    // Métedo para pegar os dados de um Usuário especifico pelo ID
    async function findById(id: string) {
        buscaId(`/usuarios/${id}`, setUser, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
            console.log(user)
        }
    }, [id])

    return (
        <Box className='card-principal'>
            <div className='imgPerfil'>
                <img src={user.foto} alt="" />
                <h1>{user.nome}</h1>
            </div>

        <h2>
            Area do perfil em Manutenção
        </h2>
            <p className='card-container-texto'>
               Atualização futuras de uma box opcional de uma descrição pessoal do perfil
            </p>

            <p className='card-container-texto'>
               Atualização futuras de uma box opcional de uma descrição profissional, entre outros.
                
            </p>
            
        </Box>
    )
}

export default Perfil