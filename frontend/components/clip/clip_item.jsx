import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClip, fetchClips } from '../../actions/clip_actions';
import ReactPlayer from 'react-player';
// import { usePusher } from "../PusherContext";
// import {postClip} from '../../actions/clip_actions'


const ClipItem = (props) => {
    const [test, setTest] = useState(0)
    const [input, setInput] = useState('')
    const [duration, setDuration] = useState(null)
    const [secondsElapsed, setSecondsElapsed] = useState(null)
    const [channelState, setChannelState]= useState(null);
    const [info, setInfo]= useState('');
    const player = useRef();
    const socketId = useRef();


    const clip = useSelector(state => Object.values(state.entities.clips)[0]);
    const dispatch = useDispatch();
    
    //componentdidmount
    useEffect(() => {
        dispatch(fetchClip(props.match.params.id))
    }, [])


    //subscribing
    useEffect(() => {
        // function childEventCallback(data) {
        //     const newElapsed = data.payload;
        //     setTest(newElapsed);
        // }

        Pusher.logToConsole = true;

        var pusher = new Pusher('4efa8992028154c12bf1', {
            cluster: 'us3',
            authEndpoint: '/pusher/auth',
            encrypted: true,
            // auth: {
            //     headers: {
            //     'X-CSRF-Token': "<%= form_authenticity_token %>"
            //     }
            // }
        });

        //gets socketid variable
        pusher.connection.bind('connected', function() {
            let socket = pusher.connection.socket_id;
            socketId.current = socket
        })

        const channel = pusher.subscribe("private-my-channel-will");
        setChannelState(channel)
        channel.bind('pusher:subscription_succeeded', () => {
            var triggered = channel.trigger('client-my-event', { message: 'CLIENT HAS JOINED' });
        });

        channel.bind('client-seek', (data) => {
            setInfo(data.timestamp);
        }
    );

        return () => {
            channel.unbind();
            // pusher.unsubscribe(channel)
            // pusher.disconnect()
        };
    }, []);

    useEffect(() => {
        setTest(test => test + 10)
    }, [info])


    const trigger = () => {
        channelState.trigger('client-seek', { timestamp: 21 })
    }

   
    //!TRACKS CURRENT TIME STAMP
    // useEffect(() => {
    //     console.log('REF',player.current?.getCurrentTime())
    //     // console.log('SEEKTO',player.current.seekTo(60.296119))
    // }, [secondsElapsed])

    // const onDuration = (duration) =>{
    //     setDuration(duration);
    // }

    // const onProgress = (progress) =>{
    //     if (!duration) {
    //         return;
    //     }
    //     const secondElapsed = progress.played * duration
    //     if (secondsElapsed !== secondElapsed) {
    //         setSecondsElapsed(secondElapsed)
    //     }
    // }
    //!TRACKS CURRENT TIME STAMP

    return (
        <div>
            {clip !== undefined ?
                <div>
                    Clip Item Show
                    {test}
                    <div>
                        <h1>{clip.title}</h1>
                        {/* <video type="video/mp4" src={clip.video_clip} width="800" height="auto" controls/> */}
                        {/* <ReactPlayer url={clip.video_clip} controls={true} ref={player} onDuration={onDuration} onProgress={onProgress}/> */}
                        <ReactPlayer url={clip.video_clip} controls={true} ref={player}  />
                    </div>
                    {/* <form onSubmit={sendMessage}>
                        <input type='text' onChange={e => setInput(e.target.value)}/>
                        <button type='submit' >submit</button>
                    </form> */}
                    {/* <button type='submit' onClick={()=>setTest(test => test+1)}>ADD</button> */}
                    <button type='submit' onClick={()=>trigger()}>Alert</button>
                </div>
            :
                <div>Nope</div>
            }
        </div>
    )
}

export default ClipItem;