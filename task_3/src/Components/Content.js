import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../App';

function ListCards(prop) {
    
    return (
        <div>{prop.cards.length==0?<div className="row">
                    <div className="col s6" style={{marginLeft: "265px"}}>
                    <h2>Result not found</h2></div>
                </div>
                :
                <div>
                {prop.cards?.map(cards=>(
                    <div className="col s4">
                        <div className="card">
                            <div className="card-content">
                                <h4>{cards.name}</h4>
                                <a className="card-title activator grey-text text-darken-1" href={`/carddetails/${cards.id}`}>Details<i className="material-icons right">more_vert</i></a>
                                <span><small>{cards.addedDate}</small></span>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                }
        </div>
    );
}


function Content(props) {
    const context = useContext(UserContext);

    const [name, setName] = useState("");
    const [addedDate, setAddedDate] = useState(new Date());
    const [newId, setNewId] = useState(0);
    const [message, setMessage] = useState("");
    const [searchText, setSearchText] = useState("");
    const [cards, setCards] = useState([]);

    useEffect (()=>{
        searchCards(searchText);
        context.profile();
    },[newId]);

    const handleNameChange = event =>{
        setName(event.target.value)
      }

    const handleAddedDateChange = event =>{
        setAddedDate(new Date())
      }

    const handleSearchTextChange = event =>{
        setSearchText(event.target.value)
      }

    const handleSubmit = event =>{
        const inputData = {name, addedDate}
        addCard(inputData);
        setName("");
        setAddedDate(new Date());
        event.preventDefault();
    }

    async function addCard(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/addcard",{
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization":bearer,
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
        let mesData = await response.json();
        setMessage(mesData.id? "Card added":"Error")
        setNewId(mesData.id);
    }

    const handleSearchSubmit = event => {
        setSearchText(event.target.value);
        searchCards(event.target.value);
        event.preventDefault();
    }

    async function searchCards(text){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/allcards?searchString="+text,{
            method:"GET",
            headers: {
              "Authorization":bearer,
              'Content-Type': 'application/json',
            },
          });
        let tableCards = await response.json();
        
        setCards(tableCards);
    }


    return (
        <div>
            <nav style={{marginTop:"15px", backgroundColor:'#084F8F'}}>
                <div className="nav-wrapper">
                    <form>
                        <div className="input-field">
                            <input id="search" type="search" value={searchText} onChange={handleSearchSubmit}  />
                            <label className="label-icon" for="search"><i class="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
            </nav>


            {searchText==""?<div className="row">
                <div className="col s6" style={{marginLeft: "265px"}}>
                    <h2>{message}</h2>
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="card-content">
                                    <div >
                                        <input type="text" className="validate" placeholder="Create new card" value={name} onChange={handleNameChange}/>
                                        <input type="hidden" className="validate" value={addedDate} onChange={handleAddedDateChange}/>
                                        <button className="btn waves-effect waves-light" type="submit" name="action">Add Card<i className="material-icons right">send</i></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            :
            <h3>Search results for: "{searchText}"</h3>
            }
            
            <div className="row">
                <div >
                    <ListCards cards={cards}/>
                </div>
            </div>
        </div>
    );
}

export default Content;