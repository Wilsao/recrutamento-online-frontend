import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { gravar, alterar } from '../../servicos/entrevistaService';
import { consultarTodos as consultarInscricoes } from '../../servicos/inscricaoService';

export default function FormCadEntrevista(props) {
    const [entrevista, setEntrevista] = useState(
        props.modoEdicao
            ? props.entrevistaSelecionada
            : {
                id: 0,
                inscricaoId: '',
                dataEntrevista: '',
                status: '',
            }
    );

    const [listaDeInscricoes, setListaDeInscricoes] = useState([]);

    useEffect(() => {
        consultarInscricoes().then((resposta) => {
            if (resposta.status) {
                setListaDeInscricoes(resposta.listaInscricoes);
            } else {
                alert(resposta.mensagem);
            }
        });
    }, []);

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setEntrevista({ ...entrevista, [name]: value });
    }

    function salvarEntrevista(evento) {
        evento.preventDefault();
        const operacao = props.modoEdicao ? alterar : gravar;
        operacao(entrevista)
            .then((resposta) => {
                alert(resposta.mensagem);
                props.setAtualizarTela(true);
                props.setExibirTabela(true);
                props.setModoEdicao(false);
            })
            .catch((erro) => {
                alert('Erro ao salvar entrevista: ' + erro.message);
            });
    }

    return (
        <Form onSubmit={salvarEntrevista}>
            <Form.Group className="mb-3" controlId="inscricaoId">
                <Form.Label>Inscrição:</Form.Label>
                <Form.Control
                    as="select"
                    name="inscricaoId"
                    value={entrevista.inscricaoId}
                    onChange={manipularMudanca}
                    required
                >
                    <option value="">Selecione uma inscrição</option>
                    {listaDeInscricoes.map((inscricao) => (
                        <option key={inscricao.id} value={inscricao.id}>
                            {inscricao.candidato.nome} - {inscricao.vaga.titulo}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="dataEntrevista">
                <Form.Label>Data da Entrevista:</Form.Label>
                <Form.Control
                    type="datetime-local"
                    name="dataEntrevista"
                    value={entrevista.dataEntrevista}
                    onChange={manipularMudanca}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
                <Form.Label>Status:</Form.Label>
                <Form.Control
                    type="text"
                    name="status"
                    value={entrevista.status}
                    onChange={manipularMudanca}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {props.modoEdicao ? 'Atualizar' : 'Agendar'}
            </Button>{' '}
            <Button
                variant="secondary"
                onClick={() => {
                    props.setExibirTabela(true);
                    props.setModoEdicao(false);
                }}
            >
                Cancelar
            </Button>
        </Form>
    );
}
