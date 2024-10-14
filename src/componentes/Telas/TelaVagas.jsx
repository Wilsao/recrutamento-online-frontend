import { useState, useEffect } from 'react';
import Pagina from '../Templates/Pagina';
import FormCadVaga from '../Formularios/FormCadVaga';
import TabelaVagas from '../Tabelas/TabelaVagas';
import { consultarTodos } from '../../servicos/vagaService';

export default function TelaVagas() {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizarTela, setAtualizarTela] = useState(false);
    const [vagaSelecionada, setVagaSelecionada] = useState({
        id: 0,
        titulo: '',
        descricao: '',
        salario: 0,
        localizacao: '',
        empresa: '',
    });
    const [listaDeVagas, setListaDeVagas] = useState([]);

    useEffect(() => {
        consultarTodos()
            .then((resposta) => {
                if (resposta.status) {
                    setListaDeVagas(resposta.listaVagas);
                    setAtualizarTela(false);
                } else {
                    alert(resposta.mensagem);
                }
            })
            .catch((erro) => {
                alert('Erro ao consultar vagas: ' + erro.message);
            });
    }, [atualizarTela]);

    return (
        <Pagina>
            {exibirTabela ? (
                <TabelaVagas
                    listaDeVagas={listaDeVagas}
                    setExibirTabela={setExibirTabela}
                    setModoEdicao={setModoEdicao}
                    setVagaSelecionada={setVagaSelecionada}
                    setAtualizarTela={setAtualizarTela}
                />
            ) : (
                <FormCadVaga
                    setExibirTabela={setExibirTabela}
                    setModoEdicao={setModoEdicao}
                    modoEdicao={modoEdicao}
                    vagaSelecionada={vagaSelecionada}
                    setAtualizarTela={setAtualizarTela}
                />
            )}
        </Pagina>
    );
}
