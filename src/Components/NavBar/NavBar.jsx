import LogoW from "../../assets/Images/LogoW.png"


export default function NavBar() {
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-felx justify-content-between">
            <a className="navbar-brand" href="#">
                <img className="rounded   mx-3" src={LogoW} alt="logo" width="100" style={{height: "60px"}}/>
                <h1 className="text d-inline-block">Gestion de Salaire</h1>
            </a>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
        </div>
       
    </nav>
    </>
    )
}
