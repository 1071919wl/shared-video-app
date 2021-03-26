import React, {useState, useEffect} from 'react';


const ClipLoad = ({channel}) => {
    const [connect, setConnect] = useState('Waiting for party to connect...')
    const [ready, setReady] = useState(false);
    const [chState, setChState]= useState(null);

    //subscribing
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


        //client side will get auth then stores channel in state
        const channel = pusher.subscribe("private-my-channel-will");
        setChState(channel)

        //event listener    
        channel.bind('client-ready', (data) => {
            setConnect(data.connect);
        });

        return () => {
            channel.unbind();
            pusher.unsubscribe(channel)
            pusher.disconnect()
        };
    }, []);



    const trigger = () => {
        chState.trigger('client-ready', { connect: 'Party is Ready!' })
        setReady(true)
    }
    
    return (
        <div>
            <div>
                Party Members
            </div>
            <div>
                {connect}
            </div>
            <div >
                <button type='submit' className='markButton' onClick={()=>trigger()}>Mark as ready : {ready===true ? <div>&#10003;</div> : <div>&#10007;</div>}</button>
            </div>
        </div>
    )
}

export default ClipLoad;