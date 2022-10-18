import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box, Grid } from '@mui/material';
import './ListaPostagem.css';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import ModalPostagem from '../modalPostagem/ModalPostagem';

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([])
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      toast.error('Você precisa estar logado', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined,
      });
      navigate("/login")

    }
  }, [token])

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPost()

  }, [posts.length])


  return (
    <Grid container xs={12} className='fullPage'>
      <Grid xs={5} className='novoPost'>
        <Link to='/formularioPostagem' className='text-decorator-none'>
          <Box >
            <ModalPostagem />
          </Box>
        </Link>
      </Grid >
      {
        posts.map(post => (
          <Grid xs={5} className='espacoCaixa'>
            <Box className='sombraCaixa'>
              <Card variant="outlined" className='card' >
                <img src={post.foto} height='200px' />
                <div>
                  <CardContent>
                    <Typography align='center' gutterBottom>
                      <span className='cardParagrafo'>
                        Postagem
                      </span>
                    </Typography>
                    <Typography variant="h5" component="h2">
                      <span className='cardParagrafo'>Titulo:
                      </span>
                      {post.titulo}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <span className='cardParagrafo'>
                        Descrição:
                      </span>
                      {post.texto}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <span className='cardParagrafo'>Tema:</span>
                      {post.tema?.descricao}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Box display="flex" justifyContent="center" mb={1.5}>

                      <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                        <Box mx={1}>
                          <Button variant="contained" className="marginLeft" size='small' color="primary" >
                            atualizar
                          </Button>
                        </Box>
                      </Link>
                      <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                        <Box mx={1}>
                          <Button variant="contained" size='small' color="secondary">
                            deletar
                          </Button>
                        </Box>
                      </Link>
                    </Box>
                  </CardActions>
                </div>
              </Card>
            </Box>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default ListaPostagem;