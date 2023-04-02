import { Layout } from './Layout';
import { Logs } from './Logs';
import { Garages } from './Garages';
import { LogForm } from './LogForm';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Logs />} />
        <Route path="/garages" element={<Garages />} />
        <Route path="/logform" element={<LogForm />} />
      </Route>
    </Routes>
  )
}

export default App;
