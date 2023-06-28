import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";

export const handleDeleteUser = async (user) => {
  const userDetails = {
    id: user?.attributes.sub,
  };

  const deleteUser = await API.graphql({
    query: mutations.deleteUser,
    variables: { input: userDetails },
  });

  alert(`user ${user?.username} has been successfully deleted`);
};

export function handleSignOut(signOut, dispatch) {
  signOut();
  dispatch({ type: "restart" });
}
