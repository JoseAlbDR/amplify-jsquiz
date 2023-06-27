import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

async function createUser(user) {
  const userData = {
    id: user.attributes.sub,
    name: user.username,
    wrong: 0,
    correct: 0,
    total: 0,
    maxScore: 0,
  };
  try {
    await API.graphql({
      query: mutations.createUser,
      variables: { input: userData },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function getUser(user) {
  try {
    const oneUser = await API.graphql({
      query: queries.getUser,
      variables: { id: user.attributes.sub },
    });
    if (!oneUser.data.getUser) {
      await createUser(user);
    }
  } catch (err) {
    console.log(err.message);
  }
}
