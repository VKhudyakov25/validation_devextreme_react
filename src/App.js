import "devextreme/dist/css/dx.dark.css";
import "./App.css";
import Button from "devextreme-react/button";
import TextBox from "devextreme-react/text-box";
import CheckBox from "devextreme-react/check-box";
import Validator, {
  RequiredRule,
  CustomRule,
  PatternRule,
} from "devextreme-react/validator";
import ValidationGroup from "devextreme-react/validation-group";

import Form, { ButtonItem, SimpleItem, Label } from "devextreme-react/form";

import { useCallback, useState } from "react";

function App() {
  const [value, setValue] = useState(["", ""]);
  const [checkBoxValue, setCheckBoxValue] = useState([false, false]);

  const handleValueChange = useCallback(
    (v, i) => {
      let nextValue = value.slice();
      nextValue[i] = v;
      setValue(nextValue);
    },
    [value]
  );

  const onClick = (e) => {
    let result = e.validationGroup.validate();
    if (result.isValid) {
      alert("Validation checked");
      setValue(["", ""]);
    }
  };

  const toggle = useCallback(
    (e, i) => {
      let nextValue = checkBoxValue.slice();
      nextValue[i] = !checkBoxValue[i];
      setCheckBoxValue(nextValue);
    },
    [checkBoxValue]
  );

  const validationCallback = useCallback(
    (e, i) => {
      return checkBoxValue[i] ? !!e.value : true;
    },
    [checkBoxValue]
  );

  const person = {
    firstName: "",
    lastName: "",
  };

  const submitButtonOptions = {
    text: "Submit",
    useSubmitBehavior: true,
    type: "success",
    icon: "bell",
    onClick: (e) => {
      onClick(e);
    },
  };

  const textBoxOptions = {
    labelMode: "floating",
  };

  const checkBoxOptions = {
    text: "Validate",
    value: checkBoxValue[1],
    onValueChanged: (e) => {
      toggle(e, 1);
    },
  };

  return (
    <div className="App">
      <h2>Using Validation Engine</h2>
      <div className="container">
        <ValidationGroup className="controls">
          <Button text="Submit" type="success" onClick={onClick} icon="bell" />
          <TextBox
            className="textbox"
            value={value[0]}
            onValueChange={(e) => handleValueChange(e, 0)}
            label="First Name"
            labelMode="floating"
          >
            <Validator>
              <RequiredRule message="First Name is required" />
              <PatternRule
                pattern="^[a-zA-Z]+$"
                message="First Name should not contain digits"
              />
            </Validator>
          </TextBox>
          <TextBox
            className="textbox"
            value={value[1]}
            onValueChange={(e) => handleValueChange(e, 1)}
            label="Last Name"
            labelMode="floating"
          >
            <Validator>
              <CustomRule
                reevaluate={true}
                message="Last Name is required"
                validationCallback={(e) => validationCallback(e, 0)}
              />
            </Validator>
          </TextBox>
          <CheckBox
            className="checkbox"
            text="Validate"
            value={checkBoxValue[0]}
            onValueChange={(e) => toggle(e, 0)}
          />
        </ValidationGroup>
      </div>
      {/* </div> */}

      <h2>Using Form Component</h2>
      <div className="container">
        <Form action="myAction" formData={person} className="form">
          <ButtonItem buttonOptions={submitButtonOptions} />
          <SimpleItem
            dataField="firstName"
            editorType="dxTextBox"
            editorOptions={textBoxOptions}
          >
            <RequiredRule message="First Name is required" />
            <PatternRule
              pattern="^[a-zA-Z]+$"
              message="First Name should not contain digits"
            />
            <Label visible={false} />
          </SimpleItem>
          <SimpleItem
            dataField="lastName"
            editorType="dxTextBox"
            editorOptions={textBoxOptions}
          >
            <CustomRule
              reevaluate={true}
              message="Last Name is required"
              validationCallback={(e) => validationCallback(e, 1)}
            />
            <Label visible={false} />
          </SimpleItem>
          <SimpleItem
            editorType="dxCheckBox"
            editorOptions={checkBoxOptions}
          ></SimpleItem>
        </Form>
      </div>
    </div>
  );
}

export default App;
