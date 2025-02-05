import { useState } from "react";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    serviceCenter: "",
    email: "",
    gsmPro: "",
    gsmPerso: "",
    personneContact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="profile-container">
      <h2>Profil</h2>
      <p>Les champs suivis d'un <span>*</span> sont obligatoires.</p>
      <form onSubmit={handleSubmit}>
        <label className="input-label">
          <div>Nom<span>*</span>:</div>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input-label">
        <div>Prénom<span>*</span>:</div>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input-label">
        <div>Service Center<span>*</span>:</div>
          <select
            name="serviceCenter"
            value={formData.serviceCenter}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner un centre</option>
            <optgroup label="North-West">
              <option value="nw1">Lendelede</option>
              <option value="nw2">Lochristi</option>
            </optgroup>
            <optgroup label="North-East">
              <option value="ne1">Merksem</option>
              <option value="ne2">Stalen</option>
              <option value="ne2">Schaarbeek Noord</option>
            </optgroup>
            <optgroup label="South-West">
              <option value="s1">Gouy</option>
              <option value="s2">Schaerbeek Sud</option>
            </optgroup>
            <optgroup label="South-East">
              <option value="s1">Bressoux</option>
              <option value="s2">Villeroux</option>
              <option value="s2">Gembloux</option>
            </optgroup>
          </select>
        </label>

        <label className="input-label">
        <div>Email<span>*</span>:</div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input-label">
        <div>GSM Pro<span>*</span>:</div>
          <input
            type="tel"
            name="gsmPro"
            value={formData.gsmPro}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input-label">
        <div>GSM Perso<span>*</span>:</div>
          <input
            type="tel"
            name="gsmPerso"
            value={formData.gsmPerso}
            onChange={handleChange}
          />
        </label>

        <label className="input-label">
        <div>Personne de contact<span>*</span>:</div>
          <input
            type="text"
            name="personneContact"
            value={formData.personneContact}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Envoyer</button>
      </form>
      <Navbar />
    </div>
  );
};

export default Profile;
