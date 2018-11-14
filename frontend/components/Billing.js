import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

class Payment extends Component {
    render() {
        return (
            <div>
            <StripeCheckout>
            </StripeCheckout>
            </div>
        );

    }

}

export default Payment;