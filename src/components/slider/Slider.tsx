import SimpleImageSlider from "react-simple-image-slider";
import "../../styles/Slider.scss";
import image1 from "../../assets/images/img7.jpg";
import image2 from "../../assets/images/img1.jpg";
import image3 from "../../assets/images/img5.jpg";
import image4 from "../../assets/images/img22.jpg";
import image5 from "../../assets/images/img88.jpg";

interface SliderImage {
  url: string;
}

export default function Slider() {
  const sliderImages: SliderImage[] = [
    {
      url: image2,
    },
    {
      url: image3,
    },
    {
      url: image5,
    },
    {
      url: image1,
    },
    {
      url: image4,
    },
  ];

  return (
    <div className="slider-container">
      <SimpleImageSlider
        width="98%"
        height={400}
        images={sliderImages}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
        autoPlayDelay={3}
        
      />
  
    </div>
  );
}
