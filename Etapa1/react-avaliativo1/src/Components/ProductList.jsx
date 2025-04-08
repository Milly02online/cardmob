import React, { useState } from 'react';

const ProductList = ( { produtos }) => {
    return (
        <span>
            {produtos.nome} - {produtos.preco}
        </span>
    )
};

export default ProductList;