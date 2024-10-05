import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { toRoutes } from '../../../routes/routes';
import { $authApi } from '../../../api/modules/auth';
import { useAppDispatch } from '../../../store/hooks';
import { ISignUpPayload } from '../../../interfaces/Auth';
import schemaSignUp from '../../../validators/SchemaSignUp';
import { setSessionAction } from '../../../store/modules/auth';
import { Button } from '../../../components/shared/Button/Button';
import { setAuthorizationToken } from '../../../helpers/authorization';
import { TextField } from '../../../components/shared/TextField/TextField';
import { PasswordField } from '../../../components/shared/PasswordField/PasswordField';

import './SignUp.scss';

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ISignUpPayload>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schemaSignUp),
  })

  const onSubmit = async (values: ISignUpPayload) => {
    setLoading(true);

    await $authApi.signUp(values).then((response) => {
      setAuthorizationToken(response.token);
      dispatch(setSessionAction(response));

      if (!response.user.profile) {
        navigate(toRoutes.createProfile);
      }

    }).catch((error) => {
      console.error(error)
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <main className="signup">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-box">
        <div className="signup-form">
          <h1 className="signup-form__title">SIGN UP</h1>
          <p className="signup-form__desc">Welcome dude! Create your account to continue</p>
          <div className="signup-form__container">
            <TextField
              {...register('name')}
              error={errors.name}
              disabled={loading}
              label="Name"
              placeholder="Enter your name"
              id="name"
            />
            <TextField
              {...register('email')}
              error={errors.email}
              disabled={loading}
              label="Email"
              placeholder="example@example.com"
              id="email"
            />
            <PasswordField
              {...register('password')}
              error={errors.password}
              label="Password"
              disabled={loading}
              placeholder="Enter your password"
              id="password"
            />
            <PasswordField
              {...register('confirmPassword')}
              error={errors.confirmPassword}
              label="Confirm password"
              disabled={loading}
              placeholder="Enter your password again"
              id="confirmPassword"
            />

            <Button type="submit" loading={loading}>Register</Button>
            <p className="signup-form__message">
              You have an account? <Link className="link" to={toRoutes.signIn}>Sign In</Link>
            </p>
          </div>
        </div>
      </form>
    </main>
  )
}