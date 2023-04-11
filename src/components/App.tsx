import { Layout } from './Layout';
import { InterventionList } from '../pages/InterventionList';
import { Garages } from '../pages/Garages';
import { Routes, Route } from 'react-router-dom';
import { InterventionNew } from '../pages/InterventionNew';
import { InterventionEdit } from '../pages/InterventionEdit';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<InterventionList />} />
        <Route path="/garages" element={<Garages />} />
        <Route path="/intervention/new" element={<InterventionNew />} />
        <Route path="/intervention/:id/edit" element={<InterventionEdit />} />
      </Route>
    </Routes>
  )
}

export default App;
