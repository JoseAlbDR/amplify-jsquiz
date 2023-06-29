import {
  Button,
  Heading,
  View,
  Flex,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";

// Form to Post questions to Graphql API
function PostQuestionForm({ addQuestion }) {
  return (
    <View className="App">
      <Heading level={1}>Add Question Form</Heading>
      <View as="form" margin="3rem 0" onSubmit={addQuestion}>
        <Flex direction="column" justifyContent="center">
          <TextField
            name="question"
            placeholder="Question"
            label="Question"
            labelHidden
            variation="quiet"
            required
          />
          <TextAreaField
            name="code"
            placeholder="Code"
            label="Code"
            labelHidden
            variation="quiet"
          />
          <TextField
            name="option1"
            placeholder="option1"
            label="option1"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="option2"
            placeholder="option2"
            label="option2"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="option3"
            placeholder="option3"
            label="option3"
            labelHidden
            variation="quiet"
          />
          <TextField
            name="option4"
            placeholder="option4"
            label="option4"
            labelHidden
            variation="quiet"
          />
          <TextField
            name="correctOption"
            placeholder="Correct Option"
            label="Correct Option"
            labelHidden
            variation="quiet"
            required
          />
          <TextAreaField
            name="answer"
            placeholder="answer"
            label="Answer"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Question
          </Button>
        </Flex>
      </View>
    </View>
  );
}

export default PostQuestionForm;
