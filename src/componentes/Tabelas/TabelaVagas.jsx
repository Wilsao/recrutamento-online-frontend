import { Table, Button } from 'react-bootstrap';
import { excluir } from '../../servicos/vagaService';

export default function TabelaVagas(props) {
    function excluirVaga(vaga) {
        if (window.confirm(`Deseja excluir a vaga ${vaga.titulo}?`)) {
            excluir(vaga.id)
                .then((resposta) => {
                    alert(resposta.mensagem);
                    props.setAtualizarTela(true);
                })
                .catch((erro) => {
                    alert('Erro ao excluir vaga: ' + erro.message);
                });
        }
    }

    function editarVaga(vaga) {
        props.setVagaSelecionada(vaga);
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
                    props.setVagaSelecionada({
                        id: 0,
                        titulo: '',
                        descricao: '',
                        salario: 0,
                        localizacao: '',
                        empresa: '',
                    });
                }}
            >
                Adicionar Vaga
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Salário</th>
                        <th>Localização</th>
                        <th>Empresa</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaDeVagas?.map((vaga) => (
                        <tr key={vaga.id}>
                            <td>{vaga.id}</td>
                            <td>{vaga.titulo}</td>
                            <td>{vaga.descricao}</td>
                            <td>{vaga.salario}</td>
                            <td>{vaga.localizacao}</td>
                            <td>{vaga.empresa}</td>
                            <td>
                                <Button variant="warning" onClick={() => editarVaga(vaga)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => excluirVaga(vaga)}>
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
