import { Layout } from './Layout';
import { Logs } from './Logs';
import { Garages } from './Garages';
import { Routes, Route } from 'react-router-dom';
import { LogCreate } from './LogCreate';
import { LogUpdate } from './LogUpdate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Logs />} />
        <Route path="/garages" element={<Garages />} />
        <Route path="/log-create" element={<LogCreate />} />
        <Route path="/log-update/:id" element={<LogUpdate />} />
      </Route>
    </Routes>
  )
}

export default App;
