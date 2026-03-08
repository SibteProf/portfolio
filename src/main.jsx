import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
]);

function App() {
  return (
    <div>
      <h1>Hello, Sibte!</h1>
    </div>
  );
}

export default App;