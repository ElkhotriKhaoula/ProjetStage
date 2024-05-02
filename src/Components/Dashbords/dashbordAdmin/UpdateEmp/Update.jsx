import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

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


export default function UpdateUser() {

    const [db, setDb] = useState([])
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: async () => {
            const res = await axios.get(`http://localhost/react/Employeget.php/${id}`);
            return res.data;
        }
    });
    const [fields, setFields] = useState({ grade: [], echelle: [], echelon: [] });

    const onSubmit = (data) => {
        const id_grade = getId(db, data.nom_grade, data.echelle, data.echelon);
        const donne = { ...data, id_grade, id };
        axios.post("http://localhost/react/update.php", donne).then(function (res) {
            console.log(res.data);
        })
    }

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "nom_grade") {
                setFields(prev => ({ ...prev, echelle: getEchelles(db, value.nom_grade) }));
            }
            if (name === "echelle") {
                setFields(prev => ({ ...prev, echelon: getEchelons(db, value.nom_grade, value.echelle) }));
            }
        }
        )
        return () => subscription.unsubscribe();
    }, [watch, db])

    const url = "http://localhost/react/getGrade.php";

    useEffect(() => {
        axios.get(url).then(function (res) {
            setDb(res.data);
            setFields(
                prev => {
                    return { ...prev, grade: getGrades(res.data) }
                }
            )
        })
    }, [])

    return (
        <div className="mt-3 container">
            <h1>Modifier</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                    <div className="col-4">
                        <label htmlFor="nom" className="form-label">Nom et Prénom</label>
                        <input type="text" className={`form-control ${errors.nom_prenom ? "is-invalid" : ""}`} id="nom" placeholder='Nom et Prénom' {...register("nom_prenom", { required: "Entrer le nom" })} />
                        {errors.nom_prenom && <span className="text-danger">{errors.nom_prenom.message}</span>}
                    </div>
                    <div className="col-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className={`form-control ${errors.login ? "is-invalid" : ""}`} id="email" {...register('login', { required: "Entrer email" })} placeholder='Email' />
                        {errors.login && <span className="text-danger">L'email est requis</span>}
                    </div>
                    <div className="col-4">
                        <label htmlFor="mdp" className="form-label">Mot de passe</label>
                        <input type="text" className={`form-control ${errors.password ? "is-invalid" : ""}`} id="mdp" {...register("password", { required: "Entrer le mot de passe" })} placeholder='mot de passe' />
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-6">
                        <label htmlFor="cin" className="form-label">CIN</label>
                        <input type="text" className={`form-control ${errors.CIN ? "is-invalid" : ""}`} id="cin" {...register('CIN', { required: "Entrer CIN" })} placeholder='CIN' />
                        {errors.CIN && <span className="text-danger">{errors.CIN.message}</span>}
                    </div>

                    <div className='col-6'  >
                        <label htmlFor="situation" className="form-label">Situation Familiale</label>
                        <select className={`form-select ${errors.situation_familiale ? "is-invalid" : ""}`} id='situation' {...register('situation_familiale', { required: "Entrer la situation familiale" })}>
                            <option value="">choisir Situation</option>
                            <option value={"marie"}>marié(e)</option>
                            <option value={"célibataire"}>célibataire</option>
                            <option value={"veuf"}>veuf(ve)</option>
                            <option value={"divoré"}>divoré(e)</option>
                        </select>
                        {errors.situation_familiale && <span className="text-danger">{errors.situation_familiale.message}</span>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-6">
                        <label htmlFor="naissance" className="form-label">Date naissance</label>
                        <input type="date" className={`form-control ${errors.date_naissance ? "is-invalid" : ""}`} id="naissance" {...register("date_naissance", { required: "Entre la date naissance" })} />
                        {errors.date_naissance && <span className="text-danger">{errors.date_naissance.message}</span>}
                    </div>

                    <div className="col-6">
                        <label htmlFor="recrutement" className="form-label">Date recrutement</label>
                        <input type="date" className={`form-control ${errors.date_recrutement ? "is-invalid" : ""}`} id="recrutement"  {...register('date_recrutement', { required: "Entrer la Date de recrutemen" })} />
                        {errors.date_recrutement && <span className="text-danger">{errors.date_recrutement.message}</span>}
                    </div>
                </div>

                <div className="row">
                    <div className='col-3 mb-3'>
                        <label htmlFor="role" className="form-label">Role</label><br />
                        <select className={`form-control ${errors.role ? "is-invalid" : ""}`} id='role' {...register("role", { required: "Entrer le role" })}>
                            <option value="">choisir role</option>
                            <option value={"admin"}>admin</option>
                            <option value={"user"}>user</option>
                        </select>
                        {errors.role && <span className="text-danger">{errors.role.message}</span>}
                    </div>
                    <div className='col-3 mb-3'>
                        <label htmlFor="grade" className="form-label">Grade</label>
                        <select className={`form-control ${errors.grade ? "is-invalid" : ""}`} id='grade' {...register("nom_grade", { required: 'Entrer le grade' })}>
                            <option value="">choisir grade</option>
                            {fields.grade?.map((item, id) => (<option value={item} key={id}>{item}</option>))}
                        </select>
                        {errors.grade && <span className="text-danger">{errors.grade.message}</span>}
                    </div>
                    <div className='col-3 mb-3'  >
                        <label htmlFor="echelle" className="form-label">Echelle</label>
                        <select className={`form-select ${errors.echelle ? "is-invalid" : ""}`} id='echelle' {...register("echelle", { required: "Entrer l'echelle" })}>
                            <option value="">choisir echelle</option>
                            {fields.echelle.map((item, id) => (<option value={item} key={id}>{item}</option>))}
                        </select>
                        {errors.echelle && <span className="text-danger">{errors.echelle.message}</span>}
                    </div>
                    <div className='col-3 mb-3' >
                        <label htmlFor="echelon" className="form-label">Echelon</label>
                        <select className={`form-select ${errors.echelon ? "is-invalid" : ""}`} id='echelon' {...register("echelon", { required: "Entrer l'echelon" })}>
                            <option value="">choisir echelon</option>
                            {fields.echelon.map((item, id) => (<option value={item} key={id}>{item}</option>))}
                        </select>
                        {errors.echelon && <span className="text-danger">{errors.echelon.message}</span>}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Enregistré</button>
            </form>
        </div>
    )
}
