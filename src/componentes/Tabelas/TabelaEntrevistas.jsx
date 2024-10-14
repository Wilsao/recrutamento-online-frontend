import { Table, Button } from 'react-bootstrap';
import { excluir } from '../../servicos/entrevistaService';

export default function TabelaEntrevistas(props) {
    function excluirEntrevista(entrevista) {
        if (
            window.confirm(
                `Deseja excluir a entrevista do candidato ${entrevista.inscricao.candidato.nome} na vaga ${entrevista.inscricao.vaga.titulo}?`
            )
        ) {
            excluir(entrevista.id)
                .then((resposta) => {
                    alert(resposta.mensagem);
                    props.setAtualizarTela(true);
                })
                .catch((erro) => {
                    alert('Erro ao excluir entrevista: ' + erro.message);
                });
        }
    }

    function editarEntrevista(entrevista) {
        props.setEntrevistaSelecionada({
            id: entrevista.id,
            inscricaoId: entrevista.inscricao.id,
            dataEntrevista: entrevista.dataEntrevista,
            status: entrevista.status,
        });
        props.setModoEdicao(true);
        props.setExibirTabela(false);
    }

    return (
        <div>
            <Button
                className="mb-3"
                variant="primary"
                onClick={() => {
                    props.setExibirTabela(false);
                    props.setModoEdicao(false);
                    props.setEntrevistaSelecionada({
                        id: 0,
                        inscricaoId: '',
                        dataEntrevista: '',
                        status: '',
                    });
                }}
            >
                Agendar Entrevista
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Candidato</th>
                        <th>Vaga</th>
                        <th>Data da Entrevista</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaDeEntrevistas?.map((entrevista) => (
                        <tr key={entrevista.id}>
                            <td>{entrevista.id}</td>
                            <td>{entrevista.inscricao.candidato.nome}</td>
                            <td>{entrevista.inscricao.vaga.titulo}</td>
                            <td>{new Date(entrevista.dataEntrevista).toLocaleString()}</td>
                            <td>{entrevista.status}</td>
                            <td>
                                <Button variant="warning" onClick={() => editarEntrevista(entrevista)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => excluirEntrevista(entrevista)}>
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
