const urlBase = 'http://localhost:4000/vaga';

export async function gravar(vaga) {
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vaga),
    });
    return await resposta.json();
}

export async function alterar(vaga) {
    const resposta = await fetch(urlBase, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vaga),
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
