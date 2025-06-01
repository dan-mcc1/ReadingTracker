import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  var user = getAuth().currentUser;
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    if (user) {
      user
        .delete()
        .then(function () {
          // User deleted.
          navigate("/");
        })
        .catch(function (error) {
          // An error happened.
          console.log("Error deleting account: ", error);
        });
    }
  };

  if (user) {
    return (
      <div className="flex flex-col justify-center items-center h-full text-[var(--primary-color)] space-y-4">
        <h1>Settings</h1>
        <button
          onClick={handleDeleteAccount}
          className="bg-[var(--primary-color)] text-[var(--secondary-color)] px-[1.2em] py-[0.6em]"
        >
          Delete Account
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center h-full text-[var(--primary-color)]">
        <h1>User Not Signed In</h1>
      </div>
    );
  }
};

export default Settings;
