import { Form } from "react-bootstrap";

export const FormTextBox = ({
  name,
  text,
  placeHolder,
  type = "text",
}: any) => {
  return (
    <Form.Group className="form-group">
      <Form.Label>{text}</Form.Label>
      <Form.Control type={type} name={name} placeholder={placeHolder} />
    </Form.Group>
  );
};

export const FormUploadDialog = ({ name, text }: any) => {
  return (
    <Form.Group className="form-group">
      <Form.Label>{text}</Form.Label>
      <Form.Control type="file" name={name} accept="image/*" />
    </Form.Group>
  );
};

export const FormDatatimePicker = ({ text }: any) => {
  return (
    <Form.Group className="form-group">
      <Form.Label>{text}</Form.Label>
      <Form.Control type="file" name="pic" accept="image/*" />
    </Form.Group>
  );
};
