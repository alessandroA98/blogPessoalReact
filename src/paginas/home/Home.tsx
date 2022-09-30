import React, { useEffect } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { Box } from '@mui/material'
import TabPostagem from '../../components/postagens/tabpostagem/TabPostagem';
import './Home.css';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import Perfil from '../../paginas/perfil/Perfil';



function Home() {

    let history = useNavigate();
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
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa'>
                <Grid xs={2}>
                    <Perfil />
                </Grid>
                <Grid alignItems="center" item xs={5} className='homeBox'>
                    <Box className='homebox'>
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>Blog do Ale</Typography>
                        <Typography variant="h6" gutterBottom color="textPrimary" component="h5" align="center" className='subTitulo'>Adicione uma Tema e após, uma Postagem para relacionar-los</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        
                        <Link to="/posts" className="text-decorator-none">
                            <Button variant="outlined" className='btn'>Ver Postagens</Button>
                        </Link>
                        <Link to="/temas" className="text-decorator-none">
                            <Button variant="outlined" className='btn'>Ver Temas</Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={5} className='homeImg'>
                </Grid>
                <Grid xs={12} className='postagens'>
                    <TabPostagem />
                </Grid>
            </Grid>
        </>
    );
}

export default Home;