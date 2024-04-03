import React from 'react'
import image1 from '../../assets/Images/image1.jpeg'
import image2 from '../../assets/Images/image2.jpeg'
import wilayaOujda from '../../assets/Images/wilayaOujda.jpeg'
import './Slide.css'
import { Link } from 'react-router-dom'


export default function Slide() {
    return (
        <div>
            <div id="carouselExampleSlidesOnly" classNameName="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={wilayaOujda} className="d-block w-100 mx-auto custom-img-height" style={{height:"600px"}} alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <p>Bienvenue ! Connectez-vous maintenant :</p>
                            <Link to={"/LoginPage"}><button>connexion</button></Link> 
                        </div>
                    </div>
                    <div className="carousel-item ">
                        <img src={image2} className="d-block w-100 mx-auto custom-img-height" style={{height:"600px"}} alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <p>Bienvenue ! Connectez-vous maintenant :</p> 
                            <button>connexion</button>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={image1} className="d-block w-100 mx-auto custom-img-height" style={{height:"600px"}} alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <p>Bienvenue ! Connectez-vous maintenant :</p>
                            <button>connexion</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
