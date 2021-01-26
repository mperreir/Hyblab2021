import React from 'react';

class Home extends  React.Component {
    render() {
        const {onNextPage} = this.props;
        return (
            <div>
                <input type='text' placeholder='entrez votre prénom'/>
                <input type='button' value='test' onClick={onNextPage}/>
            </div>
        );
    }
}
export default Home;