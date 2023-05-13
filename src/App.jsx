import Header from "./components/Header";
import Search from "./components/Search";
import {useState} from 'react';
import fonts from '../src/js/fonts'
import Axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import Word from './components/Word'
import nProgress from "nprogress";


const errorElement = (
  <main className="my-20 tablet:my-[8.25rem] text-center">
    <div className="text-heading-l">😕</div>
    <h5 className="font-bold mt-5 tablet:mt-11">No Definitions Found</h5>
    <p className="mt-3 tablet:mt-6">
      Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later
      time or head to the web instead.
    </p>
  </main>
)

function App() {
  const [fontCurr, setFont] = useState(localStorage.getItem('current-font') ?? 'Serif')
  const fontType = fonts[fontCurr];
  const [word, setWord] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)


  nProgress.configure({
    showSpinner: false
  })

  
  async function getWord(input) {
    try {
      nProgress.start();
      setIsLoading(true);
      setIsError(false);
      const response = await Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
      const data = response.data[0];
      setWord(data);
      console.log(data)
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      nProgress.done();
    }
  }


  return (
    <>
      <BrowserRouter>
        <div className={`${fontType} desktop:container px-6 tablet:px-10 text-black-3 dark:text-white text-body-m`}>
          <Header fontCurr={fontCurr} setFont={setFont} />
          <Search getWord={getWord}/>
          {isError && errorElement}
          {!isLoading && !isError && <Word data={word} isError={isError} />}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;