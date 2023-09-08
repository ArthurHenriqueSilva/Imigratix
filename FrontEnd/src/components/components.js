import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/style.css";

const Frame1 = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestedCountries, setSuggestedCountries] = useState([]);
  useEffect(() => {
    if (inputValue) {
      axios
        .get(`https://restcountries.com/v3.1/name/${inputValue}`)
        .then((response) => {
          const suggestions = response.data.map((country) => {
            return {
              name: country.name.common,
              flag: country.flags.png,
            };
          });
          setSuggestedCountries(suggestions);
        })
        .catch((error) => {
          console.error("Erro ao buscar países sugeridos:", error);
        });
    } else {
      setSuggestedCountries([]);
    }
  }, [inputValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuggestedCountries([]);

    const formData = new URLSearchParams();
    formData.append(
      "pais_filtro_distribuicao_imigrantes_pais",
      event.target.pais_filtro_distribuicao_imigrantes_pais.value
    );

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    };

    setLoading(true);
    fetch("http://localhost:80/distribuicao_imigrantes_pais", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na solicitação");
        }
        return res.json();
      })
      .then((data) => {
        // Formatando os dados para retirar o prefixo "Total_"
        const formattedData = {};
        for (const [key, value] of Object.entries(data)) {
          if (key !== "pais") {
            const formattedKey = key.replace("Total_", "");
            formattedData[formattedKey] = value;
          }
        }
        formattedData["pais"] = data.pais;
        setData(formattedData);
        setError("");
        setLoading(false);
        console.log("Dados recebidos da API para Q1", data);
      })
      .catch((error) => {
        console.error(error);
        setData({});
        setError(
          "Erro ao obter a distribuição de imigrantes do país escolhido."
        );
        setLoading(false);
      });
  };

  const handleReset = () => {
    setData({});
    setError("");
    setInputValue("");
    setSuggestedCountries([]);
  };

  const handleCountryInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <div>
      <h2>Quantização de imigrantes vindos de</h2>
      {!data.pais ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="pais_filtro_distribuicao_imigrantes_pais">
            País para filtragem:
          </label>
          <input
            type="text"
            name="pais_filtro_distribuicao_imigrantes_pais"
            autoComplete="off"
            value={inputValue}
            onChange={handleCountryInputChange}
          />

          {inputValue && (
            <ul className="suggestions-list">
              {suggestedCountries.map((country, index) => (
                <li
                  key={index}
                  onClick={() => setInputValue(country.name)}
                  className="suggestion-item"
                >
                  <img
                    src={country.flag}
                    alt={`Bandeira de ${country.name}`}
                    className="flag-icon"
                  />
                  {country.name}
                </li>
              ))}
            </ul>
          )}

          {!loading && !error && (
            <button className="submit_button" type="submit">
              Enviar
            </button>
          )}
        </form>
      ) : null}
      <div className="result">
        {loading && <p>Carregando...</p>}
        {error && !loading && (
          <div>
            <p>{error}</p>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
        {data && data.pais && (
          <div>
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>{data.pais}</th>
                </tr>
                <tr>
                  <th>Classificação</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data).map(([key, value]) => {
                  if (key !== "pais") {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Frame2 = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const mesInicio = parseInt(
      event.target.mes_inicio_pais_mais_imigracao_periodo.value
    );
    const mesFim = parseInt(
      event.target.mes_fim_pais_mais_imigracao_periodo.value
    );

    const formData = new URLSearchParams();
    formData.append("mes_inicio_pais_mais_imigracao_periodo", mesInicio);
    formData.append("mes_fim_pais_mais_imigracao_periodo", mesFim);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    };

    setLoading(true);
    fetch("http://localhost:80/pais_mais_imigracao_periodo", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na solicitação");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError("");
        setLoading(false);
        console.log("Dados recebidos da API para Q2:", data);
      })
      .catch((error) => {
        console.error(error);
        setData({});
        setError(
          "Erro ao obter o país com mais imigrantes no período selecionado"
        );
        setLoading(false);
      });
  };

  const handleReset = () => {
    setData({});
    setError("");
  };

  return (
    <div>
      <h2>País com mais imigração entre os meses de</h2>
      {!data.pais ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="mes_inicio_pais_mais_imigracao_periodo">
            Mês inicial para filtragem
          </label>
          <select name="mes_inicio_pais_mais_imigracao_periodo">
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>

          <label htmlFor="mes_fim_pais_mais_imigracao_periodo">
            Mês final para filtragem
          </label>
          <select name="mes_fim_pais_mais_imigracao_periodo">
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>

          {!loading && !error && (
            <button className="submit_button" type="submit">
              Enviar
            </button>
          )}
        </form>
      ) : null}
      <div className="result">
        {loading && <p>Carregando...</p>}
        {error && !loading && (
          <div>
            <p>{error}</p>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
        {data && data.pais && (
          <div>
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>{data.pais}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.qtd_pais}</td>
                </tr>
              </tbody>
            </table>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Frame3 = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const mesInicio = parseInt(
      event.target.mes_inicio_tipo_imigracao_mais_popular_periodo.value
    );
    const mesFim = parseInt(
      event.target.mes_fim_tipo_imigracao_mais_popular_periodo.value
    );

    const formData = new URLSearchParams();
    formData.append(
      "mes_inicio_tipo_imigracao_mais_popular_periodo",
      mesInicio
    );
    formData.append("mes_fim_tipo_imigracao_mais_popular_periodo", mesFim);
    console.log(formData);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    };

    setLoading(true);
    fetch(
      "http://localhost:80/tipo_imigracao_mais_popular_periodo",
      requestOptions
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na solicitação");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError("");
        setLoading(false);
        console.log("Dados recebidos da API para Q3", data);
      })
      .catch((error) => {
        console.error(error);
        setData({});
        setError("Erro ao obter o tipo de imigração mais comum nesse período.");
        setLoading(false);
      });
  };

  // Manipulador de evento para o botão de "Reset"
  const handleReset = () => {
    setData({});
    setError("");
  };
  return (
    <div>
      <h1>Tipo principal de imigrante entre os meses de</h1>
      {!data.pais ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="mes_inicio_tipo_imigracao_mais_popular_periodo">
            Mês inicial para filtragem
          </label>
          <select name="mes_inicio_tipo_imigracao_mais_popular_periodo">
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>

          <label htmlFor="mes_fim_tipo_imigracao_mais_popular_periodo">
            Mês final para filtragem
          </label>
          <select name="mes_fim_tipo_imigracao_mais_popular_periodo">
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
          {!loading && !error && (
            <button className="submit_button" type="submit">
              Enviar
            </button>
          )}
        </form>
      ) : null}
      <div className="result">
        {loading && <p>Carregando...</p>}
        {error && !loading && (
          <div>
            <p>{error}</p>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
        {data && data.tipo && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Tipo de Imigrante</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.tipo}</td>
                </tr>
              </tbody>
            </table>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Frame4 = () => {
  const monthNames = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append(
      "tipo_filtro_periodo_popular",
      event.target.tipo_filtro_periodo_popular.value
    );

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    };

    setLoading(true);
    fetch("http://localhost:80/periodo_popular_tipo", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na solicitação");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError("");
        setLoading(false);
        console.log("Dados recebidos da API para Q4:", data);
      })
      .catch((error) => {
        console.error(error);
        setData({});
        setError(
          "Erro ao obter o mês com mais imigrantes do tipo selecionado."
        );
        setLoading(false);
      });
  };

  const handleReset = () => {
    setData({});
    setError("");
  };
  return (
    <div>
      <h1>Mês com maior quantidade de registros de imigrantes do tipo</h1>
      {!data.periodo ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="tipo_filtro_periodo_popular">
            Tipo para filtragem:{" "}
          </label>
          <select name="tipo_filtro_periodo_popular">
            <option value="Fronteiriço">Fronteiriço</option>
            <option value="Provisório">Provisório</option>
            <option value="Residente">Residente</option>
            <option value="Temporário">Temporário</option>
          </select>

          {!loading && !error && (
            <button className="submit_button" type="submit">
              Enviar
            </button>
          )}
        </form>
      ) : null}
      <div className="result">
        {loading && <p>Carregando...</p>}
        {error && !loading && (
          <div>
            <p>{error}</p>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
        {data && data.periodo && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Mês com mais registros</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{monthNames[data.periodo]}</td>
                </tr>
              </tbody>
            </table>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
const Frame5 = () => {
  const stateAbbreviations = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];
  const monthNames = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const estado = event.target.estado_filtro_mes_popular_estado.value;
    const classificacao =
      event.target.classificacao_filtro_mes_popular_estado.value;

    const formData = new URLSearchParams();
    formData.append("estado_filtro_mes_popular_estado", estado);
    formData.append("classificacao_filtro_mes_popular_estado", classificacao);
    console.log(formData.toString());
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    };

    setLoading(true);
    fetch("http://localhost:80/mes_popular_estado", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na solicitação");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError("");
        setLoading(false);
        console.log("Dados recebidos da API para Q5:", data);
      })
      .catch((error) => {
        console.error(error);
        setData({});
        setError(
          "Erro ao obter o mês para qual esse estado recebeu o maior número de imigrantes do tipo selecionado"
        );
        setLoading(false);
      });
  };

  const handleReset = () => {
    setData({});
    setError("");
  };
  return (
    <div>
      <h1>Mês no qual esse Estado recebeu mais imigrantes do tipo</h1>
      {!data.mes ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="estado_filtro_mes_popular_estado">
            Estado para filtragem:{" "}
          </label>
          <select name="estado_filtro_mes_popular_estado">
            {stateAbbreviations.map((abbreviation) => (
              <option key={abbreviation} value={abbreviation}>
                {abbreviation}
              </option>
            ))}
          </select>

          <label htmlFor="classificacao_filtro_mes_popular_estado">
            Tipo para filtragem:{" "}
          </label>
          <select name="classificacao_filtro_mes_popular_estado">
            <option value="Fronteiriço">Fronteiriço</option>
            <option value="Provisório">Provisório</option>
            <option value="Residente">Residente</option>
            <option value="Temporário">Temporário</option>
          </select>
          {!loading && !error && (
            <button className="submit_button" type="submit">
              Enviar
            </button>
          )}
        </form>
      ) : null}
      <div className="result">
        {loading && <p>Carregando...</p>}
        {error && !loading && (
          <div>
            <p>{error}</p>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
        {data && data.mes && (
          <div>
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>{data.uf}</th>
                </tr>
                <tr>
                  <th>Tipo de Imigrante</th>
                  <th>Mês</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.classificacao}</td>
                  <td>{monthNames[data.mes]}</td>
                </tr>
              </tbody>
            </table>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Frame6 = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append(
      "mes_estado_mais_residente_por_periodo",
      event.target.mes_estado_mais_residente_por_periodo.value
    );
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    };

    setLoading(true);
    fetch("http://localhost:80/estado_mais_residente_no_mes", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na solicitação");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError("");
        setLoading(false);
        console.log("Dados recebidos da API para Q6:", data);
      })
      .catch((error) => {
        console.error(error);
        setData({});
        setError(
          "Erro ao obter o mês com mais imigrantes do tipo selecionado."
        );
        setLoading(false);
      });
  };

  const handleReset = () => {
    setData({});
    setError("");
  };
  return (
    <div>
      <h1>Estado com mais registros de imigrantes residentes no mês de</h1>
      {!data.mes ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="mes_estado_mais_residente_por_periodo">
            Mês para filtragem
          </label>
          <select name="mes_estado_mais_residente_por_periodo">
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>

          {!loading && !error && (
            <button className="submit_button" type="submit">
              Enviar
            </button>
          )}
        </form>
      ) : null}

      <div className="result">
        {loading && <p>Carregando...</p>}
        {error && !loading && (
          <div>
            <p>{error}</p>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
        {data && data.mes && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Estado com mais registros</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.estado}</td>
                </tr>
              </tbody>
            </table>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Frame7 = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append(
      "pais_filtro_estado_mais_imigrantes",
      event.target.pais_filtro_estado_mais_imigrantes.value
    );

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    };

    setLoading(true);
    fetch("http://localhost:80/estado_mais_imigrantes", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na solicitação");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError("");
        setLoading(false);
        console.log("Dados recebidos da API para Q7", data);
      })
      .catch((error) => {
        console.error(error);
        setData({});
        setError(
          "Erro ao obter a distribuição de imigrantes do país escolhido."
        );
        setLoading(false);
      });
  };
  const handleReset = () => {
    setData({});
    setError("");
  };

  return (
    <div>
      <h1>Estado com mais imigrantes vindos de</h1>
      {!data.pais ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="pais_filtro_estado_mais_imigrantes">
            Pais para filtragem:{" "}
          </label>
          <input type="text" name="pais_filtro_estado_mais_imigrantes" />

          {!loading && !error && (
            <button className="submit_button" type="submit">
              Enviar
            </button>
          )}
        </form>
      ) : null}

      <div className="result">
        {loading && <p>Carregando...</p>}
        {error && !loading && (
          <div>
            <p>{error}</p>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
        {data && data.pais && (
          <div>
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>{data.pais}</th>
                </tr>
                <tr>
                  <th>Estado</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.estado}</td>
                  <td>{data.quantidade}</td>
                </tr>
              </tbody>
            </table>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Frame8 = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append(
      "pais_filtro_tipo_imigrante_pais",
      event.target.pais_filtro_tipo_imigrante_pais.value
    );

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    };

    setLoading(true);
    fetch("http://localhost:80/tipo_imigrante_pais", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na solicitação");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError("");
        setLoading(false);
        console.log("Dados recebidos da API para Q8", data);
      })
      .catch((error) => {
        console.error(error);
        setData({});
        setError(
          "Erro ao obter a distribuição de imigrantes do país escolhido."
        );
        setLoading(false);
      });
  };
  const handleReset = () => {
    setData({});
    setError("");
  };
  return (
    <div>
      <h1>Tipo de imigrante mais comum vindo de</h1>
      {!data.pais ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="pais_filtro_tipo_imigrante_pais">
            Pais para filtragem:{" "}
          </label>
          <input type="text" name="pais_filtro_tipo_imigrante_pais" />
          {!loading && !error && (
            <button className="submit_button" type="submit">
              Enviar
            </button>
          )}
        </form>
      ) : null}

      <div className="result">
        {loading && <p>Carregando...</p>}
        {error && !loading && (
          <div>
            <p>{error}</p>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
        {data && data.pais && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>País</th>
                  <th>Tipo de Imigrante</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.pais}</td>
                  <td>{data.tipo}</td>
                </tr>
              </tbody>
            </table>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Frame9 = () => {
  const monthNames = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const pais = event.target.pais_filtro_pais_imigracao_periodo_popular.value;
    const mes = event.target.mes_filtro_pais_imigracao_periodo_popular.value;
    const formData = new URLSearchParams();
    formData.append("pais_filtro_pais_imigracao_periodo_popular", pais);
    formData.append("mes_filtro_pais_imigracao_periodo_popular", mes);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    };

    setLoading(true);
    fetch(
      "http://localhost:80/quantidade_pais_maior_periodo_imigracao",
      requestOptions
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na solicitação");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError("");
        setLoading(false);
        console.log("Dados recebidos da API para Q9:", data);
      })
      .catch((error) => {
        console.error(error);
        setData({});
        setError(
          "Erro ao obter a quantidade de imigrantes do país selecionado no mês selecionado."
        );
        setLoading(false);
      });
  };

  const handleReset = () => {
    setData({});
    setError("");
  };

  return (
    <div>
      <h1>Quantidade de imigrantes desse país no mês de</h1>
      {!data.pais ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="pais_filtro_pais_imigracao_periodo_popular">
            Pais para filtragem:{" "}
          </label>
          <input
            type="text"
            name="pais_filtro_pais_imigracao_periodo_popular"
          />{" "}
          <br />
          <label htmlFor="mes_filtro_pais_imigracao_periodo_popular">
            Mês para filtragem
          </label>
          <select name="mes_filtro_pais_imigracao_periodo_popular">
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
          {!loading && !error && (
            <button className="submit_button" type="submit">
              Enviar
            </button>
          )}
        </form>
      ) : null}
      <div className="result">
        {loading && <p>Carregando...</p>}
        {error && !loading && (
          <div>
            <p>{error}</p>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
        {data && data.pais && (
          <div>
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>{data.pais}</th>
                </tr>
                <tr>
                  <th>Mês</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{monthNames[data.mes]}</td>
                  <td>{data.quantidade}</td>
                </tr>
              </tbody>
            </table>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Frame10 = () => {
  const monthNames = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const pais =
      event.target.pais_filtro_classificacao_imigracao_mais_popular_mes.value;
    const mes = event.target.mes_filtro_classificacao_pais_tempo.value;
    const formData = new URLSearchParams();
    formData.append(
      "pais_filtro_classificacao_imigracao_mais_popular_mes",
      pais
    );
    formData.append("mes_filtro_classificacao_pais_tempo", mes);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    };

    setLoading(true);
    fetch(
      "http://localhost:80/classificacao_imigracao_mais_popular_mes",
      requestOptions
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na solicitação");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError("");
        setLoading(false);
        console.log("Dados recebidos da API para Q10:", data);
      })
      .catch((error) => {
        console.error(error);
        setData({});
        setError(
          "Erro ao obter a quantidade de imigrantes do país selecionado no mês selecionado."
        );
        setLoading(false);
      });
  };

  const handleReset = () => {
    setData({});
    setError("");
  };

  return (
    <div>
      <h1>Tipo mais recorrente de imigrante desse país no mês de</h1>
      {!data.pais ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="pais_filtro_classificacao_imigracao_mais_popular_mes">
            Pais para filtragem:{" "}
          </label>
          <input
            type="text"
            name="pais_filtro_classificacao_imigracao_mais_popular_mes"
          />{" "}
          <br />
          <label htmlFor="mes_filtro_classificacao_pais_tempo">
            Mês para filtragem
          </label>
          <select name="mes_filtro_classificacao_pais_tempo">
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
          {!loading && !error && (
            <button className="submit_button" type="submit">
              Enviar
            </button>
          )}
        </form>
      ) : null}

      <div className="result">
        {loading && <p>Carregando...</p>}
        {error && !loading && (
          <div>
            <p>{error}</p>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
        {data && data.pais && (
          <div>
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>{data.pais}</th>
                </tr>
                <tr>
                  <th>Mês</th>
                  <th>Classificação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{monthNames[data.mes]}</td>
                  <td>{data.classificacao}</td>
                </tr>
              </tbody>
            </table>
            <button className="reset_button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const frames = {
  Frame1,
  Frame2,
  Frame3,
  Frame4,
  Frame5,
  Frame6,
  Frame7,
  Frame8,
  Frame9,
  Frame10,
};

export default frames;
