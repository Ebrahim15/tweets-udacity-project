import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers"
import { TiArrowBackOutline } from 'react-icons/ti/index'
import { TiHeartOutline } from 'react-icons/ti/index'
import { TiHeartFullOutline } from 'react-icons/ti/index'
import { handleToggleTweet } from '../actions/tweets'
import { Link, useNavigate } from 'react-router-dom'

// class Tweet extends Component {
//     handleLike = (e) => {
//         e.preventDefault()

//         const { dispatch, tweet, authedUser} = this.props

//         dispatch(handleToggleTweet ({
//             id: tweet.id,
//             hasLiked: tweet.hasLiked,
//             authedUser
//         }))
//     }


//     toParent = (e, id) => {
//         e.preventDefault()
//         //todo: redirect to parent tweet
//         useNavigate(`/tweet/${id}`)
//     }
//     render(){
//         const { tweet } = this.props

//         if (tweet === null) {
//             return <p>This Tweet doesn't exist</p>
//         }

//         const {
//             name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
//         } = tweet


//         return(
//             <Link to={`/tweet/${id}`} className="tweet">
//                 <img
//                     src={avatar}
//                     alt={`Avatar of ${name}`}
//                     className='avatar'
//                 />
//                 <div className="tweet-info">
//                     <div>
//                         <span>{name}</span>
//                         <div>{formatDate(timestamp)}</div>
//                         {parent && (
//                             <button className="replying-to" onClick={(e) => this.toParent(e, parent.id)}>
//                                 Replying to @{parent.author}
//                             </button>
//                         )}
//                         <p>{text}</p>
//                     </div>
                
//                     <div className="tweet-icons">
//                         <TiArrowBackOutline className="tweet-icon"/>
//                         <span>{replies !== 0 && replies}</span>
//                         <button className="heart-button" onClick={this.handleLike}>
//                             {hasLiked === true 
//                             ? <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
//                             : <TiHeartOutline className="tweet-icon"/>    }
//                         </button>
//                         <span>{likes !== 0 && likes}</span>
//                     </div>
//                 </div>
//             </Link>
//         )
//     }
// }

// function mapStateToProps({authedUser, users, tweets}, { id }){
//     const tweet = tweets[id]
//     const parentTweet = tweet ? tweets[tweet.replyingTo] : null

//     return {
//         authedUser,
//         tweet: tweet 
//             ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
//             : null,
//     }
// }

// export default connect(mapStateToProps)(Tweet)

//Using React Hooks (functional component)

function Tweet (props) {
    const { id } = props
    const tweet = useSelector(({tweets}) => tweets[id])
    const authedUser = useSelector(({authedUser}) => authedUser)
    const users = useSelector(({users}) => users)
    const parentTweet = useSelector(({tweets}) => tweet ? tweets[tweet.replyingTo] : null)
    const formattedTweet = tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLike = (e) => {
        e.preventDefault()



        dispatch(handleToggleTweet ({
            id: formattedTweet.id,
            hasLiked: formattedTweet.hasLiked,
            authedUser
        }))
    }

    const toParent = (e, id) => {
        e.preventDefault()
        //todo: redirect to parent tweet
        navigate(`/tweet/${id}`)
    }

        if (formattedTweet === null) {
            return <p>This Tweet doesn't exist</p>
        }

        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, parent
        } = formattedTweet


        return(
            <Link to={`/tweet/${id}`} className="tweet">{console.log("formatted: ", formattedTweet)}
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className="tweet-info">
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className="replying-to" onClick={(e) => toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                
                    <div className="tweet-icons">
                        <TiArrowBackOutline className="tweet-icon"/>
                        <span>{replies !== 0 && replies}</span>
                        <button className="heart-button" onClick={handleLike}>
                            {hasLiked === true 
                            ? <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
                            : <TiHeartOutline className="tweet-icon"/>    }
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    
}


export default connect(null)(Tweet)