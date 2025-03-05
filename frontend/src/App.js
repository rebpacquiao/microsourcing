import React, {useState} from 'react';
import {
    Tabs,
    Tab,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Container,
    Snackbar,
    Alert
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import './App.css';

function App() {
    const [instructions, setInstructions] = useState('');
    const [billboardId, setBillboardId] = useState('');
    const [droneResponse, setDroneResponse] = useState(null);
    const [billboardResponse, setBillboardResponse] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
        setDroneResponse(null);
        setBillboardResponse(null);
    };

    const instructionSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:4001/instruct-drone?instructions=${instructions}`
        );
        const data = await response.json();
        if (data.success) {
            setDroneResponse(data);
        } else {
            setErrorMessage(data.message);
            setOpenSnackbar(true);
        }
    };

    const billBoardSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:4001/get-billboard?id=${billboardId}`);
        const data = await response.json();
        if (data.success) {
            setBillboardResponse(data);
        } else {
            setErrorMessage(data.message);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container>
            <div className="App">
                <h1>Drone Control UI</h1>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Drone Instructions" />
                    <Tab label="Billboard Details" />
                </Tabs>
                {tabIndex === 0 && (
                    <form onSubmit={instructionSubmit}>
                        <TextField
                            label="Drone Instructions"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Send Instructions
                        </Button>
                    </form>
                )}
                {tabIndex === 1 && (
                    <form onSubmit={billBoardSubmit}>
                        <TextField
                            label="Billboard ID"
                            value={billboardId}
                            onChange={(e) => setBillboardId(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Get Billboard
                        </Button>
                    </form>
                )}
                {tabIndex === 0 && droneResponse && (
                    <>
                        <h3>Drone Response</h3>
                        <strong>Instructions:</strong> {droneResponse.instructions}
                        <div style={{width: '350px'}}>
                            {droneResponse.billboards.map((billboard, index) => (
                                <Card key={index} style={{marginTop: '16px'}}>
                                    <CardMedia
                                        sx={{height: 140}}
                                        image={billboard.image}
                                        title="no title yet"
                                    />
                                    <CardContent>
                                        <Typography>
                                            <strong>ID:</strong> {billboard.id}
                                        </Typography>
                                        <Typography>
                                            <strong>Coordinates:</strong> ({billboard.x},{' '}
                                            {billboard.y})
                                        </Typography>
                                        <Typography>
                                            <strong>Photos Taken:</strong> {billboard.photosTaken}
                                        </Typography>
                                        <Typography>
                                            <strong>Advertiser:</strong> {billboard.advertiser}
                                        </Typography>
                                        <Typography>
                                            <strong>Address:</strong> {billboard.address}
                                        </Typography>
                                        <Typography>
                                            <strong>Billboard Text:</strong>{' '}
                                            {billboard.billboardText}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
                {tabIndex === 1 && billboardResponse && (
                    <Card sx={{maxWidth: 345}}>
                        <CardMedia
                            sx={{height: 140}}
                            image={billboardResponse.billboard.image}
                            title="no title yet"
                        />
                        <CardContent>
                            <Typography variant="h5">Billboard Response</Typography>
                            <Typography>
                                <strong>ID:</strong> {billboardResponse.billboard.id}
                            </Typography>
                            <Typography>
                                <strong>Coordinates:</strong> ({billboardResponse.billboard.x},{' '}
                                {billboardResponse.billboard.y})
                            </Typography>
                            <Typography>
                                <strong>Photos Taken:</strong>{' '}
                                {billboardResponse.billboard.photosTaken}
                            </Typography>
                            <Typography>
                                <strong>Advertiser:</strong>{' '}
                                {billboardResponse.billboard.advertiser}
                            </Typography>
                            <Typography>
                                <strong>Address:</strong> {billboardResponse.billboard.address}
                            </Typography>
                            <Typography>
                                <strong>Billboard Text:</strong>{' '}
                                {billboardResponse.billboard.billboardText}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{width: '100%'}}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    );
}

export default App;
