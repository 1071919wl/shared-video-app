import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClip } from '../../actions/clip_actions';
import ReactPlayer from 'react-player';
import { Direction } from 'react-player-controls';
import ProgressBar from './progress_bar'
import NavBar from '../nav/navbar';
import ModalContainer from '../modal/modal_container';
import { openModal } from '../../actions/modal_actions';

const ClipItem = (props) => {
    const [channelState, setChannelState]= useState(null);
    const [playing, setPlaying]= useState(false);
    const [progressState, setProgressState]= useState(0);
    const [width, setWidth]= useState('50');
    const [height, setHeight]= useState('50');
    const player = useRef();
    const playedProgress = useRef(0);
    const vidDuration = useRef(0);
    const socketId = useRef();
    const [volume, setVolume]= useState(0.5);



    //react-redux-hook
    const clip = useSelector(state => Object.values(state.entities.clips)[0]);
    const dispatch = useDispatch();
    

    //componentdidmount
    useEffect(() => {
        dispatch(openModal('clipLoad'))
        dispatch(fetchClip(props.match.params.id))
    }, [])


    //subscribing to connection on Pusher
    useEffect(() => {

        //prevents logger in production
        if (process.env.NODE_ENV !== "production") {
            Pusher.logToConsole = true;
        }
        

        var pusher = new Pusher('4efa8992028154c12bf1', {
            cluster: 'us3',
            authEndpoint: '/pusher/auth',
            encrypted: true,
        });

        //gets socketid variable
        pusher.connection.bind('connected', function() {
            let socket = pusher.connection.socket_id;
            socketId.current = socket
        })

        //client side will get auth then stores channel in state
        const channel = pusher.subscribe("private-my-channel-will");
        setChannelState(channel)

        // channel.bind('pusher:subscription_succeeded', () => {
        //     var triggered = channel.trigger('client-my-event', { message: 'CLIENT HAS JOINED' });
        // });

        
        channel.bind('client-player', (data) => {
            if(data.play !== undefined){
                setPlaying(data.play)
            }
        });
        
        channel.bind('client-pause', (data) => {
            if(data.play !== undefined){
                setPlaying(data.play)
            }
        });

        channel.bind('client-seek', (data) => {
            player.current.seekTo(data.seek)
        });

        return () => {
            channel.unbind();
            pusher.unsubscribe(channel)
            pusher.disconnect()
        };
    }, []);

    const playPause = () => {
        if(playing === true){
            channelState.trigger('client-player', { play: false })
            setPlaying(false)
        }else{
            channelState.trigger('client-player', { play: true })
            setPlaying(true)
        }
    }

    const volumeRocker = (value) => {
        setVolume(value)
    }

    const fullScreen = () => {
        if(width === '50'){
            setWidth('100')
            setHeight('100')
        }else{
            setWidth('50')
            setHeight('50')
        }
    }

    const onSeek = (onSeek) => {
        if( onSeek >= playedProgress.current + 1 || onSeek <= playedProgress.current - 1){
            channelState.trigger('client-seek', { seek: onSeek })
        }
    }

    const onProgress = (progress) =>{
        playedProgress.current = progress.playedSeconds
        setProgressState(progress.playedSeconds)
    }

    const onDuration = (onDuration)=>{
        vidDuration.current=onDuration

    }
    

    return (
        <div>
            <NavBar />
            <ModalContainer/>
            <div className='clip_item_container'>
                <div>
                    Clip Item Show
                </div>

                {clip !== undefined ?
                    <div>
                        <div>
                            <h1>{clip.title}</h1>
                            <ReactPlayer url={clip.video_clip} ref={player} onProgress={onProgress} onDuration={onDuration} playing={playing} volume={volume} onSeek={onSeek} width = {`${width}%`} height={`${height}%`} />
                        </div>
                    <div>
                        
                    </div>
                    
                        <ProgressBar
                            isEnabled
                            direction={Direction.HORIZONTAL}
                            value={progressState / vidDuration.current}
                            onChange={value => player.current.seekTo(value * vidDuration.current)}
                        />

                        <div className='playVolume'>
                            <button type='submit' className='playBtn' onClick={()=>playPause()}>{playing === true ? "Pause" : "Play"}</button>
                            <button type='submit' className='playBtn' onClick={()=>fullScreen()}>{width === '100' ? "Min" : "Full"}</button>
                            <label className='volume'>Volume:</label>
                            <ProgressBar
                                isEnabled
                                direction={Direction.HORIZONTAL}
                                value={volume / 1}
                                onChange={value => volumeRocker(value)}
                                type={'volume'}
                            />
                        </div>

                    </div>
                :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default ClipItem;