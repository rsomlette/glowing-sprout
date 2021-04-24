import React, { ChangeEvent, useEffect, useState } from "react";

import { Box, Link, Button, InputText } from "../../components";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../../graphql/mutation";

export const Signup = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  const handleChange = (value: string, name: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    signupUser({
      variables: {
        email: formValues.email,
        password: formValues.password,
        username: formValues.username,
      },
    });
  };

  useEffect(() => {
    if (!data || !data.signupUser) return;
    // TODO: Redirect user
    console.log(data.signupUser.token);
  }, [data]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <h2>Signup</h2>
      <Box
        display="flex"
        flexDirection="column"
        as="form"
        onSubmit={handleSubmit}
      >
        <InputText
          required={true}
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          label="Email"
        />
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
          <Link to="/login">back to login</Link>
        </Box>
        {/* //TODO: Better error handling */}
        {error && <p>{error.message}</p>}
      </Box>
    </Box>
  );
};
