import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import { Grid } from '@mui/material'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { busca, buscaId, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import Projetos from '../../../models/Projetos';


function PostProjetos() {



  let history = useNavigate();
  const { id } = useParams<{ id: string }>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

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
      history("/login")

    }
  }, [token])

  const [projeto, setProjetos] = useState<Projetos>({
    id: 0,
    foto: '',
    site: '',
    descricao: ''
  })

  async function findByIdProjetos(id: string) {
    await buscaId(`projetos/${id}`, setProjetos, {
      headers: {
        'Authorization': token
      }
    })
  }

  function updatedProjetos(e: ChangeEvent<HTMLInputElement>) {

    setProjetos({
      ...projeto,
      [e.target.name]: e.target.value
    })

  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      put(`/projetos`, projeto, setProjetos, {
        headers: {
          'Authorization': token
        }
      })
      toast.success('Projeto atualizada com sucesso', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined,
      });
    } else {
      post(`/projetos`, projeto, setProjetos, {
        headers: {
          'Authorization': token
        }
      })
      toast.success('projeto cadastrado com sucesso', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined,
      });
    }
    back()

  }

  function back() {
    history('/listaProjetos')
  }




  return (
    <Grid container className='fullPage' justifyContent='center'>
      <Grid xs={5} className='cadastro'>

        <form onSubmit={onSubmit}>
          <Typography variant="h5" component="h1" align="center" >Formulário de cadastro projeto</Typography>


          <TextField value={projeto.site} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProjetos(e)} id="titul" label="titul" variant="outlined" name="titul" margin="normal" multiline placeholder='min 3 caracteres' fullWidth />

          <TextField value={projeto.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProjetos(e)} id="foto" label="foto" name="foto" variant="outlined" margin="normal" placeholder='aceita somente terminações PNG, JPG, JPEG' fullWidth />

          <TextField value={projeto.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProjetos(e)} id="t" label="t" name="t" variant="outlined" margin="normal" rows={5} multiline fullWidth />

          <Typography align='center'>
            <Button type="submit" variant="contained" className='btn'>
              Finalizar
            </Button>
            <Link to='/listaProjetos' className='text-decorator-none'>
              <Button type="submit" variant="contained" className='btn'>
                Cancelar
              </Button>
            </Link>
          </Typography>
        </form>
      </Grid>
    </Grid>
  )
}

export default PostProjetos;