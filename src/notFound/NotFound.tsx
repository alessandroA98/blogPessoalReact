import React from 'react'
import { Grid } from '@mui/material'
import seta from '../components/imagens/seta.png'
import './NotFound.css'

function NotFound() {
    return (
        <div className='notfound borderRotate'>
            <div className='center' >
                <img src={seta} alt="" height='500' />
            </div>
            <div className='center'>
                <h1>
                    Pagina não encontrada!!!
                </h1>
                
            </div>
        </div>
    )
}

export default NotFound