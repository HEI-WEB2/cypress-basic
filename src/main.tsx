import React, {FC, useState} from "react";
import ReactDOM from "react-dom/client";
import {useForm} from "react-hook-form";
import {nanoid} from "nanoid";
import axios from "axios";

interface User {
  id: string;
  username: string;
  age: number;
}

export const App: FC = () => {
  const [user, setUser] = useState<User>();

  const form = useForm<User>({
    defaultValues: {
      username: '',
      age: 18,
    },
  });

  const submitUser = form.handleSubmit(async (data) => {
    const res = await axios.put("https://apitsymiexist.com/auth", {
      ...data,
      id: nanoid(),
    });
    setUser(res.data);
  });

  return (
    <div>
      <form onSubmit={submitUser} data-testid="login-form">
        <input {...form.register("username")} data-testid="username" />
        <input {...form.register("age")} data-testid="age" />
        <button type="submit" data-testid="submit-button">submit</button>
      </form>

      {user ? <p data-testid="current-user">connected as {user.username}</p> : null}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
