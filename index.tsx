import React from 'react';
import ReactDOM from 'react-dom';
import DroneInstructionsForm from './DroneInstructionsForm';
import BillboardDetails from './BillboardDetails';

const App: React.FC = () => {
    return (
        <div>
            <h1>Drone Control UI</h1>
            <DroneInstructionsForm />
            <BillboardDetails />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
