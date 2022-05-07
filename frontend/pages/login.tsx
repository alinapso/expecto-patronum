import React, { useState } from "react";
import useUser from "lib/useUser";
import Layout from "components/Layout";
import Form from "components/Form";
import router from "next/router";
import { login } from "lib/auth";

export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { mutate } = useUser({
    redirectTo: "/profile-sg",
  });

  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Layout>
      <div className="login">
        <Form
          errorMessage={errorMsg}
          onSubmit={async function handleSubmit(event) {
            event.preventDefault();

            try {
              login(
                event.currentTarget.email.value,
                event.currentTarget.password.value
              ).then(() => {
                mutate();
              });

              router.push("/profile-sg");
            } catch (error) {
              console.error("An unexpected error happened:", error);
            }
          }}
        />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
}
