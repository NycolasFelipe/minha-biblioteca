import styles from "./Input.module.css";
import classNames from "classnames";

// Bootstrap
import { Form, InputGroup } from "react-bootstrap";

const Input = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  className,
  disabled = false,
  required = false
}) => {
  return (
    <Form.Group className={classNames(className && className)}>
      {label && <Form.Label htmlFor={name} className={styles.label}>{label}</Form.Label>}
      <InputGroup className={styles.input_group}>
        <Form.Control
          id={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          disabled={disabled}
          required={required}
        />
      </InputGroup>
    </Form.Group>
  );
};

export default Input;