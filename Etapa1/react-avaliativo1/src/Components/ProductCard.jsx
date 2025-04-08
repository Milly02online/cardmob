import React, { useState } from 'react';
import ProductList from './ProductList';

const ProductCard = () => {
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingNome, setEditingNome] = useState('');
    const [editingPreco, setEditingPreco] = useState('');

    const createProdutos = () => {
        if (nome.trim() === '' || preco.trim() === '') return;
        setProdutos([...produtos, { id: Date.now(), nome, preco }]);
        setNome('');
        setPreco('');
    };

    const startEditing = (id, nome, preco) => {
        setEditingId(id);
        setEditingNome(nome);
        setEditingPreco(preco);
    };

    const saveEdit = () => {
        setProdutos(
            produtos.map((produtos) =>
                produtos.id === editingId
                    ? {
                          ...produtos,
                          nome: editingNome,
                          preco: editingPreco,
                      }
                    : produtos
            )
        );
        setEditingId(null);
        setEditingNome('');
        setEditingPreco('');
    };

    const deleteProdutos = (id) => {
        setProdutos(produtos.filter((produtos) => produtos.id !== id));
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingNome('');
        setEditingPreco('');
    };

    return (
        <div
            style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >

            <h1 style={{ margin: '8px' }}>Adicionar Produto</h1>
            <input
                style={{ margin: '30px 0 0 0', width: '270px', height: '35px' }}
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Nome:"
            />
            <input
                style={{ margin: '15px 0 20px 0', width: '270px', height: '35px',
                }}
                type="text"
                value={preco}
                onChange={(event) => setPreco(event.target.value)}
                placeholder="Preço:"
            />
            <button onClick={createProdutos}>Adicionar produto</button>
            <h3>Produtos</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {produtos.map((produtos) => (
                    <li key={produtos.id}>
                        {editingId === produtos.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingNome}
                                    onChange={(event) =>
                                        setEditingNome(event.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    value={editingPreco}
                                    onChange={(event) =>
                                        setEditingPreco(event.target.value)
                                    }
                                />
                                <button onClick={saveEdit}>Salvar</button>
                                <button onClick={cancelEditing}>Cancelar</button>
                            </>
                        ) : (
                            <div>
                                <ProductList produtos={produtos} />
                                <br></br>
                                <br></br>
                                <button
                                    onClick={() =>
                                        startEditing(
                                            produtos.id,
                                            produtos.nome,
                                            produtos.preco
                                        )
                                    }
                                    style = {{marginRight: "15px"}}
                                >Editar</button>
                                <button
                                    onClick={() => deleteProdutos(produtos.id)}
                                    style = {{marginRight: "15px"}}
                                >Excluir</button>
                                <button> + carrinho</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductCard;