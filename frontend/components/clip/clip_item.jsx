import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClip, fetchClips } from '../../actions/clip_actions';


const ClipItem = (props) => {

    const clip = useSelector(state => Object.values(state.entities.clips)[0]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        dispatch(fetchClip(props.match.params.id))
    }, [])
    
    
    return (
        <div>
            {clip !== undefined ?
                <div>
                    Clip Item Show
                    <div>
                        <h1>{clip.title}</h1>
                        <video type="video/mp4" src={clip.video_clip} width="800" height="auto" controls/>
                    </div>
                </div>
            :
                <div></div>
            }
        </div>
    )
}

export default ClipItem