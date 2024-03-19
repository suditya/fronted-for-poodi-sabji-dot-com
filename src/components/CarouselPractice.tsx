import { useState, useEffect } from "react";

const CarouselPractice = () => {
  const [idx, setIdx] = useState(0);
  const images = [
    "https://images.freeimages.com/images/large-previews/aed/three-bees-on-sunflower-1337029.jpg?fmt=webp&w=500",
    "https://images.freeimages.com/variants/DVg6TTGcRiJSdhEbY212DbAu/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=500",
    "https://images.freeimages.com/variants/59tZ1h89y8fuRnBcqUuUjEWo/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=500",
    "https://images.freeimages.com/variants/k1wQB7egQotJ7Hr3ZBPP1S5c/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=500",
  ];
  const imageslen = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prevIdx) => (prevIdx + 1) % imageslen);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [imageslen]);

  const forward = () => {
    setIdx((prevIdx) => (prevIdx + 1) % imageslen);
  };

  const backward = () => {
    setIdx((prevIdx) => (prevIdx - 1 + imageslen) % imageslen);
  };

  return (
    <div className="carousel-container">
      <button onClick={backward}>Left</button>
      <img
        src={images[idx]}
        alt=""
        className="carousel-image"
      />
      <button onClick={forward}>Right</button>
    </div>
  );
};

export default CarouselPractice;
