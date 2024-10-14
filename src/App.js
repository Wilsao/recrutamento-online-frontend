import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import TelaMenu from './componentes/Telas/TelaMenu';
import TelaVagas from './componentes/Telas/TelaVagas';
import TelaCandidatos from './componentes/Telas/TelaCandidatos';
import TelaInscricoes from './componentes/Telas/TelaInscricoes';
import TelaEntrevistas from './componentes/Telas/TelaEntrevistas';
export const ContextoUsuarioLogado = createContext(null);

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState({
    nome: '',
    logado: true,
  });

  return (
    <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
        {!usuarioLogado.logado ? (
            <Routes>
            <Route path="*" element={<TelaMenu />} />
            </Routes>
        ) : (
            <Routes>
            <Route path="/" element={<TelaMenu />} />
            <Route path="/vagas" element={<TelaVagas />} />
            <Route path="/candidatos" element={<TelaCandidatos />} />
            <Route path="/inscricoes" element={<TelaInscricoes />} />
            <Route path="/entrevistas" element={<TelaEntrevistas />} />
            <Route path="*" element={<TelaMenu />} />
            </Routes>
        )}
    </ContextoUsuarioLogado.Provider>
  );
}

export default App;
