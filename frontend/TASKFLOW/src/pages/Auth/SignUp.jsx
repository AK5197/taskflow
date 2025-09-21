import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import Input from "../../components/inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadimage";

// E-Mail Validierung über Browser + Fallback Regex
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { updateUser } = useUserContext();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError("Bitte geben Sie Ihren vollständigen Namen an.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Das Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }

    setError("");

    try {
      // Bild hochladen, falls vorhanden
      let profileImageUrl = "";
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes?.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        profileImageUrl,
        adminInviteToken,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
      );
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold">Erstellen Sie ein Konto</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Registrieren Sie sich unten, um loszulegen
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm text-slate-700 mb-1">
                Vollständiger Name
              </label>
              <input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                placeholder="Max Mustermann"
                type="text"
                className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* E-Mail */}
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="E-Mail-Adresse"
              placeholder="max.muster@example.ch"
              type="email"
            />

            {/* Passwort */}
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Passwort"
              placeholder="Mindestens 8 Zeichen"
              type="password"
            />

            {/* Admin Token */}
            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label="Einladungstoken"
              placeholder="6-stelliger Code"
              type="text"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Registrieren
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Bereits registriert?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Hier anmelden
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
