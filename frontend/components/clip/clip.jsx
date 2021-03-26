import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClips } from '../../actions/clip_actions';
import NavBar from '../nav/navbar';
import { Link } from 'react-router-dom';


const Clip = () => {

    const dispatch = useDispatch();
    const allClips = useSelector(state => state.entities.clips);
    
    useEffect(() => {
        // dispatch(fetchClips())
    }, [])

    return (
        <div>
            <NavBar />
            {Array.isArray(allClips) ?
                <div>
                    Clip Index
                    {allClips.map((clip) => (
                        <div key={clip.id}>
                            {clip.title}
                            <div key={clip.id}>
                                <Link to={`/clip/${clip.id}`}>
                                    <video type="video/mp4" src={clip.video_clip} width="400" height="auto" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            :
                <div></div>                
            }
        </div>
    )
}

export default Clip