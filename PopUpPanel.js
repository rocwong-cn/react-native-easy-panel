/**
 * Created by Roc on 2017/4/7.
 */

import React, { Component } from 'react';
import { Animated, Platform, StyleSheet, TouchableWithoutFeedback,ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

export default class PopUpPanel extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            heightAnim: new Animated.Value(0),
            opacityAnim: new Animated.Value(0)
        };
    }

    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        bottom: PropTypes.number,
        height: PropTypes.number,
        customStyle: ViewPropTypes.style,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible && nextProps.height !== 0) {
            this._startAnimated(nextProps.height);
        }
        if (!nextProps.visible) {
            this.setState({
                heightAnim: new Animated.Value(0),
                opacityAnim: new Animated.Value(0)
            });
        }
    }

    render() {
        if (this.props.visible === false) {
            return null;
        }

        const { children, bottom, customStyle } = this.props;
        let bottomStyle;
        bottomStyle = bottom ? { bottom: bottom } : null;
        return (
            <TouchableWithoutFeedback onPress={this._onHide.bind(this)} onLayout={this._startAnimated.bind(this)}>
                <Animated.View style={[styles.container, { opacity: this.state.opacityAnim }, bottomStyle]}>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.content, { height: this.state.heightAnim }, customStyle]}>
                            {children}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }

    _onHide() {
        const { onClose } = this.props;
        if (!onClose) {
            console.warn('onClose function is required !!')
            return;
        }
        Animated.parallel([
            Animated.spring(this.state.opacityAnim, {
                toValue: 0
            }),
            Animated.spring(this.state.heightAnim, {
                toValue: 0
            }),
        ]).start(onClose);
    }

    _startAnimated(height) {
        if (typeof height !== 'number') {
            height = this.props.height;
        }

        Animated.parallel([
            Animated.spring(this.state.opacityAnim, {
                toValue: 1
            }),
            Animated.spring(this.state.heightAnim, {
                toValue: height || 150
            }),
        ]).start();
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,//Platform.OS === 'ios' ? 65 : 50,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        zIndex: 999
    },
    content: {
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e7e7e7'
    },
    btn: {
        width: 60,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTxt: {
        color: '#666'
    }
});
