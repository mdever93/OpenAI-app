import ResponseContainer from "../components/ResponseContainer";
import Prompt from "../components/Prompt";
import Response from "../components/Response";

export default {
  title: 'ResponseContainer',
  component: ResponseContainer,
  subcomponents: { Prompt, Response }
};


export const Default = (args) => (
  <ResponseContainer {...args} >
    <Prompt>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde et ad maiores iusto quisquam quis, cum omnis reprehenderit dignissimos perspiciatis. Error laudantium ducimus perferendis optio eos doloribus praesentium eum perspiciatis.</Prompt>
    <Response>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim at quaerat sapiente distinctio reiciendis dolor vero ex ullam assumenda aperiam. Ratione rerum beatae recusandae voluptatum ut laboriosam vero alias voluptate.</Response>
  </ResponseContainer>
);