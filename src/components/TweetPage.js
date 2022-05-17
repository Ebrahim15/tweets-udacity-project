import React,{Component} from "react";
import { connect, useSelector } from 'react-redux'
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
import { useParams } from 'react-router-dom'

// class TweetPage extends Component {

//     render(){
//         const { id, replies} = this.props
//         console.log("Props: ", this.props)
//         return(
//             <div>
//                 <Tweet id={id}/>
//                 <NewTweet id={id}/>
//                 {
//                     replies !== null && <h3 className="center">Replies</h3>
//                 }
//                 <ul>
//                     {replies.map((replyId) => (
//                         <li key={replyId}>
//                             <Tweet id={replyId} />
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         )
//     }
// }

// function mapStateToProps({ tweets }, props){
//     const { id } = props.match.params
//     return{
//         id,
//         replies: !tweets[id] 
//         ? []
//         : tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
//     }
// }

function TweetPage () {
    const {id} = useParams()
    const replies = useSelector(({tweets}) => !tweets[id]
    ? []
    : tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp))
    return(
        <div>
            <Tweet id={id}/>
            <NewTweet id={id}/>
            {replies.length !== 0 && <h3 className='center'>Replies</h3>}
            <ul>
                {replies.map((replyId) => (
                    <li key={replyId}>
                        <Tweet id={replyId}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default connect(null)(TweetPage)