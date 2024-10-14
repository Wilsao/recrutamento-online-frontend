import { useState, useEffect } from 'react';
import Pagina from '../Templates/Pagina';
import FormCadEntrevista from '../Formularios/FormCadEntrevista';
import TabelaEntrevistas from '../Tabelas/TabelaEntrevistas';
import { consultarTodos } from '../../servicos/entrevistaService';

export default function TelaEntrevistas() {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizarTela, setAtualizarTela] = useState(false);
    const [entrevistaSelecionada, setEntrevistaSelecionada] = useState({
        id: 0,
        inscricaoId: '',
        dataEntrevista: '',
        status: '',
    });
    const [listaDeEntrevistas, setListaDeEntrevistas] = useState([]);

    useEffect(() => {
        consultarTodos()
            .then((resposta) => {
                if (resposta.status) {
                    setListaDeEntrevistas(resposta.listaEntrevistas);
                    setAtualizarTela(false);
                } else {
                    alert(resposta.mensagem);
                }
            })
            .catch((erro) => {
                alert('Erro ao consultar entrevistas: ' + erro.message);
            });
    }, [atualizarTela]);

    return (
        <Pagina>
            {exibirTabela ? (
                <TabelaEntrevistas
                    listaDeEntrevistas={listaDeEntrevistas}
                    setExibirTabela={setExibirTabela}
                    setModoEdicao={setModoEdicao}
                    setEntrevistaSelecionada={setEntrevistaSelecionada}
                    setAtualizarTela={setAtualizarTela}
                />
            ) : (
                <FormCadEntrevista
                    setExibirTabela={setExibirTabela}
                    setModoEdicao={setModoEdicao}
                    modoEdicao={modoEdicao}
                    entrevistaSelecionada={entrevistaSelecionada}
                    setAtualizarTela={setAtualizarTela}
                />
            )}
        </Pagina>
    );
}
