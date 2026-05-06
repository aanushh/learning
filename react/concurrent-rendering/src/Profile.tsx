import { useEffect, useState } from "react";
import ProfileLoading from "./ProfileLoading";

interface User {
  name: string;
  email: string;
}

function Profile() {
  const [user, setUserData] = useState<User | undefined>(undefined);

  /**
   * Mock API calls using setTimeout
   */
  useEffect(() => {
    setTimeout(() => {
      setUserData({ name: "Anush", email: "anush@gmail.com" });
    }, 2000);
  }, []);

  if (!user) {
    return <ProfileLoading />;
  }

  return (
    <section>
      <h2>Profile</h2>

      {user.name ? <p>User Name: {user.name}</p> : null}
      {user.email ? <p>Email: {user.email}</p> : null}
    </section>
  );
}

export default Profile;
