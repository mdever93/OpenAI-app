import { action } from "@storybook/addon-actions";
import { Button } from "../components/Button"

// import '../index.css'

export default {
  title: 'Button',
  component: Button,
};

export const Submit = () => <Button onClick={action('submit')} >Submit</Button>;
