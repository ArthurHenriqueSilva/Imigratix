import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AppSummary = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="appSummary">
      <Slider {...sliderSettings}>
        <div>
          <h2>Resumo do Aplicativo</h2>
          <p>
            Este aplicativo permite que você tenha{' '}
            <strong>
              <u>
                acesso aos números de 2022 referentes aos dados de imigração da
                Polícia Federal
              </u>
            </strong>{' '}
            .
          </p>
          <p>
            Você pode buscar informações filtradas e visualizar dados relevantes
            relacionados aos números de imigração.
          </p>
          <p>
            Utilize as opções de pesquisa para encontrar informações específicas
            e utilize os recursos interativos para explorar os dados em
            detalhes.
          </p>
        </div>
        <div className="resumeData">
          <h2>Resumo dos dados</h2>
          <table className="floatleft">
            <thead>
              <tr>
                <th>Tipos de Imigrante</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Residente</td>
              </tr>
              <tr>
                <td>Temporário</td>
              </tr>
              <tr>
                <td>Provisório</td>
              </tr>
              <tr>
                <td>Fronteiriço</td>
              </tr>
            </tbody>
          </table>
          <table className="floatleft">
            <thead>
              <tr>
                <th>Países</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alemanha</td>
              </tr>
              <tr>
                <td>China</td>
              </tr>
              <tr>
                <td>Venezuela</td>
              </tr>
              <tr>
                <td>...</td>
              </tr>
            </tbody>
          </table>
          <table className="floatleft">
            <thead>
              <tr>
                <th>Estados</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Acre</td>
              </tr>
              <tr>
                <td>São Paulo</td>
              </tr>
              <tr>
                <td>Rio de Janeiro</td>
              </tr>
              <tr>
                <td>...</td>
              </tr>
            </tbody>
          </table>
          <div className="clear"></div>
        </div>

        <div className="resumeData">
          <h2>Resumo dos dados</h2>
          <table className="floatleft">
            <thead>
              <tr>
                <th>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-user-circle"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dev 0</td>
              </tr>
            </tbody>
          </table>
          <table className="floatleft">
            <thead>
              <tr>
                <th>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-user-circle"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dev 1</td>
              </tr>
            </tbody>
          </table>
          <table className="floatleft">
            <thead>
              <tr>
                <th>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-user-circle"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dev 2</td>
              </tr>
            </tbody>
          </table>
          <div className="clear"></div>
        </div>
      </Slider>
    </section>
  );
};

export default AppSummary;
