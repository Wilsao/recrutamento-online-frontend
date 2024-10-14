import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { gravar, alterar } from '../../servicos/candidatoService';

export default function FormCadCandidato(props) {
    const [candidato, setCandidato] = useState(
        props.modoEdicao
            ? props.candidatoSelecionado
            : {
                id: 0,
                nome: '',
                cpf: '',
                rg: '',
                orgaoEmissor: '',
                dataNascimento: '',
                naturalidade: '',
                estadoCivil: '',
                nomePai: '',
                nomeMae: '',
                nomeConjuge: '',
                possuiFilhos: false,
                residenciaPropria: false,
                endereco: '',
                numero: '',
                bairro: '',
                municipio: '',
                uf: '',
                cep: '',
                telefone: '',
                celular: '',
                email: '',
                ctpsNumero: '',
                ctpsSerie: '',
                tituloEleitorNumero: '',
                zonaEleitoral: '',
                pis: '',
                cnhNumero: '',
                certidaoMilitarNumero: '',
                certidaoMilitarSerie: '',
                certidaoMilitarCategoria: '',
                ensinoFundamentalCompleto: false,
                ensinoMedioCompleto: false,
                ensinoSuperiorCompleto: false,
                curso: '',
            }
    );

    function manipularMudanca(evento) {
        const { name, value, type, checked } = evento.target;
        setCandidato({ ...candidato, [name]: type === 'checkbox' ? checked : value });
    }

    function salvarCandidato(evento) {
        evento.preventDefault();
        const operacao = props.modoEdicao ? alterar : gravar;
        operacao(candidato)
            .then((resposta) => {
                alert(resposta.mensagem);
                props.setAtualizarTela(true);
                props.setExibirTabela(true);
                props.setModoEdicao(false);
            })
            .catch((erro) => {
                alert('Erro ao salvar candidato: ' + erro.message);
            });
    }

    return (
        <Form onSubmit={salvarCandidato}>
            <h4>Dados Pessoais</h4>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control
                            type="text"
                            name="nome"
                            value={candidato.nome}
                            onChange={manipularMudanca}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="cpf">
                        <Form.Label>CPF:</Form.Label>
                        <Form.Control
                            type="text"
                            name="cpf"
                            value={candidato.cpf}
                            onChange={manipularMudanca}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="rg">
                        <Form.Label>RG:</Form.Label>
                        <Form.Control
                            type="text"
                            name="rg"
                            value={candidato.rg}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="orgaoEmissor">
                        <Form.Label>Órgão Emissor:</Form.Label>
                        <Form.Control
                            type="text"
                            name="orgaoEmissor"
                            value={candidato.orgaoEmissor}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="dataNascimento">
                        <Form.Label>Data de Nascimento:</Form.Label>
                        <Form.Control
                            type="date"
                            name="dataNascimento"
                            value={candidato.dataNascimento}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="naturalidade">
                        <Form.Label>Naturalidade:</Form.Label>
                        <Form.Control
                            type="text"
                            name="naturalidade"
                            value={candidato.naturalidade}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="estadoCivil">
                        <Form.Label>Estado Civil:</Form.Label>
                        <Form.Control
                            as="select"
                            name="estadoCivil"
                            value={candidato.estadoCivil}
                            onChange={manipularMudanca}
                        >
                            <option value="">Selecione</option>
                            <option value="Solteiro(a)">Solteiro(a)</option>
                            <option value="Casado(a)">Casado(a)</option>
                            <option value="Divorciado(a)">Divorciado(a)</option>
                            <option value="Viúvo(a)">Viúvo(a)</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="nomePai">
                        <Form.Label>Nome do Pai:</Form.Label>
                        <Form.Control
                            type="text"
                            name="nomePai"
                            value={candidato.nomePai}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="nomeMae">
                        <Form.Label>Nome da Mãe:</Form.Label>
                        <Form.Control
                            type="text"
                            name="nomeMae"
                            value={candidato.nomeMae}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="nomeConjuge">
                        <Form.Label>Nome do Cônjuge:</Form.Label>
                        <Form.Control
                            type="text"
                            name="nomeConjuge"
                            value={candidato.nomeConjuge}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="possuiFilhos">
                <Form.Check
                    type="checkbox"
                    label="Possui Filhos"
                    name="possuiFilhos"
                    checked={candidato.possuiFilhos}
                    onChange={manipularMudanca}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="residenciaPropria">
                <Form.Check
                    type="checkbox"
                    label="Residência Própria"
                    name="residenciaPropria"
                    checked={candidato.residenciaPropria}
                    onChange={manipularMudanca}
                />
            </Form.Group>

            <h4>Contato</h4>
            <Row>
                <Col md={8}>
                    <Form.Group className="mb-3" controlId="endereco">
                        <Form.Label>Endereço:</Form.Label>
                        <Form.Control
                            type="text"
                            name="endereco"
                            value={candidato.endereco}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group className="mb-3" controlId="numero">
                        <Form.Label>Número:</Form.Label>
                        <Form.Control
                            type="text"
                            name="numero"
                            value={candidato.numero}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group className="mb-3" controlId="cep">
                        <Form.Label>CEP:</Form.Label>
                        <Form.Control
                            type="text"
                            name="cep"
                            value={candidato.cep}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="bairro">
                        <Form.Label>Bairro:</Form.Label>
                        <Form.Control
                            type="text"
                            name="bairro"
                            value={candidato.bairro}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="municipio">
                        <Form.Label>Município:</Form.Label>
                        <Form.Control
                            type="text"
                            name="municipio"
                            value={candidato.municipio}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="uf">
                        <Form.Label>UF:</Form.Label>
                        <Form.Control
                            type="text"
                            name="uf"
                            value={candidato.uf}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={candidato.email}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="telefone">
                        <Form.Label>Telefone:</Form.Label>
                        <Form.Control
                            type="text"
                            name="telefone"
                            value={candidato.telefone}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="celular">
                        <Form.Label>Celular:</Form.Label>
                        <Form.Control
                            type="text"
                            name="celular"
                            value={candidato.celular}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <h4>Documentação</h4>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="ctpsNumero">
                        <Form.Label>CTPS Número:</Form.Label>
                        <Form.Control
                            type="text"
                            name="ctpsNumero"
                            value={candidato.ctpsNumero}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="ctpsSerie">
                        <Form.Label>CTPS Série:</Form.Label>
                        <Form.Control
                            type="text"
                            name="ctpsSerie"
                            value={candidato.ctpsSerie}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="tituloEleitorNumero">
                        <Form.Label>Título de Eleitor Número:</Form.Label>
                        <Form.Control
                            type="text"
                            name="tituloEleitorNumero"
                            value={candidato.tituloEleitorNumero}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="zonaEleitoral">
                        <Form.Label>Zona Eleitoral:</Form.Label>
                        <Form.Control
                            type="text"
                            name="zonaEleitoral"
                            value={candidato.zonaEleitoral}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="pis">
                        <Form.Label>PIS:</Form.Label>
                        <Form.Control
                            type="text"
                            name="pis"
                            value={candidato.pis}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="cnhNumero">
                        <Form.Label>CNH Número:</Form.Label>
                        <Form.Control
                            type="text"
                            name="cnhNumero"
                            value={candidato.cnhNumero}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="certidaoMilitarNumero">
                        <Form.Label>Certidão Militar Número:</Form.Label>
                        <Form.Control
                            type="text"
                            name="certidaoMilitarNumero"
                            value={candidato.certidaoMilitarNumero}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="certidaoMilitarSerie">
                        <Form.Label>Certidão Militar Série:</Form.Label>
                        <Form.Control
                            type="text"
                            name="certidaoMilitarSerie"
                            value={candidato.certidaoMilitarSerie}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="certidaoMilitarCategoria">
                        <Form.Label>Certidão Militar Categoria:</Form.Label>
                        <Form.Control
                            type="text"
                            name="certidaoMilitarCategoria"
                            value={candidato.certidaoMilitarCategoria}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <h4>Formação Acadêmica</h4>
            <Form.Group className="mb-3" controlId="ensinoFundamentalCompleto">
                <Form.Check
                    type="checkbox"
                    label="Ensino Fundamental Completo"
                    name="ensinoFundamentalCompleto"
                    checked={candidato.ensinoFundamentalCompleto}
                    onChange={manipularMudanca}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ensinoMedioCompleto">
                <Form.Check
                    type="checkbox"
                    label="Ensino Médio Completo"
                    name="ensinoMedioCompleto"
                    checked={candidato.ensinoMedioCompleto}
                    onChange={manipularMudanca}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ensinoSuperiorCompleto">
                <Form.Check
                    type="checkbox"
                    label="Ensino Superior Completo"
                    name="ensinoSuperiorCompleto"
                    checked={candidato.ensinoSuperiorCompleto}
                    onChange={manipularMudanca}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="curso">
                <Form.Label>Curso (se aplicável):</Form.Label>
                <Form.Control
                    type="text"
                    name="curso"
                    value={candidato.curso}
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
