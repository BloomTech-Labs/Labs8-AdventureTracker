import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';
import { Form, FormTitle } from './styles/FormStyles';
import styled from 'styled-components';
import { MainContainerTwo } from './styles/MainContainer';
const BillingForm = styled(Form)`
  max-width: 56rem;
  height: 30rem;
  background: ${props => props.theme.grey};
  border-radius: 8px;
  margin: 18rem 0;
`;
const BillingTitle = styled(FormTitle)`
  color: ${props => props.theme.black};
  line-height: 1;
  font-weight: 700;
`;
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
  onToken = async (res, createOrder) => {
    console.log('On Token Called!');
    console.log(res.id);
    // manually call the mutation once we have the stripe token
    const order = await createOrder({
      variables: {
        token: res.id
      }
    }).catch(err => {
      alert(err.message);
    });
    console.log(order);
  };
  render() {
    const charge = 999;

    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {createOrder => (
              <MainContainerTwo>
                
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
                
              </MainContainerTwo>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default Payment;
