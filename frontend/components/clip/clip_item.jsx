import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClip, fetchClips } from '../../actions/clip_actions';
import ReactPlayer from 'react-player';
// import { usePusher } from "../PusherContext";
// import {postClip} from '../../actions/clip_actions'
import {postPusher} from '../../actions/pusher_actions'


const ClipItem = (props) => {
    const [test, setTest] = useState(0)
    const [input, setInput] = useState('')
    const [duration, setDuration] = useState(null)
    const [secondsElapsed, setSecondsElapsed] = useState(null)
    const player = useRef();
    // const pusher = usePusher();

    const [channel, setChannel]= useState(null)
    const [socketId, setSocketId]= useState('')


    const clip = useSelector(state => Object.values(state.entities.clips)[0]);
    const USER_ID = useSelector(state => state.entities.users.id);
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
            // authEndpoint: '/your_auth_endpoint'
            authEndpoint: '/pusher/auth',
            encrypted: true,
            auth: {
                headers: {
                'X-CSRF-Token': "<%= form_authenticity_token %>"
                }
            }
        });

        //!good
        // var pusher = new Pusher('4efa8992028154c12bf1', {
        // cluster: 'us3'
        // });
        // const channel = pusher.subscribe("my-channel-will");
        // channel.bind("my-event-will", childEventCallback);

        // return () => {
        //     channel.unbind("client-someeventname", childEventCallback);
        // };
        //!good

        // let cred = {
        //     channel_name: "private-my-channel-will",
        //     socket_id: socketId
        // }

        //gets socketid variable
        pusher.connection.bind('connected', function() {
            let socketId = pusher.connection.socket_id;
            setSocketId(socketId)
            // dispatch(postPusher(cred))
        })

        const channel = pusher.subscribe("private-my-channel-will");
        setChannel(channel)

        channel.bind('pusher:subscription_succeeded', function() {
            var triggered = channel.trigger('client-my-event', { message: 'CLIENT HAS JOINED' });
        });

        // channel.trigger('client-my-event', ()=>{
        //     console.log('trigger')
        // })

        // channel.bind('pusher:subscription_succeeded', function() {
            // channel.trigger('client-my-event', () => alert('JUST BINDED'));
        // });

    }, []);


    const trigger = () => {
        channel.trigger('client-my-event', { message: 'hello world' })

    }
    

    // useEffect(() => {
        // Pusher.logToConsole = true;

        // var pusher = new Pusher('4efa8992028154c12bf1', {
        // cluster: 'us3'
        // });

        // var channel = pusher.subscribe('my-channel-will');

        // pusher.connection.bind('state_change', function(test) {
        // states = {previous: 'oldState', current: 'newState'}
        // console.log('STATE',test)
        // });

        // channel.bind('my-event-will', function(data) {
        //     console.log('MY EVENT WILL?!#################', data)
        //     alert(JSON.stringify(data));
        // });
        
        // pusher.bind('my-event-will', function(){
        //     setTest(test => test + 1)
        //     console.log('MY EVENT BILLIAM?!#################')
        // });

        // channel.bind('my-event-will', function (data) {
        //     console.log('subscribed',data)
        // });
    // }, [test])


   
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