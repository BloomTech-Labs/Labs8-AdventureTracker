import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

//Mutation Query
const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
    }
  }
`;

class Payment extends Component {
  onToken = (res, createOrder) => {
    console.log('On Token Called!');
    console.log(res.id);
    // manually call the mutation once we have the stripe token
    createOrder({
      variables: {
        token: res.id
      }
    }).catch(err => {
      alert(err.message);
    });
  };
  render() {
    const charge = 999;
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            // refetchQueries={[{ query: CURRENT_USER_QUERY }
            // ]}
          >
            {createOrder => (
              <StripeCheckout
                stripeKey="pk_test_gdkcAGf0cgA2G1afawEyNJeg"
                currrency="USD"
                amount={charge}
                //email={me.email}
                name="Adventure Tracker"
                token={res => this.onToken(res, createOrder)}
              >
                {this.props.children}
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default Payment;
