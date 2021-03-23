import React, {Component, Fragment} from "react";

class MainPage extends Component {
    constructor(Props) {
        super(Props);

        this.state = {};
    }

    componentDidMount() {
        console.log('componentdidMount');
    }

    render() {
        return (
            <Fragment>
                <article id="gjMainPageWrap">
                    김관중 블로그
                </article>
            </Fragment>
        );
    }
}

export default MainPage;