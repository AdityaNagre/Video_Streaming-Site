import { useState } from "react";
import "./newProduct.css";
import storage from "../../firebase";
import { getDownloadURL,ref,uploadBytesResumable } from "firebase/storage";
import { useEffect } from "react";
import { useContext } from "react";
import { MovieContext } from "../../context/movieC/MovieContext";
import { createMovie } from "../../context/movieC/apiCalls";

export default function NewProduct() {
  const [createMovie1, setcreateMovie1] = useState({
    title:null,
    year:null,
    genre:null,
    limit:null,
    isSeries:null,
    desc:null
  })
  const [img, setimg] = useState(null)
  const [imgTitle, setimgTitle] = useState(null)
  const [imgSmall, setimgSmall] = useState(null)
  const [trailer, settrailer] = useState(null)
  const [video, setvideo] = useState(null)
  const [disable, setDisable] = useState(true)
  const [counter, setCounter] = useState(0)

  const {dispatch}=useContext(MovieContext)

  const handleChangeText=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setcreateMovie1({...createMovie1, [name]:value})
  }

  const upload=(e)=>{
    e.forEach((item)=>{
      const fileName=new Date().getTime() +item.label+ item.file.name

      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on('state_changed', 
      (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
      }, 
      (error) => {
        console.log(error)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setcreateMovie1((prev)=>{
            return {...prev, [item.label]:downloadURL}
          }
          );
        });
        setCounter((prev)=>prev+1)
      }
      )
    })
  }

  const handleUpload=(e)=>{
    e.preventDefault();
    upload([
      {file:img, label:"img"},
      {file:imgTitle, label:"imgTitle"},
      {file:imgSmall, label:"imgSmall"},
      {file:trailer, label:"trailer"},
      {file:video, label:"video"}
    ])
  }

  useEffect(()=>{
    if(counter===5 && createMovie1.title && createMovie1.year&& createMovie1.genre&& createMovie1.limit&& createMovie1.isSeries&& createMovie1.desc){
      createMovie(createMovie1,dispatch);
      setCounter(0)
      alert("Movie Created Successfully")
    }
  },[counter])

  useEffect(() => {
    if(img && imgTitle && imgSmall && trailer && video){
      setDisable(false)
    }
  }, [img,imgTitle,imgSmall,trailer,video])
  

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm" >
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" value={createMovie1.title} onChange={handleChangeText} name="title" placeholder="The American Psycho" />
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" onChange={(e)=>setimg(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input type="file" id="imgTitle" onChange={(e)=>setimgTitle(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input type="file" id="imgSmall" onChange={(e)=>setimgSmall(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" value={createMovie1.desc} onChange={handleChangeText} name="desc" placeholder="Description" />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" value={createMovie1.year} onChange={handleChangeText} name="year" placeholder="Year of Release" />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" value={createMovie1.ganre} onChange={handleChangeText} name="genre" placeholder="Genre" />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" value={createMovie1.limit} onChange={handleChangeText} name="limit" placeholder="Age Limit" />
        </div>
        <div className="addProductItem">
          <label>Is Series ?</label>
          <input type="text" value={createMovie1.isSeries} onChange={handleChangeText} name="isSeries" placeholder="true/false" />
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" onChange={(e)=>settrailer(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" onChange={(e)=>setvideo(e.target.files[0])}/>
        </div>
        <button className="addProductButton" onClick={handleUpload} disabled={disable} >Upload & Create</button>
      </form>
    </div>
  );
}
