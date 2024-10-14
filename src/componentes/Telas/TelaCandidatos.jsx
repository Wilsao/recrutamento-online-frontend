import { useState, useEffect } from 'react';
import Pagina from '../Templates/Pagina';
import FormCadCandidato from '../Formularios/FormCadCandidato';
import TabelaCandidatos from '../Tabelas/TabelaCandidatos';
import { consultarTodos } from '../../servicos/candidatoService';

export default function TelaCandidatos() {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizarTela, setAtualizarTela] = useState(false);
    const [candidatoSelecionado, setCandidatoSelecionado] = useState({
        id: 0,
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
    });
    const [listaDeCandidatos, setListaDeCandidatos] = useState([]);

    useEffect(() => {
        consultarTodos()
            .then((resposta) => {
                if (resposta.status) {
                    setListaDeCandidatos(resposta.listaCandidatos);
                    setAtualizarTela(false);
                } else {
                    alert(resposta.mensagem);
                }
            })
            .catch((erro) => {
                alert('Erro ao consultar candidatos: ' + erro.message);
            });
    }, [atualizarTela]);

    return (
        <Pagina>
            {exibirTabela ? (
                <TabelaCandidatos
                    listaDeCandidatos={listaDeCandidatos}
                    setExibirTabela={setExibirTabela}
                    setModoEdicao={setModoEdicao}
                    setCandidatoSelecionado={setCandidatoSelecionado}
                    setAtualizarTela={setAtualizarTela}
                />
            ) : (
                <FormCadCandidato
                    setExibirTabela={setExibirTabela}
                    setModoEdicao={setModoEdicao}
                    modoEdicao={modoEdicao}
                    candidatoSelecionado={candidatoSelecionado}
                    setAtualizarTela={setAtualizarTela}
                />
            )}
        </Pagina>
    );
}
