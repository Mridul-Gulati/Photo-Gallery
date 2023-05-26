import './App.css';
import ImageCard from './components/imageCard';
import { useState, useEffect} from 'react';
import ImageSearch from './components/imagesearch';

function App() {
  const [images,setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(()=>{
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}s&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then( data => {
      setImages(data.hits);
      setIsLoading(false);
    })
    .catch(err => console.log(err))
  },[term]);
  return (
    <div className='container mx-auto'>
      <div className='bgImg text-5xl font-mono text-white text-center py-40'>
        <h1>VISUAL ARCHIVE</h1>
      </div>
      <ImageSearch searchText={(text)=>setTerm(text)}/>
      {(!isLoading && images.length===0 && <div grid grid-cols-3 gap-4><h1 className="text-6xl text-center mx-auto mt-32 text-pink-300 my-auto">No images found</h1></div>)}
      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32 text-pink-300">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
        {images.map(image =>(
          <ImageCard key={image.id} image={image}/>
        ))}
      </div>}
    </div>
    
  );
}

export default App;
