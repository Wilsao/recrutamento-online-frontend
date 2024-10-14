const urlBase = 'http://localhost:4000/entrevista';

export async function gravar(entrevista) {
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entrevista),
    });
    return await resposta.json();
}

export async function alterar(entrevista) {
    const resposta = await fetch(urlBase, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entrevista),
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
