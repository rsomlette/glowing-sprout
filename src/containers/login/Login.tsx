import React, { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { Box, Button, Link, InputText } from "../../components";
import { SIGNIN_USER } from "../../graphql/mutation";
import { userSession } from "../../helpers/auth";

type LoginProps = {
  refetch: () => void;
};

export const Login = ({ refetch }: LoginProps) => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [login, { data, loading, error, client }] = useMutation(SIGNIN_USER);
  const history = useHistory();

  const handleChange = (value: string, name: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({
      variables: {
        username: formValues.username,
        password: formValues.password,
      },
    });
  };

  useEffect(() => {
    if (!data || !data.login) return;
    // TODO: Redirect user
    console.log("new token set ", data.login.token);
    userSession.saveUser(data.login.token);
    refetch();
    history.replace("/");
  }, [data, client, history, refetch]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <h2>Login</h2>
      <Box
        display="flex"
        flexDirection="column"
        as="form"
        onSubmit={handleSubmit}
      >
        <InputText
          required={true}
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          label="Username"
        />
        <InputText
          required={true}
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          label="Password"
        />
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
        <Box display="flex" justifyContent="center" mt={4}>
          <Link to="/signup">Signup</Link>
        </Box>
        {/* //TODO: Better error handling */}
        {error && <p>{error.message}</p>}
      </Box>
    </Box>
  );
};
