import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

export async function updateUser(curUser, userData) {
  try {
    const userDetails = {
      id: curUser.id,
      correct: curUser.correct + userData.correct,
      total: curUser.total + userData.total,
      wrong: curUser.wrong + userData.wrong,
      maxScore:
        curUser.maxScore > userData.maxScore
          ? curUser.maxScore
          : userData.maxScore,
    };

    const updatedUser = await API.graphql({
      query: mutations.updateUser,
      variables: {
        input: userDetails,
      },
    });

    return updatedUser;
  } catch (err) {
    console.log(err);
  }
}

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
    const newUser = await API.graphql({
      query: mutations.createUser,
      variables: { input: userData },
    });
    return newUser;
  } catch (err) {
    console.error(err);
  }
}

export async function getUser(user) {
  try {
    const oneUser = await API.graphql({
      query: queries.getUser,
      variables: { id: user?.attributes.sub },
    });

    if (!oneUser.data.getUser) {
      const newUser = await createUser(user);
      return newUser?.data.createUser;
    } else {
      return oneUser?.data.getUser;
    }
  } catch (err) {
    console.log(err);
  }
}
