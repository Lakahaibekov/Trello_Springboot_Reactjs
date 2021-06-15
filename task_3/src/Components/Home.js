import React, { useContext, useEffect } from 'react';
import { UserContext } from '../App';
import Carousell from './Carousell';
import Collection from './Collection';

function Home(props) {
    const context = useContext(UserContext);
    useEffect(() => {
        if(context.isOnline){
            context.profile();
        }
       
      }, []);


    return (
        <div className="container">
            <div className="row">
                <Carousell/>
            </div>

            <div className="row">
                <Collection/>
            </div>
        </div>
    );
}

export default Home;