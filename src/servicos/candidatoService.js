const urlBase = 'http://localhost:4000/candidato';

export async function gravar(candidato) {
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidato),
    });
    return await resposta.json();
}

export async function alterar(candidato) {
    const resposta = await fetch(urlBase, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidato),
    });
    return await resposta.json();
}

export async function excluir(id) {
    const resposta = await fetch(urlBase, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    return await resposta.json();
}

export async function consultarTodos() {
    const resposta = await fetch(urlBase, {
        method: 'GET',
    });
    return await resposta.json();
}
