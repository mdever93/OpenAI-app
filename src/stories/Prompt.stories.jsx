import Prompt from "../components/Prompt";

export default {
  title: 'Prompt',
  component: Prompt,
};

const Template = (args) => <Prompt {...args} >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit consectetur veniam explicabo inventore beatae, iste quisquam excepturi. Non perspiciatis eum modi cupiditate similique magni ipsam, provident fuga quod incidunt deleniti. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora suscipit est, odio laudantium provident magni, temporibus quidem veniam distinctio fugiat, autem neque dolorem necessitatibus libero assumenda eius! Animi, laborum iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non at ipsam dolorum aut cum. Dolor adipisci eaque tenetur repellat dolore? Animi esse impedit numquam aliquam culpa quasi, ad aliquid similique.</Prompt>;

export const Default = Template.bind({});
Default.args = {};