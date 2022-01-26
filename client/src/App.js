import {useEffect} from 'react';
import './App.css';
import Main from "./components/Main";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

function App() {

    useEffect(() => {
        // TEST API, it might be removed
        fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
            console.log('API CONNECTION IS OK');
        }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))
    }, []);

    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Main/>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
