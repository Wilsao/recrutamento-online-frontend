import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { gravar } from '../../servicos/inscricaoService';
import { consultarTodos as consultarCandidatos } from '../../servicos/candidatoService';
import { consultarTodos as consultarVagas } from '../../servicos/vagaService';

export default function FormCadInscricao(props) {
    const [inscricao, setInscricao] = useState({
        candidatoId: '',
        vagaId: '',
    });

    const [listaDeCandidatos, setListaDeCandidatos] = useState([]);
    const [listaDeVagas, setListaDeVagas] = useState([]);

    useEffect(() => {
        consultarCandidatos().then((resposta) => {
            if (resposta.status) {
                setListaDeCandidatos(resposta.listaCandidatos);
            } else {
                alert(resposta.mensagem);
            }
        });

        consultarVagas().then((resposta) => {
            if (resposta.status) {
                setListaDeVagas(resposta.listaVagas);
            } else {
                alert(resposta.mensagem);
            }
        });
    }, []);

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setInscricao({ ...inscricao, [name]: value });
    }

    function salvarInscricao(evento) {
        evento.preventDefault();
        gravar(inscricao)
            .then((resposta) => {
                alert(resposta.mensagem);
                props.setAtualizarTela(true);
                props.setExibirTabela(true);
            })
            .catch((erro) => {
                alert('Erro ao salvar inscrição: ' + erro.message);
            });
    }

    return (
        <Form onSubmit={salvarInscricao}>
            <Form.Group className="mb-3" controlId="candidatoId">
                <Form.Label>Candidato:</Form.Label>
                <Form.Control
                    as="select"
                    name="candidatoId"
                    value={inscricao.candidatoId}
                    onChange={manipularMudanca}
                    required
                >
                    <option value="">Selecione um candidato</option>
                    {listaDeCandidatos.map((candidato) => (
                        <option key={candidato.id} value={candidato.id}>
                            {candidato.nome}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="vagaId">
                <Form.Label>Vaga:</Form.Label>
                <Form.Control
                    as="select"
                    name="vagaId"
                    value={inscricao.vagaId}
                    onChange={manipularMudanca}
                    required
                >
                    <option value="">Selecione uma vaga</option>
                    {listaDeVagas.map((vaga) => (
                        <option key={vaga.id} value={vaga.id}>
                            {vaga.titulo}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Realizar Inscrição
            </Button>{' '}
            <Button
                variant="secondary"
                onClick={() => {
                    props.setExibirTabela(true);
                }}
            >
                Cancelar
            </Button>
        </Form>
    );
}
