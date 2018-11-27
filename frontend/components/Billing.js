import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

class Payment extends Component {

    onToken = res => {
        console.log('On Token Called!');
        console.log(res.id);
    };
    render() {
        return (
        
            <User>
            {({ data: { me }}) => (
            <StripeCheckout
            stripeKey="pk_test_gdkcAGf0cgA2G1afawEyNJeg"
            currrency="USD"
            amount="999.99"
            // email={me.email}
            name="Adventure Tracker"
            token={res => this.onToken(res)}
            >
            {this.props.children}
            </StripeCheckout>
            )}
            </User>
        );

    }

}

export default Payment;