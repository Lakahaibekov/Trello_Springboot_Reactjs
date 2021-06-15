import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
          <footer className="page-footer grey">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text" style={{color:"black"}}>© 2006—2021 «KRISHA»</h5>
                            <p className="grey-text text-lighten-4" style={{color:"black"}}>Terms of use</p>
                            <p className="grey-text text-lighten-4" style={{color:"black"}}>Site map</p>
                            <p className="grey-text text-lighten-4" style={{color:"black"}}>Rules for posting ads</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text" style={{color:"black"}}>Site and newspaper information</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" style={{color:"black"}} href="#!">Write us a letter</a></li>
                                <li><a className="grey-text text-lighten-3" style={{color:"black"}} href="#!">Work at "Колёса Крыша Маркет"</a></li>
                                <li><a className="grey-text text-lighten-3" style={{color:"black"}} href="#!">Follow our news</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">   
                </div>
            </footer>
        );
    }
}

export default Footer;