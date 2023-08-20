import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchTableData() {
      try {
        const response = await axios.post('/api/tabela_completa', {
          tabela: 'NomeDaTabela', // Substitua pelo nome da tabela desejada
        });
        setTableData(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados da tabela', error);
      }
    }

    fetchTableData();
  }, []);

  return (
    <div className="table-container">
      <h2>Tabela de Dados</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            {/* Adicione mais colunas aqui, se necessário */}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.nome}</td>
              {/* Adicione mais colunas aqui, correspondentes aos dados da tabela */}
              {/* Exemplo: */}
              {/* <td>{row.coluna}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
