import React from "react";
import Quest from "./Quest";

function Questions(props){

    const [formData, setFormData] = React.useState([])
    const [submitted, setSubmitted] = React.useState(false)
    const [countCorrect, setCountCorrect] = React.useState(0)

    //Mapeo y Paso los props de manera màs sencilla
    const triviaMap = [];
    for(let i = 0; i < 5; i++){
        triviaMap.push(<Quest
            question={props.trivia.results[i].question}
            correct_answer={props.trivia.results[i].correct_answer}
            incorrect_answers={props.trivia.results[i].incorrect_answers}
            key={i}
            iterate={i}
            formData={formData}
            setFormData={setFormData}
            submitted={submitted}
        />)
    }   

    function handleSubmit(event){
        event.preventDefault();
        console.log(formData)
        setCountCorrect(0)
        for(let i = 0; i < 5; i++){
            if(formData[i]){
                setCountCorrect( prev => prev + 1)
            }
        }
        console.log(countCorrect)
        setSubmitted(true);
    }

    function playAgain(){
        props.setRestart(old => !old)

        props.handleStart()
    }

    return(
        <div className="Questions">
            <form onSubmit={handleSubmit}>
               {triviaMap}
               <div className="QuestSubmit">
                    {submitted && <h2>{countCorrect + "/5 Correct answers!"}</h2>}
                    {submitted ? 
                        <button type="button" className="QuizButton" onClick={playAgain}>Play again</button> :
                        <button type="submit" className="QuizButton">Check answers</button>
                    }
               </div>
               
            </form>
            
        </div>
    )
}

export default Questions;






    //Prueba:
    /*
    const [styles, setStyles] = React.useState({
        backgroundColor: "#807949"
    })
    const [pressedButton, setPressedButton] = React.useState({})
    
    function handlePress(event){
        console.log(event.target)
        console.log(event.target.value === event.target.itemID)
        setStyles ( prevStyle => ({
            ...prevStyle,
            backgroundColor: event.target.value === event.target.name ? "black" : "#807949"
        }))
        console.log(styles)
        setPressedButton(event.target)
        return true
    }*/