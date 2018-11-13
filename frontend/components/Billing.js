import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

class Billing extends Component {
    render() {
        return (
            <div>
                Please pay with credit card
            </div>
        )

    }

}

export default Billing;