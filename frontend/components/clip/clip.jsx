import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClip, fetchClips } from '../../actions/clip_actions';


const Clip = () => {

    
    useEffect(() => {
        dispatch(fetchClips())
    }, [])
    // const allClips = useSelector(state => state.entities.clips);
    // const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    return (
        <div>
            Clip Index
        </div>
    )
}

export default Clip