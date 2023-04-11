import { useEffect } from 'react';
import './App.css';
import Root from './pages/Root.tsx';

function App() {

  useEffect(() => {
    document.title = "Search engine"
  }, [])


  return (
    <Root />
  );
}

export default App;
