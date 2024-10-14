import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { ContextoUsuarioLogado } from '../../App';

export default function Pagina(props) {
    const contexto = useContext(ContextoUsuarioLogado);
    const { usuarioLogado, setUsuarioLogado } = contexto;

    function logout() {
        setUsuarioLogado({
            nome: '',
            logado: false,
        });
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Sistema de Gerenciamento</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/vagas">Vagas</Nav.Link>
                        <Nav.Link href="/candidatos">Candidatos</Nav.Link>
                        <Nav.Link href="/inscricoes">Inscrições</Nav.Link>
                        <Nav.Link href="/entrevistas">Entrevistas</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={logout}>Sair</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container className="mt-4">{props.children}</Container>
        </>
    );
}
