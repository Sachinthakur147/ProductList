import { useState, useEffect } from "react";

const HomePage = () => {
  const images = [
    "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg",
    "https://media.istockphoto.com/id/1414801672/photo/cardboard-box-with-cosmetics-product-in-front-od-open-door-buying-online-and-delivery.jpg?s=612x612&w=0&k=20&c=SA9VCzp-QtpzlliX8dM_uoH8K20U1gHqYfsWP08aLl0=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9YL_gULeR_w6Vus30JxsM0lGuiHFHmJKG5Q&s",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 min-h-screen flex items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-white mb-6">
          Welcome to <span className="text-yellow-300">Product Manager</span>
        </h1>
        <p className="text-lg text-gray-200 mb-8">
          Manage your products seamlessly with our intuitive interface.
        </p>

        <div className="relative w-full max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-auto"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-2 flex justify-center space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentIndex === index ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
