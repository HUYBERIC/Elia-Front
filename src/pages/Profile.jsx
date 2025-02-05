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
    <div>
      <h2>Profil</h2>
      <p>Les champs suivis d'un * sont obligatoires.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Nom*:
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Prénom*:
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Service Center*:
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

        <br />
        <label>
          Email*:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          GSM pro*:
          <input
            type="tel"
            name="gsmPro"
            value={formData.gsmPro}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          GSM perso:
          <input
            type="tel"
            name="gsmPerso"
            value={formData.gsmPerso}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Personne de contact:
          <input
            type="text"
            name="personneContact"
            value={formData.personneContact}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Envoyer</button>
      </form>
      <Navbar />
    </div>
  );
};

export default Profile;
