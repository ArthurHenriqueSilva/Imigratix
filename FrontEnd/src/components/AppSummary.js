import React from "react";
import Slider from "react-slick";
import ChartComponent from "./chartComponent";
import HeatmapMap from "./mapaCalor";
import "../styles/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AppSummary = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="appSummary">
      <Slider {...sliderSettings} className="slider-custom">
        <div className="resumeData">
          <h2>Resumo do Aplicativo</h2>
          <p>
            Este aplicativo permite que você tenha{" "}
            <strong>
              <u>
                acesso aos números de 2022 referentes aos dados de imigração da
                Polícia Federal
              </u>
            </strong>{" "}
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
          <ChartComponent />
        </div>
        <div className="resumeData">
          <HeatmapMap />
        </div>
      </Slider>
    </section>
  );
};

export default AppSummary;
