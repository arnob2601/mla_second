import React from 'react';
import { Player } from 'video-react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Trailer = () => {
    return (
        <div style={{
            marginTop: 5 + 'em'
        }}>
            <Player
                playsInline
                poster={require('./Video/Preview.png')}
                src={require('./Video/Trailer.mp4')}
            />
            <div className="text-center">
                <Link to='/sharing'>
                    <Button color="primary" style={
                        {
                            marginBottom: 5 + 'em',
                            marginTop: 5 + 'em'
                        }
                    }>
                        Next
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Trailer;