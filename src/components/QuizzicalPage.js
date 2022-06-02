function QuizzicalPage(props){

    return(
        <div className='QuizzicalPage'>
            <h1>Quizzical</h1>
            {props.loading ?
            <h2>Loading...</h2> :
            <button className='QuizButton' onClick={props.handleStart}>Start Quiz</button>}
        </div>
    )
}

export default QuizzicalPage;