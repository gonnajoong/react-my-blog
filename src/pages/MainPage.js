import React, {Component, Fragment} from "react";

class MainPage extends Component {
    constructor(Props) {
        super(Props);

        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <article id="gjMainPageWrap">
                    메인 페이지 컴포넌트
                </article>
            </Fragment>
        );
    }
}

export default MainPage;