import React, { useContext, useEffect } from 'react';
import Carousell from './Carousell';
import Collection from './Collection';
import { UserContext } from './Navbar';

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

        
        </div>
    );
}

export default Home;