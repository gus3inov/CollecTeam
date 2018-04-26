import * as React from "react";

export interface HelloProps {
    title: string;
}

export default class About extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler}</h1>;
    }
}