import { Box, Paper, Button } from "@mui/material"
import './Home.css';

function Home() {
    return (
        <>
            <Paper>
                <Box p={2} >
                    <Box display="flex" justifyContent="center">
                        <h1>Titulo</h1>
                    </Box>
                        <p>
                            Testando
                        </p>
                    <Box>
                        <Button variant="contained" color="secondary"> B1 </Button>
                        <Button variant="contained" color="primary"> B2 </Button>
                    </Box>
                </Box>
            </Paper>
        </>



    )
}

export default Home;



