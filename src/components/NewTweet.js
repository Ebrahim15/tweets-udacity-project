import React, { Component } from "react";
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Navigate } from 'react-router-dom'


class NewTweet extends Component {
    state = {
        text: '',
        toHome: false
    }
    handleSubmit = (e) => {
        
        e.preventDefault()
        
        const { text } = this.state
        const { dispatch, id} = this.props

        dispatch(handleAddTweet(text,id))
        console.log("New Tweet: ", text)
        this.setState(() => ({
            text: '',
            toHome: id ? false : true
        }))
    }

    handleChange = (e) => {
        
        const text = e.target.value

        this.setState(() => ({
            text
        }))

    }
    render(){
        const { text, toHome } = this.state

        {/* todo: Redirect to / if submitted */}
        if (toHome === true) {
            return <Navigate to='/'/>
        }

        const tweetLeft = 280 - text.length
        return(
            <div>
                <h3 className="center">Compose new Tweet</h3>
                <form className="new-tweet" onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="What's happening?"
                        value={text}
                        onChange={this.handleChange}
                        className='textarea'
                        maxLength={280}
                    />
                    {tweetLeft <= 100 && (
                        <div className="tweet-length">{tweetLeft}</div>
                    )}
                    <button 
                    className="btn"
                    type="submit"
                    disabled={text === ''}>
                        submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet)