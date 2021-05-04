import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";


const Search = props => {
    const [text, setText] = useState("");

    const submit = event => {
        event.preventDefault();
        console.log(text)
        props.submitSearch(text);
    }



    const handleKeyPress = event => {
        if (event.keyCode === 13) {
            submit(event);
        }
    }

    return (
        <div className="search-form container">
            <div className="row justify-content-center">
                <div className="col-10 pe-0 ps-0">
                    <label htmlFor="search"  className="visually-hidden">Search</label>
                    <input id="search" className="form-control rounded-start" type="search"
                           placeholder={props.placeholder}
                           value={text} onChange={e => setText(e.target.value)}
                           onKeyUp={e => handleKeyPress(e)}
                    />
                </div>
                <div className="col-2 p-0">
                    <button className="btn btn-secondary" onClick={submit}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Search;


