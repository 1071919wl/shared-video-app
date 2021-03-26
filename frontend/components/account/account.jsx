import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClips } from '../../actions/clip_actions';
import {postClip} from '../../actions/clip_actions';
import NavBar from '../nav/navbar';
import { Link } from 'react-router-dom';


const Account = () => {

    const [title, setTitle] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const user_id = useSelector(state => state.session.id);
    const allClips = useSelector(state => state.entities.clips);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClips());
    }, [])

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

    const uploadedClips = (clip) => {

        if(clip.user_id === user_id){
            return(
                <div key={clip.id}>
                    {clip.title}
                    <div key={clip.id}>
                        <Link to={`/clip/${clip.id}`}>
                            <video type="video/mp4" src={clip.video_clip} width="400" height="auto" />
                        </Link>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <NavBar />
            <div className="account_container">
                Account page
                <form onSubmit={handleSubmit} className='form_container'>
                    <label>Video title:
                        <input type="text" onChange={e => setTitle(e.target.value)} className='account_input'/>
                    </label>
                    <label>Add a video:
                        <input id="file-upload" type="file" onChange={handleFile} className='account_file'/>
                    </label>
                    <button type='submit' className='account_button'>Upload</button>
                </form>
            </div>
            <div>
                Clips uploaded
                {Array.isArray(allClips) ?
                <div>
                    Clip Index
                    {allClips.map((clip) => (
                        uploadedClips(clip)
                    ))}
                </div>
                :
                    <div></div>                
                }
            </div>
        </div>
    )


}

export default Account;