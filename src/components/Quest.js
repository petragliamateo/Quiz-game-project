import {nanoid} from "nanoid";
import React from "react";

function Quest(props){
    //Debe ser state y cambiarlo mediante effect para que funcione
    const [arrayAnswers, setArrayAnswers] = React.useState([]);
    
    //Se deben generar en orden random las respuestas
    function shuffle(array){
        let currentIndex = array.length, randomIndex;
        while(currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex --;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }



    //mezclo las answers, mapeo y le asocio una función de clickeado    

    const [answers, setAnswers] = React.useState(shuffle([...props.incorrect_answers, props.correct_answer]));
    
    const [pressedButton, setPressedButton] = React.useState({})
    function handlePress(event){
        setPressedButton(event.target)
    }

    React.useEffect(() => {
        
        setArrayAnswers(answers.map( item => (
            <div key={nanoid()}>
                <label htmlFor={`${props.iterate} ${answers.indexOf(item)} ${item}`}
                    className={`QuestOptionsButton`}
                    style={
                        {backgroundColor: props.submitted ?
                            (
                            pressedButton.value === props.correct_answer ? 
                                (pressedButton.value === item ? "green" : "#807949") : 
                                (pressedButton.value === item ? "red" : "#807949")
                            ) :
                            (pressedButton.value === item ? "black" : "#807949")
                        }
                    }
                >{item}</label>

                <input type="radio"
                    key={nanoid()}
                    onChange={handlePress}
                    value={item}
                    id={`${props.iterate} ${answers.indexOf(item)} ${item}`}
                    
                    className="QuestOptionsRadio"
                    itemID={props.correct_answer}
                    name={`QuestOption-${props.iterate}`}
                ></input>
            </div>
        )))
                    //Id sintax: (fila) (columna) (respuesta)
        console.log("mapped")
        console.log(pressedButton.value == props.correct_answer, pressedButton.value, props.correct_answer)

        props.setFormData( prev => {
            let newDataArray = prev;
            newDataArray[props.iterate] = pressedButton.value === props.correct_answer ? true : false;
            return newDataArray;
        })
        console.log(props.formData)
    }, [pressedButton, props.submitted])

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    return(
        <div className="Quest">
            <h3>{decodeHtml(props.question)}</h3>
            <div className="QuestOptions">
                {arrayAnswers}
            </div>
        </div>
    )
}

export default Quest;





/* Temp:
<button type="button"
                key={nanoid()}
                onClick={handlePress}
                value={item}
                className={`QuestOptionsButton ${props.buttonValue}`}
                name={`Quest${props.iterate}`}
            >{item}</button>

*/

/*React.useEffect( () => {
        
        if(arrayAnswers.length > 0){
            let newArray = arrayAnswers;
            console.log(newArray)
            console.log(props.pressedButton.id)
            let answerSelect = props.pressedButton.value
            console.log(answerSelect)
            console.log(props.pressedButton.name)
            let answerId = props.pressedButton.id.split(" ")[1]
            console.log(answerId)
            console.log(newArray[answerId].props.children[0].props.style.backgroundColor) 
        }
        

    }, [props.pressedButton])*/   