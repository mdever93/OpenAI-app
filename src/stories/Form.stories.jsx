import Form from "../components/Form";

export default {
  title: 'Form',
  component: Form,
};

const Template = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {};