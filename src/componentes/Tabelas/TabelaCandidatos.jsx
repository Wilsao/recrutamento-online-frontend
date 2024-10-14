import { Table, Button } from 'react-bootstrap';
import { excluir } from '../../servicos/candidatoService';

export default function TabelaCandidatos(props) {
    function excluirCandidato(candidato) {
        if (window.confirm(`Deseja excluir o candidato ${candidato.nome}?`)) {
            excluir(candidato.id)
                .then((resposta) => {
                    alert(resposta.mensagem);
                    props.setAtualizarTela(true);
                })
                .catch((erro) => {
                    alert('Erro ao excluir candidato: ' + erro.message);
                });
        }
    }

    function editarCandidato(candidato) {
        props.setCandidatoSelecionado(candidato);
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
                    props.setCandidatoSelecionado({
                        id: 0,
                        nome: '',
                        cpf: '',
                        email: '',
                        telefone: '',
                    });
                }}
            >
                Adicionar Candidato
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaDeCandidatos?.map((candidato) => (
                        <tr key={candidato.id}>
                            <td>{candidato.id}</td>
                            <td>{candidato.nome}</td>
                            <td>{candidato.cpf}</td>
                            <td>{candidato.email}</td>
                            <td>{candidato.telefone}</td>
                            <td>
                                <Button variant="warning" onClick={() => editarCandidato(candidato)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => excluirCandidato(candidato)}>
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
