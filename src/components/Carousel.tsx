import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../styles/Carousel.css"; // Import your carousel styling

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    pauseOnHover: true,
    pauseOnFocus: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500, // Adjust the autoplay speed (in milliseconds),
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false, // Hide arrows on smaller screens
        },
      },
    ],
  };

  const gifs = [
    "https://media.giphy.com/media/l1ug7GcA17te0JKjm/giphy.gif?cid=790b7611xuei6zw4quzn5s7evazngxr9lw80g0wv73atjbbk&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHVlaTZ6dzRxdXpuNXM3ZXZhem5neHI5bHc4MGcwd3Y3M2F0amJiayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oeSANlR56jz1tEPao/giphy.gif",
    "https://media.giphy.com/media/3oeSB4A4F1CEX4EP2o/giphy.gif?cid=790b7611xuei6zw4quzn5s7evazngxr9lw80g0wv73atjbbk&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {gifs.map((gif, index) => (
          <div className="slider-container" key={index}>
            <img
              src={gif}
              className="carousel-image"
              alt={`Gif ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
