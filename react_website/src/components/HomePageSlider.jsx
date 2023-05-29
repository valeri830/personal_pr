import HomeCSS from "../componentsCss/HomePage.module.css";
import Carousel from "react-bootstrap/Carousel";
import FirstSLider from "../assets/first_slider.png";
import ThurdSLider from "../assets/thurd_slider.png";
import SecondSLider from "../assets/second_slider.png";
import { useTranslation } from 'react-i18next';


function HomePageSlider() {
  const { t, i18n } = useTranslation()

  return (
    <Carousel className={HomeCSS.shadow}>

      <Carousel.Item interval={3000}>
        <img className="d-block w-100" style={{ opacity: "77%" }} src={ThurdSLider} alt="Third slide" />

        <Carousel.Caption sx={{ pb: 20 }} >
          <h4>
            {t('Home.PageSlider.slider_one.part_one')}
          </h4>
          <h4 style={{ paddingBottom: "20px" }}>
            {t('Home.PageSlider.slider_one.part_two')}
          </h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img className="d-block w-100 " style={{ opacity: "77%" }} src={FirstSLider} alt="First slide" />
        <Carousel.Caption>
          <h4 >
            {t('Home.PageSlider.slider_two.part_one')}
          </h4>
          <h4 style={{ paddingBottom: "20px" }}>
            {t('Home.PageSlider.slider_two.part_two')}
          </h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img className="d-block w-100" style={{ opacity: "77%" }} src={SecondSLider} alt="Second slide" />
        <Carousel.Caption>
          <h4>
            {t('Home.PageSlider.slider_three.part_one')}
          </h4>
          <h4 style={{ paddingBottom: "20px" }}>
            {t('Home.PageSlider.slider_three.part_two')}
          </h4>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomePageSlider;
