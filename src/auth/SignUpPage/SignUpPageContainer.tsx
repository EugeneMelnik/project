import React, { FC } from 'react';
import { connect } from 'react-redux';
import { CredentialsType, signUpThunk } from '../../redux/actions/user-action';
import SignUpPage from './SignUpPage';

interface ILoginPageContainer {
  signUpUser: (credentials: CredentialsType) => void;
}

const SignUpPageContainer: FC<ILoginPageContainer> = (props) => (
  <SignUpPage {...props} />
);

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  signUpUser: (credentials: CredentialsType) => dispatch(signUpThunk(credentials)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpPageContainer);
