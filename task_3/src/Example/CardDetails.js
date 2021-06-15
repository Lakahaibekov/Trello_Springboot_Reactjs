import React from 'react';
import { Button, DatePicker, Icon, Modal, TimePicker, Toast } from 'react-materialize';
import { Redirect } from 'react-router-dom';



function EditCard(props) {
  return (
        <div className="row">
          <form>
          <div className="input-field">
                <input value={props.name} onChange={props.handleNameChange}
                     name="cardName" type="text" className="validate"/>
                </div>
          </form>
         
        </div>
  )
}

function DeleteCard(props) {
  return (
        <div className="row">
         <h4>Are you sure?</h4>
         
        </div>
  )
}

function CheckCard(props) {
  if(props.msg == ""){
    return  <div className="row">
    <div className="card blue-grey darken-1">
      <div className="card-content">
        <h5 className="white-text">{props.name}</h5>
        <p>
          <span
            style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}
          >
            {new Date(props.date).toLocaleDateString() +
              " " +
              new Date(props.date).toLocaleTimeString()}
          </span>
        </p>
      </div>
      <div className="card-action">
        <Modal
          actions={[
            <Button
              flat
              modal="close"
              node="button"
              waves="green"
              className="white-text"
              style={{backgroundColor:"#455a64 "}}
            >
              Close<Icon right>close</Icon>
            </Button>,
            <Button
              flat
              node="button"
              waves="light"
              onClick={props.handleSubmit}
              className="left green white-text"
            >
              Edit<Icon right>edit</Icon>
            </Button>,
          ]}
          bottomSheet={false}
          fixedFooter
          header="Edit Card"
          id="Modal-0"
          open={false}
          style={{
            width: "500px",
            height: "250px",
          }}
          options={{
            dismissible: true,
            endingTop: "10%",
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: "4%",
          }}
          trigger={<a style={{color:""}} href="#">Edit</a>}
        >
          <EditCard
            name={props.name}
            date={props.date}
            handleSubmit={props.handleSubmit}
            handleNameChange={props.handleNameChange}
          />
        </Modal>

        <Modal
          actions={[
            <Button
              flat
              modal="close"
              node="button"
              waves="green"
              className="white-text"
              style={{backgroundColor:"#455a64 "}}
            >
              Close<Icon right>close</Icon>
            </Button>,
            props.tasks.length==0?
            <a
              node="button"
              waves="light"
              onClick={props.toDeleteCard}
              href="/allCards"
              className="btn left red white-text"
            >
              Delete<Icon right>delete</Icon>
            </a>
            :
            <a
              node="button"
              waves="light"
              onClick={props.toDeleteCard}
              href="#"
              className="btn left red white-text"
            >
              Delete<Icon right>delete</Icon>
            </a>
            ,
          ]}
          bottomSheet={false}
          fixedFooter
          header="Delete Card"
          id="Modal-0"
          open={false}
          style={{
            width: "500px",
            height: "250px",
          }}
          options={{
            dismissible: true,
            endingTop: "10%",
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: "4%",
          }}
          trigger={<a href="#">Delete</a>}
        >
          <DeleteCard />
        </Modal>
      </div>
    </div>
  </div>
    
  }else{
return <div className="row center-align">
  <Icon style={{fontSize:"400%"}}>error</Icon>
      <h3>NOT FOUND 404</h3>
      
    </div>
  }
}



function CardDetails(props) {

    return (
      <CheckCard 
      tasks={props.tasks}
      name={props.name}
      date={props.date}
      id={props.id}
      handleNameChange={props.handleNameChange}
      toDeleteCard={props.toDeleteCard}
      handleSubmit={props.handleSubmit}
      msg={props.msg}
      />
    );
}

export default CardDetails;