import React, { Component } from 'react';
import { getRandom } from './words';

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg"
import step2 from "./images/2.jpg"
import step3 from "./images/3.jpg"
import step4 from "./images/4.jpg"
import step5 from "./images/5.jpg"
import step6 from "./images/6.jpg"
import step7 from "./images/7.jpg"
import step8 from "./images/8.jpg"
import step9 from "./images/9.jpg"
import step10 from "./images/10.jpg"




class Hangman extends Component {


    static defaultProps = {
        maxWrong: 10,
        imgs : [step0,step1,step2,step3,step4,step5,step6,step7,step8,step9,step10]
    }


    constructor(props) {
        super(props);
        this.state = {
            wrongCount: 0,
            guessed: new Set(),
            randomWord : getRandom(),
            isWon: false
        }
    };

    displayDotWord = () => {
        return this.state.randomWord.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "))
    }

    handleClick = (e) => {
        let val = e.target.value;
        this.setState(prev => ({
            guessed: prev.guessed.add(val),
            wrongCount: prev.wrongCount + (this.state.randomWord.includes(val) ? 0 : 1)
        }))
        
        if (this.state.guessed.length === this.state.randomWord.length) {
            this.setState({isWon: true})
        }
    }

    getBtns() {
        let alpha = "abcdefghijklmnopqrstuvwxyz";
        return alpha.split("").map(val => (
            <button
                onClick={this.handleClick}
                className="btn btn-lg btn-info m-2"
                value={val}
                key={val}
                disabled={this.state.guessed.has(val)}
            >
                {val}
            </button>
        ))
    }

    onReset = () => {
        this.setState({
            wrongCount: 0,
            guessed: new Set(),
            randomWord : getRandom(),
            isWon: false
        })
    }

    

    
    render() {
        const isGameOver = this.state.wrongCount >= this.props.maxWrong;
        let gamestat = this.getBtns();
        const gameWon = this.displayDotWord().join("") === this.randomWord;

        if (gameWon) {
            gamestat = "YOU WON";
        }

        if (isGameOver) {
            gamestat = "YOU LOST"
        }



        if (this.state.isWon) {
            return <h1>Congrats ! you won. <b><u onClick={() => window.location.reload()}>Play Again</u></b></h1>
        }

        return (
            <div className='container' style={{textAlign: "center"}}>
                <h1 className='text-center'>HANGMAN GAME</h1>
                <img src={this.props.imgs[this.state.wrongCount]} alt="" />
                <p>
                    wrong guess : {this.state.wrongCount} / {this.props.maxWrong}
                </p>
                <p>
                    Guess the word below to win
                </p>
                <h3>
                    {
                        !isGameOver ? this.displayDotWord() : this.state.randomWord
                    }
                </h3>
                <p>
                    {gamestat}
                </p>
                <button 
                    className='btn btn-primary btn-lg'
                    onClick={this.onReset}
                >
                    RESET
                </button>
            </div>

            
        );
    }
}
 
export default Hangman;