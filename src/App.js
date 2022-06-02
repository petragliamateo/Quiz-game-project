import React from 'react';
import './style.css';
import QuizzicalPage from './components/QuizzicalPage';
import Questions from './components/Questions';

function App(){
    const [start, setStart] = React.useState(false);
    const [trivia, setTrivia] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [restart, setRestart] = React.useState(false);

    React.useEffect( () => {
        setLoading(true);
        async function getData(){
            const res = await fetch("https://opentdb.com/api.php?amount=5");
            const data = await res.json();
            setTrivia(data);
            console.log("done");
            setLoading(false);
        }
        getData();
        
    }, [restart] );         //El state restart solo lo uso para reiniciar este useEffect
    
     
    function handleStart(){
        setStart(old => !old);
    }

    return(
        <div className='Quiz'>
            
            {start ? 
                <Questions handleStart={handleStart} trivia={trivia} setStart={setStart} setRestart={setRestart} /> : 
                <QuizzicalPage handleStart={handleStart} loading={loading} />
            }

            
        </div>
    )      
}

export default App;
