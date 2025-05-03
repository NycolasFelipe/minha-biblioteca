import { useState } from 'react';
import styles from "./InputPassword.module.css";
import classNames from "classnames";

// Bootstrap
import { Form, InputGroup, Button } from "react-bootstrap";

// Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoWarning } from 'react-icons/io5';

const InputPassword = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  className,
  warning = false,
  required = true
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Form.Group className={classNames(className && className)}>
      {label &&
        <Form.Label htmlFor={name} className={classNames(styles.label, warning && "text-danger")}>
          {warning && <IoWarning />}
          {label}
        </Form.Label>
      }
      <InputGroup className={styles.input_group}>
        <Form.Control
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder || "Digite sua senha"}
          onChange={onChange}
          value={value}
          aria-describedby="password-toggle"
          required={required}
        />
        <Button
          variant="outline-secondary"
          onClick={togglePasswordVisibility}
          className={classNames("position-absolute end-0 top-50 translate-middle-y", styles.password_toggle)}
          style={{ zIndex: 0, border: "none" }}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="text-secondary" />
          ) : (
            <AiOutlineEye className="text-secondary" />
          )}
        </Button>
      </InputGroup>
    </Form.Group>
  );
};

export default InputPassword;