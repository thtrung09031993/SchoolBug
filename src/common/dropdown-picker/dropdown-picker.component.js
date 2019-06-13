import React, { Component } from "react";
import { Picker, Form } from "native-base";
export default class DropDownPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key1"
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  render() {
    return (
      <Form>
        <Picker
          note
          mode="dropdown"
          style={{ width: 120 }}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
        >
          {this.props.items.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.id} />
          ))}
        </Picker>
      </Form>
    );
  }
}