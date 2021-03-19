import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Clip from '../clip/clip'
import {postClip} from '../../actions/clip_actions'


const Account = () => {

    const [title, setTitle] = useState('');
    const [videoFile, setVideoFile] = useState(null);

    const user_id = useSelector(state => state.session.id)
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('clip[title]', title);
        formData.append('clip[video_clip]', videoFile)
        formData.append('clip[user_id]', user_id)

        dispatch(postClip(formData)).then(
            (res) => console.log(res.message),
            (res) => console.log(res.responseJSON)
        )

    }

    const handleFile = (e) => {
        setVideoFile(e.currentTarget.files[0]);
    }

    return (
        <div>
            Account page
            <form onSubmit={handleSubmit}>
                <label>Video title:
                    <input type="text" onChange={e => setTitle(e.target.value)}/>
                </label>
                <label>Add a video:
                    <input id="file-upload" type="file" onChange={handleFile}/>
                </label>
                <button type='submit'>Upload</button>
            </form>
        </div>
    )


}

export default Account;