import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";

export const handleDeleteUser = async (user) => {
  console.log(user);
  const userDetails = {
    id: user?.attributes.sub,
  };

  const deleteUser = await API.graphql({
    query: mutations.deleteUser,
    variables: { input: userDetails },
  });

  console.log(deleteUser);
  alert(`user ${user?.username} has been successfully deleted`);
};
