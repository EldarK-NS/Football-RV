import React, { Component } from 'react';
import ErrorIndicator from './../error-indicator/error-indicator';

class ErrorBoundry extends Component {

    state = {
        hasError: false
    };

    // componentDidCatch - вызовется тогда когда на ккаком то этапе произойдет ошибка
    componentDidCatch() {
        this.setState({
            hasError: true
        });
    }
    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }
        return this.props.children;
    }
}
export default ErrorBoundry;