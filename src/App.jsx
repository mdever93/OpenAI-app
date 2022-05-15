import Form from './components/Form';
import ResponseContainer from './components/ResponseContainer';
import Prompt from './components/Prompt';
import Response from './components/Response';
import { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from "openai";
import DarkMode from './DarkMode';


import './App.scss';

function App() {
  const [currentPrompt, setCurrentPrompt] = useState(null)
  const [currentResponse, setCurrentResponse] = useState({})
  const [allResponses, setAllResponses] = useState([])

  const getPrompt = (prompt) => {
    console.log(prompt, 'APP.JS LINE 14');
    setCurrentPrompt(prompt)
    // setCurrentPrompt(renderPrompt(prompt))    
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
        setAllResponses([<ResponseContainer key={currentResponse.id} prompt={currentPrompt} response={currentResponse.text} />, ...allResponses])
        setCurrentPrompt(null)
        setCurrentResponse({})
      }
    }, 1000);


    return () => {
      clearTimeout(timer)
    }
  }, [currentResponse])


  // const renderPrompt = (prompt) => {
  //   return (<Prompt>{prompt}</Prompt>)
  // }



  return (
    <div className="app">
      <header className='app__header'>
        <DarkMode />
      </header>
      <Form
        getPrompt={getPrompt}
      // disabled={!(currentPrompt && currentResponse)}
      />
      <div className='response__section'>
        {currentPrompt && <ResponseContainer prompt={currentPrompt} response={currentResponse.text} />}
        {allResponses}
        {/* <ResponseContainer>
          <Prompt>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, nam pariatur? Ipsum quod error vitae, dignissimos autem odio maiores eligendi doloremque placeat cum laboriosam! Sed error quasi pariatur placeat praesentium.</Prompt>
          <Response>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsum reprehenderit dolorum modi, eum animi enim minima qui repudiandae rem illum pariatur, distinctio accusantium eveniet, dolor itaque fugiat recusandae aspernatur!</Response>
        </ResponseContainer>
        <ResponseContainer>
          <Prompt>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, nam pariatur? Ipsum quod error vitae, dignissimos autem odio maiores eligendi doloremque placeat cum laboriosam! Sed error quasi pariatur placeat praesentium.</Prompt>
          <Response>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsum reprehenderit dolorum modi, eum animi enim minima qui repudiandae rem illum pariatur, distinctio accusantium eveniet, dolor itaque fugiat recusandae aspernatur!</Response>
        </ResponseContainer>
        <ResponseContainer>
          <Prompt>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, nam pariatur? Ipsum quod error vitae, dignissimos autem odio maiores eligendi doloremque placeat cum laboriosam! Sed error quasi pariatur placeat praesentium.</Prompt>
          <Response>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsum reprehenderit dolorum modi, eum animi enim minima qui repudiandae rem illum pariatur, distinctio accusantium eveniet, dolor itaque fugiat recusandae aspernatur!</Response>
        </ResponseContainer>
        <ResponseContainer>
          <Prompt>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, nam pariatur? Ipsum quod error vitae, dignissimos autem odio maiores eligendi doloremque placeat cum laboriosam! Sed error quasi pariatur placeat praesentium.</Prompt>
          <Response>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsum reprehenderit dolorum modi, eum animi enim minima qui repudiandae rem illum pariatur, distinctio accusantium eveniet, dolor itaque fugiat recusandae aspernatur!</Response>
        </ResponseContainer>
        <ResponseContainer>
          <Prompt>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, nam pariatur? Ipsum quod error vitae, dignissimos autem odio maiores eligendi doloremque placeat cum laboriosam! Sed error quasi pariatur placeat praesentium.</Prompt>
          <Response>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsum reprehenderit dolorum modi, eum animi enim minima qui repudiandae rem illum pariatur, distinctio accusantium eveniet, dolor itaque fugiat recusandae aspernatur!</Response>
        </ResponseContainer>
        <ResponseContainer>
          <Prompt>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, nam pariatur? Ipsum quod error vitae, dignissimos autem odio maiores eligendi doloremque placeat cum laboriosam! Sed error quasi pariatur placeat praesentium.</Prompt>
          <Response>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsum reprehenderit dolorum modi, eum animi enim minima qui repudiandae rem illum pariatur, distinctio accusantium eveniet, dolor itaque fugiat recusandae aspernatur!</Response>
        </ResponseContainer> */}
      </div>
    </div>
  );
}

export default App;
