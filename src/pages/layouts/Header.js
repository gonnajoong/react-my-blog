import React, {Component, Fragment} from "react";

class Header extends Component {
    constructor(Props) {
        super(Props);

        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <header id="gjHeader">
                    헤더 컴포넌트
                </header>
            </Fragment>
        );
    }
}

export default Header;