import styles from "./FunctionForm.module.scss";
import { useCallback, useEffect, useState } from "react";
import {
  isNumber,
  maxLength,
  minLength,
  required,
  validateInput,
} from "./validators";
import { getFunctionMesh } from "../../services/functions";
import { showErrorAlert, showSuccessAlert } from "../Toast/Toast";

export interface InputType {
  value: any;
  validators: any[];
}

export const initialText = {
  value: "",
  validators: [],
};

export const initialNumber = (number: number) => ({
  value: number,
  validators: [],
});

const FunctionForm = (props: { setResponseData: (data: any) => void }) => {
  const [functionValue, setFunctionValue] = useState<InputType>(initialText);
  const [aValue, setAValue] = useState<InputType>(initialNumber(0));
  const [bValue, setBValue] = useState<InputType>(initialNumber(10));
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormValid(
      (validateInput(functionValue) &&
        validateInput(aValue) &&
        validateInput(bValue)) ||
        false
    );
  }, [functionValue, aValue, bValue]);

  const handleFunctionValueChange = useCallback(
    (event: any) => {
      event.persist();
      const value = event.target.value;
      setFunctionValue({
        value,
        validators: [
          required(value),
          minLength(value, 1),
          maxLength(value, 100),
        ],
      });
    },
    [functionValue]
  );

  const handleAValueChange = useCallback(
    (event: any) => {
      event.persist();
      const value = event.target.value;
      setAValue({
        value,
        validators: [isNumber(value)],
      });
    },
    [aValue]
  );

  const handleBValueChange = useCallback(
    (event: any) => {
      event.persist();
      const value = event.target.value;
      setBValue({
        value,
        validators: [isNumber(value)],
      });
    },
    [bValue]
  );

  const submitForm = (event: any) => {
    event.preventDefault();
    const data = {
      function: functionValue.value,
      interval_x: { a: aValue.value, b: bValue.value },
      interval_y: { a: aValue.value, b: bValue.value },
    };

    setLoading(true);
    getFunctionMesh(data).then((response: any) => {
      if (response.success) {
        showSuccessAlert("Data fetched");
        props.setResponseData(response.data);
      } else {
        showErrorAlert(response.message);
      }
      setLoading(false);
    });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputContainer}>
        <label className="bodyBold white" htmlFor="function">
          Function:
        </label>
        <input
          id="function"
          type="text"
          placeholder="sin(x)+y^3"
          value={functionValue.value}
          onChange={(event) => handleFunctionValueChange(event)}
        />
      </div>

      <div className={styles.rowContainer}>
        <div className={styles.inputContainer}>
          <label className="bodyBold white" htmlFor="aValue">
            a value:
          </label>
          <input
            id="aValue"
            type="number"
            value={aValue.value}
            onChange={(event) => handleAValueChange(event)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className="bodyBold white" htmlFor="bValue">
            b value:
          </label>
          <input
            id="bValue"
            type="number"
            value={bValue.value}
            onChange={(event) => handleBValueChange(event)}
          />
        </div>
      </div>

      <button
        disabled={!formValid || loading}
        onClick={(event) => submitForm(event)}
        className={`buttonSubmit ${(!formValid || loading) && "disabled"}`}
      >
        Submit
        <span className="material-icons">send</span>
      </button>
    </div>
  );
};

export default FunctionForm;
