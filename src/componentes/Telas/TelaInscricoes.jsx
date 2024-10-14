import { useState, useEffect } from 'react';
import Pagina from '../Templates/Pagina';
import FormCadInscricao from '../Formularios/FormCadInscricao';
import TabelaInscricoes from '../Tabelas/TabelaInscricoes';
import { consultarTodos } from '../../servicos/inscricaoService';

export default function TelaInscricoes() {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [atualizarTela, setAtualizarTela] = useState(false);
    const [listaDeInscricoes, setListaDeInscricoes] = useState([]);

    useEffect(() => {
        consultarTodos()
            .then((resposta) => {
                if (resposta.status) {
                    setListaDeInscricoes(resposta.listaInscricoes);
                    setAtualizarTela(false);
                } else {
                    alert(resposta.mensagem);
                }
            })
            .catch((erro) => {
                alert('Erro ao consultar inscrições: ' + erro.message);
            });
    }, [atualizarTela]);

    return (
        <Pagina>
            {exibirTabela ? (
                <TabelaInscricoes
                    listaDeInscricoes={listaDeInscricoes}
                    setExibirTabela={setExibirTabela}
                    setAtualizarTela={setAtualizarTela}
                />
            ) : (
                <FormCadInscricao
                    setExibirTabela={setExibirTabela}
                    setAtualizarTela={setAtualizarTela}
                />
            )}
        </Pagina>
    );
}
