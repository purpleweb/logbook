import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Layout } from './Layout';
import { Logs } from './Logs';
import { Garages } from './Garages';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Logs />} />
        <Route path="/all-garages" element={<Garages />} />
      </Route>
    </Routes>
  )
}

export default App;
