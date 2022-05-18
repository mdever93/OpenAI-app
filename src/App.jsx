import Form from './components/Form';
import ResponseContainer from './components/ResponseContainer';
import { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from "openai";
import Navbar from './components/Navbar';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";

import './App.scss';
const firebaseConfig = {
  apiKey: "AIzaSyApJ5xuBf84rip-ExcgUhYzZR7KrglvWI4",
  authDomain: "api-database-3d3e6.firebaseapp.com",
  databaseURL: "https://api-database-3d3e6-default-rtdb.firebaseio.com",
  projectId: "api-database-3d3e6",
  storageBucket: "api-database-3d3e6.appspot.com",
  messagingSenderId: "946428004924",
  appId: "1:946428004924:web:f00918afd72b65f9c35139",
  measurementId: "G-02QM3KSRZ7"
};
// TODO: Replace with your app's Firebase project configuration

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);



const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};



function App() {
  const [currentPrompt, setCurrentPrompt] = useState(null)
  const [currentResponse, setCurrentResponse] = useState({})
  const [allResponses, setAllResponses] = useLocalStorage('allResponses', [])
  const currentResponseObject = { prompt: currentPrompt, response: currentResponse }
  const renderedResponses = allResponses.map((responseObject) => {
    return <ResponseContainer key={responseObject.response.id} prompt={responseObject.prompt} response={responseObject.response.text} />
  })


  const clearResponses = () => {
    localStorage.removeItem('allResponses')
    setAllResponses([])
  }

  const getPrompt = (prompt) => {
    console.log(prompt, 'APP.JS LINE 14');
    setCurrentPrompt(prompt)
    const dbRef = ref(getDatabase());
    get(child(dbRef, `apikey/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const configuration = new Configuration({
          apiKey: snapshot.val(),
        });
        const openai = new OpenAIApi(configuration);
    
        openai.createCompletion("text-curie-001", {
          prompt: `${prompt}`,
          temperature: 0.7,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        })
          .then((res) => {
            console.log(res);
            setCurrentResponse({
              text: res.data.choices[0].text,
              id: res.data.id
            })
          })
    
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPrompt && currentResponse) {
        setAllResponses([currentResponseObject, ...allResponses])
        setCurrentPrompt(null)
        setCurrentResponse({})
      }
    }, 1000);


    return () => {
      clearTimeout(timer)
    }
  }, [currentResponse])





  return (
    <div className="app">
      <Navbar />
      <Form
        getPrompt={getPrompt}
        responses={allResponses}
        clearResponses={clearResponses}
      />
      <div className='response__section'>
        {currentPrompt && <ResponseContainer prompt={currentPrompt} response={currentResponse.text} />}
        {renderedResponses}
      </div>
    </div>
  );
}

export default App;
