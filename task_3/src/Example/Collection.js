import React from 'react';

function Collection(props) {
    return (
        <ul class="collection">
            <li class="collection-item avatar">
            <i class="material-icons circle" style={{backgroundColor:"#2196f3"}}>access_time</i>
            <span class="title">Quick Access</span>
            <p>Fast and Easy
            </p>
            <a href="#!" class="secondary-content"><i class="material-icons">check</i></a>
            </li>
            <li class="collection-item avatar">
            <i class="material-icons circle" style={{backgroundColor:"#4fc3f7  "}}>folder</i>
            <span class="title">Great Management</span>
            <p>Grouping your tasks</p>
            <a href="#!" class="secondary-content"><i class="material-icons">check</i></a>
            </li>
            <li class="collection-item avatar">
            <i class="material-icons circle green">insert_chart</i>
            <span class="title">Statistics</span>
            <p>Monitoring with your success</p>
            <a href="#!" class="secondary-content"><i class="material-icons">check</i></a>
            </li>
            <li class="collection-item avatar">
            <i class="material-icons circle red">cloud_upload</i>
            <span class="title">Cloud Service</span>
            <p>Store you data in cloud</p>
            <a href="#!" class="secondary-content"><i class="material-icons">check</i></a>
            </li>
  </ul>
    );
}

export default Collection;