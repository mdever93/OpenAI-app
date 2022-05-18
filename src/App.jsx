import Form from './components/Form';
import ResponseContainer from './components/ResponseContainer';
import { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from "openai";
import Navbar from './components/Navbar';


import './App.scss';

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
  const currentResponseObject = {prompt: currentPrompt, response: currentResponse}
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
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
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
