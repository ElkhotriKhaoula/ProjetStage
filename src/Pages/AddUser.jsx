import { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";


function getGrades(arr) {
    const result = [];
    for (let rec of arr) {
        result.push(rec.grade);
    }
    return Array.from(new Set(result))
}

function getEchelles(arr, grade) {
    if (!arr && !grade) {
        return []
    }
    const filtredGrades = arr.filter(e => e.grade === grade);
    const result = [];
    for (let rec of filtredGrades) {
        result.push(rec.echelle);
    }
    return Array.from(new Set(result))
}


function getEchelons(arr, grade, echelle) {
    if (!arr && !grade && !echelle) {
        return []
    }
    const filtredGrades = arr.filter(e => e.grade === grade && e.echelle === +echelle);
    const result = [];
    for (let rec of filtredGrades) {
        result.push(rec.echelon);
    }
    return Array.from(new Set(result))
}

function getId(arr, grade, echelle, echelon) {
    if (!arr && !grade && !echelle && !echelon) {
        return null
    }

    let result = arr.filter(ele => (ele.grade === grade && ele.echelle === +echelle && ele.echelon === +echelon));
    if (!result.length) {
        return
    }
    return result[0].id;
}



export default function AddUser() {

    const [db, setDb] = useState([])
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [fields, setFields] = useState({ grade: [], echelle: [], echelon: [] });


    const onSubmit = (data) => {
        const id = getId(db, data.grade, data.echelle, data.echelon);
        const donne = { ...data, id }
        axios.post("http://localhost/react/ajouter.php", donne).then(function (res) {
            console.log(res);
            window.alert("ajouté avec succé");
            reset();
        })
    }


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "grade") {
                setFields(prev => ({ ...prev, echelle: getEchelles(db, value.grade) }));
            }
            if (name === "echelle") {
                setFields(prev => ({ ...prev, echelon: getEchelons(db, value.grade, value.echelle) }));
            }
        }
        )
        return () => subscription.unsubscribe()
    }, [watch, db])

    const url = "http://localhost/react/getGrade.php";

    useEffect(() => {
        axios.get(url).then(function (res) {
            //console.log(res.data);
            setDb(res.data);
            setFields(
                prev => {
                    return { ...prev, grade: getGrades(res.data) }
                }
            )
        })
    }, [])

    return (

        <div className="mb-3 container">

            <h2>Ajouter un Nouveau Employé</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row mb-3'>

                    <div className='col-4'>
                        <label htmlFor="nom" className="form-label">Nom et Prénom</label>
                        <input type="text" className="form-control" id="nom" placeholder='Nom et Prénom' {...register("name", { required: "Entrer le nom" })} />
                        {errors.name && <span className="text-danger">{errors.name.message}</span>}
                    </div>
                    <div className='col-4'>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" {...register('email', { required: "Entrer email" })} placeholder='Email' />
                        {errors.email && <span className="text-danger">L'email est requis</span>}
                    </div>
                    <div className='col-4'>
                        <label htmlFor="mdp" className="form-label">Mot de passe</label>
                        <input type="text" className="form-control" id="mdp" {...register("password", { required: "Entrer le mot de passe" })} placeholder='mot de passe' />
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </div>
                </div>
                <div className='row mb-3'>

                    <div className="col-6">
                        <label htmlFor="cin" className="form-label">CIN</label>
                        <input type="text" className="form-control" id="cin" {...register('cin', { required: "Entrer CIN" })} placeholder='CIN' />
                        {errors.cni && <span className="text-danger">{errors.cni.message}</span>}
                    </div>

                    <div className='col-6'  >
                        <label htmlFor="situation" className="form-label">Situation Familiale</label>
                        <select className="form-select" id='situation' {...register('situation', { required: "Entrer la situation familiale" })}>
                            <option value="">choisir Situation</option>
                            <option value={"marié(e)"}>marié(e)</option>
                            <option value={"célibataire"}>célibataire</option>
                            <option value={"veuf(ve)"}>veuf(ve)</option>
                            <option value={"divoré(e)"}>divoré(e)</option>
                        </select>
                        {errors.situation && <span className="text-danger">{errors.situation.message}</span>}
                    </div>
                </div>

                <div className='row mb-3'>

                <div className="col-6">
                    <label htmlFor="naissance" className="form-label">Date naissance</label>
                    <input type="date" className="form-control" id="naissance" {...register("date_naissance", { required: "Entre la date naissance" })} />
                    {errors.date_naissance && <span className="text-danger">{errors.date_naissance.message}</span>}
                </div>

                <div className="col-6">
                    <label htmlFor="recrutement" className="form-label">Date recrutement</label>
                    <input type="date" className="form-control" id="recrutement"  {...register('date_recrutement', { required: "Entrer la Date de recrutemen" })} />
                    {errors.date_recrutement && <span className="text-danger">{errors.date_recrutement.message}</span>}
                </div>
                </div>
                <div className='row mb-3'>

                <div className='col-3'>
                    <label htmlFor="role" className="form-label">Role</label><br />
                    <select className="form-select" id='role' {...register("role", { required: "Entrer le role" })}>
                        <option value="">choisir role</option>
                        <option value={"admin"}>admin</option>
                        <option value={"user"}>user</option>
                    </select>
                    {errors.role && <span className="text-danger">{errors.role.message}</span>}
                </div>

                <div className='col-3'>
                    <label htmlFor="grade" className="form-label">Grade</label>
                    <select className="form-select" id='grade' {...register("grade", { required: 'Entrer le grade' })}>
                        <option value="">choisir grade</option>
                        {fields.grade?.map((item, id) => (<option value={item} key={id}>{item}</option>))}
                    </select>
                    {errors.grade && <span className="text-danger">{errors.grade.message}</span>}
                </div>


                <div className='col-3'  >
                    <label htmlFor="echelle" className="form-label">Echelle</label>
                    <select className="form-select" id='echelle' {...register("echelle", { required: "Entrer l'echelle" })}>
                        <option value="">choisir echelle</option>
                        {fields.echelle.map((item, id) => (<option value={item} key={id}>{item}</option>))}
                    </select>
                    {errors.echelle && <span className="text-danger">{errors.echelle.message}</span>}
                </div>

                <div className='col-3' >
                    <label htmlFor="echelon" className="form-label">Echelon</label>
                    <select className="form-select" id='echelon' {...register("echelon", { required: "Entrer l'echelon" })}>
                        <option value="">choisir echelon</option>
                        {fields.echelon.map((item, id) => (<option value={item} key={id}>{item}</option>))}
                    </select>
                    {errors.echelon && <span className="text-danger">{errors.echelon.message}</span>}
                </div>
                </div>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
            </form>

        </div>
    )
}
