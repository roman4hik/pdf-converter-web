import React from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { compose } from 'redux';
import { connect } from 'react-redux';

import { convertImageRequest, convertImageSuccess, convertImageError } from './actions'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            link: null,
            error: null
        }
    }

    onFileChange = (event) => {
        this.setState({file: event.target.files[0]});
    };

    onLinkChange = (event) => {
        this.setState({link: event.target.value});
    };

    handleSubmit = () => {
        const { file, link } = this.state;
        const data = {}
        if ( file ) {
            data['file'] = file
        }
        if (link) {
            data['link'] = link
        }
        return new Promise((resolve, reject) => {
            const handleError = errors => {
                this.props.convertImageError(errors);
                const key = Object.keys(errors)[0];
                this.setState({error: errors[key]});
                reject();
            };

            const handleSuccess = response => {
                resolve();
                this.props.convertImageSuccess(response);
                const blob = new Blob([response.data], {type: 'application/pdf'})
                const url = window.URL.createObjectURL(blob);
                const anchorElem = document.createElement('a');
                anchorElem.style = 'display: none';
                anchorElem.href = url;
                anchorElem.download = 'converter.pdf';
                document.body.appendChild(anchorElem);
                anchorElem.click();
                document.body.removeChild(anchorElem);
            };
            this.props.convertImageRequest({
                data,
                handleSuccess,
                handleError,
            });
        });
    };

    renderLoading = () => (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );

    render() {
        const { error } = this.state;
        const { isLoading } = this.props;
        return (
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                        <Form className="col-6">
                            <h2 className="m-5">Test converter to PDF</h2>
                            <Form.Group controlId="linkAddr">
                                <Form.Label>Link to the page</Form.Label>
                                <Form.Control type="text" placeholder="Enter link" onChange={this.onLinkChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.File id="fileHTML" label="File input" type='file' onChange={this.onFileChange}/>
                            </Form.Group>
                            { error && (
                                <p className='text-danger'> {error} </p>
                            )}
                            <Button variant="primary" type="button" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                            {isLoading && (
                                this.renderLoading()
                            )}
                        </Form>
                </div>
            </div>
        )
    }
}

App.propTypes = {
    isLoading: PropTypes.bool,
    convertImageRequest: PropTypes.func,
    convertImageSuccess: PropTypes.func,
    convertImageError: PropTypes.func
};

const mapStateToProps = state => {
    return {
        isLoading: state.app.get('isLoading')
    }
};

const mapDispatchToProps = {
    convertImageRequest,
    convertImageSuccess,
    convertImageError
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
)(App);