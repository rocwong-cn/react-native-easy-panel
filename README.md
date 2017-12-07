# react-native-easy-panel

## Demo
![demo](https://github.com/rocwangv/react-native-easy-panel/blob/master/demo.gif)

## Install

```bash
npm i --S react-native-easy-panel
```

## Props

`visible:bool`

Set a bool value to control the panel display or not.

---

`onClose:func`

The function to close/hide this panel. 

---

`height:number`

The panel's height as you see.

---

`customStyle:ViewPropTypes.style`

The panel container's style you want to custom.

---

`bottom:number`
> PopUpPanel ONLY

---

`top:number`
> DropDownPanel ONLY

## Usage

```js

import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { DropDownPanel, PopUpPanel } from 'react-native-pannel';

export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            ddpVisible: false,
            pupVisible: false
        };
    }

    render() {
        const { ddpVisible, pupVisible } = this.state;
        return (
            <View style={styles.container}>
                <Button onPress={this._openDropDownPanel} title={'open DropDown panel'}/>
                <Button onPress={this._openPopUpPanel} title={'open PopUp panel'}/>

                <DropDownPanel onClose={() => this.setState({ ddpVisible: false })}
                               visible={ddpVisible} customStyle={styles.panel}>
                    <Text>DropDownPanel</Text>
                </DropDownPanel>
                <PopUpPanel onClose={() => this.setState({ pupVisible: false })}
                            visible={pupVisible} customStyle={styles.panel}>
                    <Text>PopUpPanel</Text>
                </PopUpPanel>
            </View>
        );
    }

    _openDropDownPanel = () => {
        this.setState({ ddpVisible: true });
    };

    _openPopUpPanel = () => {
        this.setState({ pupVisible: true });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    panel: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

```