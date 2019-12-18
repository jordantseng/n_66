import React from "react";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";

//COMPONENT
import EarthLeft from "./EarthLeft";

// 教練
import quentin from "./images/expert/quentin.jpg";
import EmmanuelleRevol from "./images/expert/EmmanuelleRevol.jpg";
import JudithDrevon from "./images/expert/JudithDrevon.jpg";
import laurineBertrand from "./images/expert/laurineBertrand.jpg";
import OlivierNau from "./images/expert/OlivierNau.png";
import NicolasBichet from "./images/expert/NicolasBichet.jpg";

// 國家外框
import alaskaBorder from "./images/country-borderSVG/alaska.svg";
import canadaBorder from "./images/country-borderSVG/canada.svg";
import finlandBorder from "./images/country-borderSVG/finlande.svg";
import greenlandBorder from "./images/country-borderSVG/groenland.svg";
import icelandBorder from "./images/country-borderSVG/islande.svg";
import norwayBorder from "./images/country-borderSVG/norvege.svg";
import swedenBorder from "./images/country-borderSVG/suede.svg";
import russiaBorder from "./images/country-borderSVG/russie.svg";
import star from "./images/svg/star.svg";
import half_star from "./images/svg/half_star.svg";

//CSS
import "./HomeEarth.css";

class HomeEarth extends React.Component {
  componentDidMount() {
    let countries = document.querySelectorAll(".country");
    let mask = document.querySelector(".mask");
    let countryLabels = document.querySelectorAll(".country-label");
    let rightItems = document.querySelectorAll(".right-item");
    let cardSelections = document.querySelectorAll(".card-selection");
    let collapse = document.querySelector(".selection-body").parentElement;

    countries.forEach(country => {
      country.style.opacity = 0;
      country.addEventListener("mouseover", function() {
        countries.forEach(country => {
          country.style.opacity = 0;
        });

        this.style.opacity = 1;
        mask.style.opacity = 0.5;

        countryLabels.forEach(label => {
          label.lastElementChild.style.width = "0%";
          if (label.dataset.country === this.dataset.country) {
            label.lastElementChild.style.width = "100%";
          }
        });

        rightItems.forEach(rightItem => {
          rightItem.style.opacity = 0;
          if (rightItem.dataset.country === this.dataset.country) {
            rightItem.style.opacity = 1;
          }
        });
      });

      country.addEventListener("mouseout", function() {
        mask.style.opacity = 0;
        this.style.opacity = 0;

        countryLabels.forEach(label => {
          if (label.dataset.country === this.dataset.country) {
            // console.log(label.lastElementChild);
            label.lastElementChild.style.width = 0;
          }
        });

        rightItems.forEach(rightItem => {
          if (rightItem.dataset.country === this.dataset.country) {
            // console.log(label.lastElementChild);
            rightItem.style.opacity = 0;
          }
        });
      });
    });

    countries.forEach(country => {
      if (country.dataset.country === "norway") {
        country.style.opacity = 1;
      }
    });

    rightItems.forEach(rightItem => {
      if (rightItem.dataset.country === "norway") {
        rightItem.style.opacity = 1;
      }
    });

    countryLabels.forEach(label => {
      if (label.dataset.country === "norway") {
        label.lastElementChild.style.width = "100%";
      }
    });

    //customDropdown
    cardSelections.forEach(cardSelection => {
      cardSelection.addEventListener("click", () => {
        collapse.classList.toggle("show");

        // console.log(cardSelection.dataset.country);

        rightItems.forEach(rightItem => {
          rightItem.style.opacity = 0;

          if (cardSelection.dataset.country === rightItem.dataset.country) {
            rightItem.style.opacity = 1;
          }
        });

        countries.forEach(country => {
          country.style.opacity = 0;

          if (cardSelection.dataset.country === country.dataset.country) {
            country.style.opacity = 1;
          }
        });
      });
    });

    countryLabels.forEach(countryLabel => {
      countryLabel.addEventListener("mouseover", function() {
        let name = "." + this.dataset.country;
        console.log(name);
        let countrySvg = document.querySelector(name);
        countrySvg.style.opacity = 1;
        mask.style.opacity = 0.5;
      });

      countryLabel.addEventListener("mouseout", function() {
        let name = "." + this.dataset.country;
        let countrySvg = document.querySelector(name);
        countrySvg.style.opacity = 0;
        mask.style.opacity = 0;
      });
    });
  }

  render() {
    return (
      <>
        <section className="planet-section">
          <h6 className="sub-title-small">我們的</h6>
          <h1 className="main-title-small">大本營</h1>

          <Container fluid className="my-container">
            <Row className="pb-5">
              <Accordion className="custom-dropdown">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    各地據點
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="selection-body">
                      <div className="card-selection" data-country="canada">
                        加拿大
                      </div>
                      <div className="card-selection" data-country="norway">
                        挪威
                      </div>
                      <div className="card-selection" data-country="alaska">
                        阿拉斯加
                      </div>
                      <div className="card-selection" data-country="russia">
                        俄羅斯
                      </div>
                      <div className="card-selection" data-country="finland">
                        芬蘭
                      </div>
                      <div className="card-selection" data-country="greenland">
                        格陵蘭
                      </div>
                      <div className="card-selection" data-country="iceland">
                        冰島
                      </div>
                      <div className="card-selection" data-country="spitzberg">
                        斯匹次卑爾根
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Row>
            <Row noGutters className="justify-content-center position-relative">
              <div className="mask"></div>
              <Col lg={7}>
                <EarthLeft />
              </Col>

              <div className="col-sm-4 col-lg-5 right-area">
                <div className="world-right mx-sm-auto">
                  {/* 俄羅斯 */}
                  <div
                    className="right-item"
                    id="russiaCard"
                    data-country="russia"
                  >
                    <div className="item-image px-4">
                      <img src={russiaBorder} alt="border" />
                    </div>
                    <div>
                      <h2 className="countryCardName">俄羅斯</h2>
                    </div>
                    <div className="stars d-flex align-items-center">
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={half_star} alt="half_star" />
                      <span>4.5 / 5</span>
                    </div>
                    <p className="d-block">
                      火山是世界上最活躍的火山，風景如畫，居住著棕熊，狼或馴鹿，與太平洋，鄂霍次克海和野生河流接壤。
                      所有戶外愛好者的終生旅程，歡迎來到狂野的俄羅斯東方！
                    </p>
                    <div className="expert d-flex">
                      <div className="expertImg">
                        <img src={quentin} alt="quentin" />
                      </div>
                      <div className="expertName">
                        昆丁波維 （Quentin Beauvy)
                        <h6 className="company">負責北緯68度</h6>
                      </div>
                    </div>
                  </div>

                  {/* 阿拉斯加 */}
                  <div
                    className="right-item"
                    id="alaskaCard"
                    data-country="alaska"
                  >
                    <div className="item-image px-4">
                      <img src={alaskaBorder} alt="border" />
                    </div>
                    <div>
                      <h2 className="countryCardName">阿拉斯加</h2>
                    </div>
                    <div className="stars d-flex align-items-center">
                      <img src={half_star} alt="half_star" />
                      <img src={half_star} alt="half_star" />
                      <img src={half_star} alt="half_star" />
                      <img src={half_star} alt="half_star" />
                      <img src={half_star} alt="half_star" />
                      <span>0.0 / 5</span>
                    </div>
                    <p className="d-block">
                      阿拉斯加是一塊美麗的處女地。借助我們在帆船上進行的巡航或與我們的專業團隊一起遠足，探索其森林深處。
                    </p>
                    <div className="expert d-flex">
                      <div className="expertImg">
                        <img src={laurineBertrand} alt="laurineBertrand" />
                      </div>
                      <div className="expertName">
                        勞琳·貝特朗（laurineBertrand）
                        <h6 className="company">生產助理</h6>
                      </div>
                    </div>
                  </div>

                  {/* 加拿大 */}
                  <div
                    className="right-item"
                    id="canadaCard"
                    data-country="canada"
                  >
                    <div className="item-image px-4">
                      <img src={canadaBorder} alt="border" />
                    </div>
                    <div>
                      <h2 className="countryCardName">加拿大</h2>
                    </div>
                    <div className="stars d-flex align-items-center">
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={half_star} alt="half_star" />
                      <span>4.5 / 5</span>
                    </div>
                    <p className="d-block">
                      營地位於蒙特利爾的魁北克，而大本營則位於通往毛里西國家公園的門戶。後者是人類規模的小結構，位於公牛湖兩岸的森林中。
                      從魁北克出發，我們的當地團隊還負責在加拿大其他地區的巡迴演出：落基山脈，育空地區，加斯佩地區，有導遊帶領的旅行或完全自由的旅行！
                    </p>
                    <div className="expert d-flex">
                      <div className="expertImg">
                        <img src={OlivierNau} alt="OlivierNau" />
                      </div>
                      <div className="expertName">
                        奧利維爾·瑙（Olivier Nau）
                        <h6 className="company">目的地經理</h6>
                      </div>
                    </div>
                  </div>

                  {/* 芬蘭 */}
                  <div
                    className="right-item"
                    id="finlandCard"
                    data-country="finland"
                  >
                    <div className="item-image px-4">
                      <img src={finlandBorder} alt="border" />
                    </div>
                    <div>
                      <h2 className="countryCardName">芬蘭</h2>
                    </div>
                    <div className="stars d-flex align-items-center">
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={half_star} alt="half_star" />
                      <span>4.5 / 5</span>
                    </div>
                    <p className="d-block">
                      在這裡，我們為您提供真正沉浸在北方森林中心的機會。翻新過的旅館，以完美融入其環境。我們的五家生態旅館均設有大窗戶和每間客房的私人露台，可讓您欣賞湖泊的絕妙景色。
                      我們在芬蘭的本地基地也是他的狗窩，其中有200隻狗，其中大多數是阿拉斯加雪橇犬。所有這小小的世界都由一支訓練有素的犬舍團隊管理。
                      此外，旅館團隊和我們的嚮導將為您提供住宿指導，並與他們分享他們對該地區的知識和熱情。
                    </p>
                    <div className="expert d-flex">
                      <div className="expertImg">
                        <img src={OlivierNau} alt="OlivierNau" />
                      </div>
                      <div className="expertName">
                        奧利維爾·瑙（Olivier Nau）
                        <h6 className="company">目的地經理</h6>
                      </div>
                    </div>
                  </div>

                  {/* 格陵蘭 */}
                  <div
                    className="right-item"
                    id="greenlandCard"
                    data-country="greenland"
                  >
                    <div className="item-image px-4">
                      <img src={greenlandBorder} alt="border" />
                    </div>
                    <div>
                      <h2 className="countryCardName">格陵蘭</h2>
                    </div>
                    <div className="stars d-flex align-items-center">
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={half_star} alt="half_star" />
                      <span>4.5 / 5</span>
                    </div>
                    <p className="d-block">
                      我們的第一個營地位於東海岸的Tasilaaq村。我們在這裡規劃徒步旅行。
                      第二個是在迪斯科灣的伊盧利薩特。這個皮划艇基地是我們在海灣進行所有皮划艇或遠足旅行的起點。
                      卓越的目的地，卓越的團隊！在您入住期間，我們經驗豐富的主管將陪伴您，安全地享受您的住宿。最後，我們與格陵蘭島團隊合作，以海運方式進行。
                    </p>
                    <div className="expert d-flex">
                      <div className="expertImg">
                        <img src={quentin} alt="OlivierNau" />
                      </div>
                      <div className="expertName">
                        昆丁波維 （Quentin Beauvy)
                        <h6 className="company">目的地經理</h6>
                      </div>
                    </div>
                  </div>

                  {/* 冰島 */}
                  <div
                    className="right-item"
                    id="icelandCard"
                    data-country="iceland"
                  >
                    <div className="item-image px-4">
                      <img src={icelandBorder} alt="border" />
                    </div>
                    <div>
                      <h2 className="countryCardName">冰島</h2>
                    </div>
                    <div className="stars d-flex align-items-center">
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={half_star} alt="half_star" />
                      <span>4.6 / 5</span>
                    </div>
                    <p className="d-block">
                      雷克雅未克營地
                      從物流到我們的車隊維護，從比賽準備到每個賽道所需的設備，從嚮導到電話幫助，從機場接待到火車站接送。
                      從預訂住宿到通過“野營裝備”的貸款服務選擇露營地，我們在這裡確保您的旅行處於最佳狀態。
                      憑藉我們在現場的專業知識，我們會陪伴您從旅行選擇到冰島最美麗的遠足！
                    </p>
                    <div className="expert d-flex">
                      <div className="expertImg">
                        <img src={JudithDrevon} alt="JudithDrevon" />
                      </div>
                      <div className="expertName">
                        朱迪思·德雷文（Judith Drevon）
                        <h6 className="company">目的地經理</h6>
                      </div>
                    </div>
                  </div>

                  {/* 挪威 */}
                  <div
                    className="right-item"
                    id="norwayCard"
                    data-country="norway"
                  >
                    <div className="item-image px-4">
                      <img src={norwayBorder} alt="border" />
                    </div>
                    <div>
                      <h2 className="countryCardName">挪威</h2>
                    </div>
                    <div className="stars d-flex align-items-center">
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={half_star} alt="half_star" />
                      <span>4.6 / 5</span>
                    </div>
                    <p className="d-block">
                      弗雷文營地自2008年以來就位於羅弗敦群島，我們的大本營使我們能夠確保現場最佳物流並與旅客直接聯繫。土地的接近性和品位使我們能夠不斷探索這個國家，以發現新的地方，並為您提供更豐富的體驗。
                      出於對戶外活動的熱情，對目的地的熱愛以及對環境的不斷尊重，在現場的我們的團隊由真正的專家組成，隨時準備與您分享他們的所有秘密，帶您度過難忘的挪威之旅。
                    </p>
                    <div className="expert d-flex">
                      <div className="expertImg">
                        <img src={NicolasBichet} alt="Nicolas" />
                      </div>
                      <div className="expertName">
                        尼古拉斯·比謝（Nicolas Bichet）
                        <h6 className="company">目的地經理</h6>
                      </div>
                    </div>
                  </div>

                  {/* 斯匹次卑爾根 */}
                  <div
                    className="right-item"
                    id="spitzbergCard"
                    data-country="spitzberg"
                  >
                    <div className="item-image px-4">
                      <img src={norwayBorder} alt="border" />
                    </div>
                    <div>
                      <h2 className="countryCardName">斯匹次卑爾根</h2>
                    </div>
                    <div className="stars d-flex align-items-center">
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={half_star} alt="half_star" />
                      <span>4.6 / 5</span>
                    </div>
                    <p className="d-block">
                      朗伊爾城營地
                      66°N團隊歡迎您在三月至九月間前往斯匹次卑爾根。我們的員工由後勤人員和嚮導組成。
                      在春季，我們的基地是我們前往斯瓦爾巴特群島的單車，多功能旅行的起點。
                      在夏季，建議您乘皮划艇遊覽各個地方，並進行遠足。我們的團隊對北極世界充滿熱情，喜歡傳遞其敏銳的知識，並讓您完全安全地發現這些荒野。我們在大本營中存儲所有您在賽道上借給您的特定設備，以使您只隨身攜帶山地裝備。
                    </p>
                    <div className="expert d-flex">
                      <div className="expertImg">
                        <img src={NicolasBichet} alt="Nicolas" />
                      </div>
                      <div className="expertName">
                        尼古拉斯·比謝（Nicolas Bichet）
                        <h6 className="company">目的地經理</h6>
                      </div>
                    </div>
                  </div>

                  {/* 瑞典 */}
                  <div
                    className="right-item"
                    id="swedenCard"
                    data-country="sweden"
                  >
                    <div className="item-image px-4">
                      <img src={swedenBorder} alt="border" />
                    </div>
                    <div>
                      <h2 className="countryCardName">瑞典</h2>
                    </div>
                    <div className="stars d-flex align-items-center">
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <img src={star} alt="star" />
                      <span>4.1 / 5</span>
                    </div>
                    <p className="d-block">
                      瑞典幾乎和法國一樣大，但人口卻少了七倍。
                      廣闊的視野，甜蜜的生活，絕對寧靜的風景……我們提供了幾次瑞典之旅，使您完全沉浸在拉普蘭。
                    </p>
                    <div className="expert d-flex">
                      <div className="expertImg">
                        <img src={EmmanuelleRevol} alt="EmmanuelleRevol" />
                      </div>
                      <div className="expertName">
                        艾曼紐（Emmanuelle Revol）
                        <h6 className="company">專家顧問</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default HomeEarth;
