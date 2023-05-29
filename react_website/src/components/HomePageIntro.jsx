import HomeCSS from "../componentsCss/HomePage.module.css";
import HomeIntroCSS from "../componentsCss/HomePageIntro.module.css"

import Cover from "../assets/cover.jpg";
import News from "../assets/news.svg";
import Offers from "../assets/offers.svg";
import Overview from "../assets/overview.svg";
import CountUp from "react-countup";
import React from "react";
import { useTranslation } from 'react-i18next';


function HomePageIntro() {

  const { t, i18n } = useTranslation()

  return (
    <div className={HomeIntroCSS.containerr}>

      <div className={HomeCSS.centered}>
        <span className={`${HomeCSS.bigger_title}`}>Capital Plus</span>
        <br></br>
        Business & Property Brokers
      </div>
      <div className={`${HomeCSS.three} container-fluid`}>
        <div
          className="row"
          style={{
            padding: "10px",
          }}
        >
          <div className="col-sm">
            <div className={HomeCSS.offers}>
              <img
                src={Offers}
                alt="offers_pic"
                className={HomeCSS.offers_pic}
              />
              <h4 className={HomeCSS.counter_first}>
                <CountUp end={1200} suffix=" + " className={HomeCSS.counter} />
                <h4 className={HomeCSS.offers_text}>
                  {t('Home.PageIntro.offers')}
                </h4>
              </h4>
            </div>
          </div>
          <div className="col-sm">
            {" "}
            <div className={HomeCSS.offers}>
              <img
                src={News}
                width="80"
                height="80"
                alt="offers_news_pic"
                className={HomeCSS.offers_pic}
              />
              <h4 className={HomeCSS.counter_first}>
                <CountUp end={300} suffix=" + " className={HomeCSS.counter} />
                <h4 className={HomeCSS.offers_text}>
                  {t('Home.PageIntro.news')}
                </h4>
              </h4>
            </div>
          </div>
          <div className="col-sm">
            {" "}
            <div className={HomeCSS.offers}>
              <img
                src={Overview}
                width="80"
                height="80"
                alt="offers_pic_view"
                className={HomeCSS.offers_pic}
              />
              <h4 className={HomeCSS.counter_first}>
                <CountUp end={360} suffix=" ° " className={HomeCSS.counter} />
                <h4 className={HomeCSS.offers_text}>
                  {t('Home.PageIntro.view')}
                </h4>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <img className={HomeIntroCSS.coverr} src={Cover} alt="cover image" />
    </div>
  );
}

export default HomePageIntro;
