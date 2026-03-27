import { useState, type FormEvent } from "react";
import LangSelect from "./select.tsx";
import "./bar.css";
const translations = {
  allFieldsRequired: "All fields are required",
  passwordsNotMatch: "New passwords do not match",
  passwordTooShort: "Password must be at least 6 characters",
  samePassword: "New password must be different from current password",
  passwordChangedSuccess: "Password changed successfully!",
  settings: "Settings",
  changePassword: "Change Password",
  theme: "Theme",
  notifications: "Notifications",
  back: "Back",
  currentPassword: "Current Password",
  enterCurrentPassword: "Enter current password",
  newPassword: "New Password",
  enterNewPassword: "Enter new password",
  confirmPassword: "Confirm Password",
  confirmNewPassword: "Confirm password",
  updatePassword: "Update Password",
  Profile: "Profile",
  profileInfo: "Profile Info",
  name: "Name",
  email: "Email",
  logout: "Logout",
};

const t = (key: keyof typeof translations) => translations[key];

const Bar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const toggleProfile = () :void => {
        setIsProfileOpen(!isProfileOpen);
        setIsSettingsOpen(false);
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
        setIsProfileOpen(false);
    };

    const handleChangePassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage(t('allFieldsRequired') || 'All fields are required');
            setMessageType('error');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage(t('passwordsNotMatch') || 'New passwords do not match');
            setMessageType('error');
            return;
        }

        if (newPassword.length < 6) {
            setMessage(t('passwordTooShort') || 'Password must be at least 6 characters');
            setMessageType('error');
            return;
        }

        if (currentPassword === newPassword) {
            setMessage(t('samePassword') || 'New password must be different from current password');
            setMessageType('error');
            return;
        }

        setMessage(t('passwordChangedSuccess') || 'Password changed successfully!');
        setMessageType('success');

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <>
            { (isProfileOpen || isSettingsOpen) && <div className="overlay" onClick={() => { setIsProfileOpen(false); setIsSettingsOpen(false); setShowChangePassword(false); }}></div> }
            <div className="bar">
               <div className="select">
                 <LangSelect />
               </div>
               <div className="settings" onClick={toggleSettings}>
                    <img src="./public/settings.png" alt="settings" />
                    {isSettingsOpen && (
                        <div className="settings-dropdown" onClick={(e) => e.stopPropagation()}>
                            {!showChangePassword ? (
                                <>
                                    <div className="settings-header">
                                        <h3>{t('settings') || 'Settings'}</h3>
                                        <button onClick={toggleSettings}>×</button>
                                    </div>
                                    <div className="settings-content">
                                        <div className="settings-item" onClick={() => setShowChangePassword(true)}>
                                            <span className="icon">🔐</span>
                                            <div className="setting-text">
                                                <span className="label">{t('changePassword') || 'Change Password'}</span>
                                                <span className="description">Update your password</span>
                                            </div>
                                            <span className="arrow">→</span>
                                        </div>
                                        <div className="settings-item">
                                            <span className="icon">🎨</span>
                                            <div className="setting-text">
                                                <span className="label">{t('theme') || 'Theme'}</span>
                                                <span className="description">Dark / Light mode</span>
                                            </div>
                                            <span className="arrow">→</span>
                                        </div>
                                        <div className="settings-item">
                                            <span className="icon">🔔</span>
                                            <div className="setting-text">
                                                <span className="label">{t('notifications') || 'Notifications'}</span>
                                                <span className="description">Manage alerts</span>
                                            </div>
                                            <span className="arrow">→</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="change-password-form">
                                    <h3>{t('changePassword') || 'Change Password'}</h3>
                                    <button className="back-btn" onClick={() => { setShowChangePassword(false); setMessage(""); }}>&larr; {t('back') || 'Back'}</button>
                                    
                                    <form onSubmit={handleChangePassword}>
                                        <div className="form-group">
                                            <label htmlFor="current-password">
                                                {t('currentPassword') || 'Current Password'}
                                            </label>
                                            <input
                                                type="password"
                                                id="current-password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                placeholder={t('enterCurrentPassword') || 'Enter current password'}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="new-password">
                                                {t('newPassword') || 'New Password'}
                                            </label>
                                            <input
                                                type="password"
                                                id="new-password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder={t('enterNewPassword') || 'Enter new password'}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="confirm-password">
                                                {t('confirmPassword') || 'Confirm Password'}
                                            </label>
                                            <input
                                                type="password"
                                                id="confirm-password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder={t('confirmNewPassword') || 'Confirm password'}
                                            />
                                        </div>

                                        {message && (
                                            <div className={`message ${messageType}`}>
                                                {message}
                                            </div>
                                        )}

                                        <button type="submit" className="submit-btn">
                                            {t('updatePassword') || 'Update Password'}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
               </div>
               <div className="profile" onClick={toggleProfile}>
                <img src="./public/photo.jpg" alt="profile" />
                 {isProfileOpen && (
                    <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                        <div className="profile-header">
                            <h3>{t('Profile') || 'Profile'}</h3>
                            <button onClick={toggleProfile}>×</button>
                        </div>
                        <div className="profile-content">
                            <div className="profile-image-section">
                                <img src="./public/photo.jpg" alt="profile" className="profile-pic" />
                                <h4>John Doe</h4>
                                <p>Premium Member</p>
                            </div>
                            <div className="profile-item">
                                <span className="label">{t('profileInfo') || 'Profile Info'}</span>
                                <span className="value">User Information</span>
                            </div>
                            <div className="profile-item">
                                <span className="label">{t('name') || 'Name'}</span>
                                <span className="value">John Doe</span>
                            </div>
                            <div className="profile-item">
                                <span className="label">{t('email') || 'Email'}</span>
                                <span className="value">john@example.com</span>
                            </div>
                            <button className="logout-btn" onClick={() => { setIsProfileOpen(false); }}>
                                {t('logout') || 'Logout'}
                            </button>
                        </div>
                    </div>
                )}
               </div>
            </div>
        </>
    );
}
export default Bar;