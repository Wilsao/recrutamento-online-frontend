import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { gravar, alterar } from '../../servicos/vagaService';

export default function FormCadVaga(props) {
    const [vaga, setVaga] = useState(
        props.modoEdicao
            ? props.vagaSelecionada
            : { id: 0, titulo: '', descricao: '', salario: 0, localizacao: '', empresa: '' }
    );

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setVaga({ ...vaga, [name]: value });
    }

    function salvarVaga(evento) {
        evento.preventDefault();
        const operacao = props.modoEdicao ? alterar : gravar;
        operacao(vaga)
            .then((resposta) => {
                alert(resposta.mensagem);
                props.setAtualizarTela(true);
                props.setExibirTabela(true);
                props.setModoEdicao(false);
            })
            .catch((erro) => {
                alert('Erro ao salvar vaga: ' + erro.message);
            });
    }

    return (
        <Form onSubmit={salvarVaga}>
            <Form.Group className="mb-3" controlId="titulo">
                <Form.Label>Título:</Form.Label>
                <Form.Control
                    type="text"
                    name="titulo"
                    value={vaga.titulo}
                    onChange={manipularMudanca}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="descricao">
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                    as="textarea"
                    name="descricao"
                    value={vaga.descricao}
                    onChange={manipularMudanca}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="salario">
                <Form.Label>Salário:</Form.Label>
                <Form.Control
                    type="number"
                    name="salario"
                    value={vaga.salario}
                    onChange={manipularMudanca}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="localizacao">
                <Form.Label>Localização:</Form.Label>
                <Form.Control
                    type="text"
                    name="localizacao"
                    value={vaga.localizacao}
                    onChange={manipularMudanca}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="empresa">
                <Form.Label>Empresa:</Form.Label>
                <Form.Control
                    type="text"
                    name="empresa"
                    value={vaga.empresa}
                    onChange={manipularMudanca}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {props.modoEdicao ? 'Atualizar' : 'Cadastrar'}
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
