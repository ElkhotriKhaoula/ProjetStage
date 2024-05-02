import imageCoseil from "../../assets/Images/imageCoseil.png"
import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-felx justify-content-between">
            <Link className="navbar-brand" to={"/"}>
                <img className="rounded mx-3" src={imageCoseil} alt="logo" width="200" style={{height: "80px"}}/>
                <h1 className="text d-inline-block">Gestion de Salaire</h1>
            </Link>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
        </div>
        </nav>
    </>
    )
}
