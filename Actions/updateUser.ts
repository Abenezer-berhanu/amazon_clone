export const updateUser = async (prevState: any, formData: FormData) => {
  const name = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  return {
    newUser: {
        name,
        email,
        password
    }
  };
};
