import "./App.css";
import EstateGallery from "./components/EstateGallery";
import Navbar from "./components/Navbar";

function App() {
  const estateImages = [
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv2ho2O1g6Qtzd1vKVeAaPwsJiTjyzzi1xJQ&s",
      location: "New York, USA",
      submitted_by: "John Doe",
      rating: 4.5,
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTIydYp2eT2UjuAYWsvrBGkse68QLM25IfA&s",
      location: "Paris, France",
      submitted_by: "Alice Smith",
      rating: null,
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrhnBVSFYeIW1RiHKU8phP9wyqQBY4PBip-A&s",
      location: "Tokyo, Japan",
      submitted_by: "Hiro Tanaka",
      rating: 3.8,
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6sktocxCpw6JLNx7JpcrAGUbVuSGfm925F78NXVepIpo7TqFtV03SnRZGaKmalPrKcRo&usqp=CAU",
      location: "Cape Town, South Africa",
      submitted_by: "Zanele Moyo",
      rating: 4.9,
    },
    {
      image: "https://static.vecteezy.com/system/resources/thumbnails/048/833/602/small/white-mediterranean-home-with-driveway-free-photo.jpeg",
      location: "Sydney, Australia",
      submitted_by: "Liam Nguyen",
      rating: null,
    },
    {
      image: "https://static.vecteezy.com/system/resources/thumbnails/022/337/200/small_2x/modern-house-illustration-generative-ai-free-photo.jpg",
      location: "Toronto, Canada",
      submitted_by: "Emma Lee",
      rating: 4.2,
    },
    {
      image: "https://thumbs.dreamstime.com/b/innovative-home-cooling-systems-maximizing-comfort-efficiency-modern-technology-generative-ai-transform-your-haven-349967857.jpg",
      location: "Barcelona, Spain",
      submitted_by: "Carlos Gomez",
      rating: 3.6,
    },
    {
      image: "https://t3.ftcdn.net/jpg/11/61/21/16/360_F_1161211666_nq7dlKwYMZIztVrAhbCrRCWpvCALFfUh.jpg",
      location: "Rome, Italy",
      submitted_by: "Giulia Rossi",
      rating: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navbar />
      <main className="pt-4">
        <EstateGallery/>
      </main>
    </div>
  );
}

export default App;
