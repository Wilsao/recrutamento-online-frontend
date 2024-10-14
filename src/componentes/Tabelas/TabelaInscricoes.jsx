import { Table, Button } from 'react-bootstrap';
import { excluir } from '../../servicos/inscricaoService';

export default function TabelaInscricoes(props) {
    function excluirInscricao(inscricao) {
        if (
            window.confirm(
                `Deseja excluir a inscrição do candidato ${inscricao.candidato.nome} na vaga ${inscricao.vaga.titulo}?`
            )
        ) {
            excluir(inscricao.id)
                .then((resposta) => {
                    alert(resposta.mensagem);
                    props.setAtualizarTela(true);
                })
                .catch((erro) => {
                    alert('Erro ao excluir inscrição: ' + erro.message);
                });
        }
    }

    return (
        <div>
            <Button
                className="mb-3"
                variant="primary"
                onClick={() => {
                    props.setExibirTabela(false);
                }}
            >
                Realizar Inscrição
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Candidato</th>
                        <th>Vaga</th>
                        <th>Data da Inscrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaDeInscricoes?.map((inscricao) => (
                        <tr key={inscricao.id}>
                            <td>{inscricao.id}</td>
                            <td>{inscricao.candidato.nome}</td>
                            <td>{inscricao.vaga.titulo}</td>
                            <td>{new Date(inscricao.dataInscricao).toLocaleDateString()}</td>
                            <td>
                                <Button variant="danger" onClick={() => excluirInscricao(inscricao)}>
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
