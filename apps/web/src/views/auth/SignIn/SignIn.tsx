import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { toRoutes } from '../../../routes/routes';
import { $authApi } from '../../../api/modules/auth';
import { useAppDispatch } from '../../../store/hooks';
import { ISignInPayload } from '../../../interfaces/Auth';
import schemaSignIn from '../../../validators/SchemaSignIn';
import { setSessionAction } from '../../../store/modules/auth';
import { Button } from '../../../components/shared/Button/Button';
import { setAuthorizationToken } from '../../../helpers/authorization';
import { TextField } from '../../../components/shared/TextField/TextField';
import { PasswordField } from '../../../components/shared/PasswordField/PasswordField';

import './SignIn.scss';
import { LOGO_IMAGE } from '../../../constants/path';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ISignInPayload>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schemaSignIn),
  })

  const onSubmit = async (values: ISignInPayload) => {
    setLoading(true);

    await $authApi.signIn(values).then((response) => {
      setAuthorizationToken(response.token);
      dispatch(setSessionAction(response));

      if (!response.user.profileId) {
        return navigate(toRoutes.createProfile);
      }

      return navigate(toRoutes.dashboard);
    }).catch((error) => {
      console.error(error)
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <main className="signin">
      <section className="signin-banner"></section>
      <form onSubmit={handleSubmit(onSubmit)} className="signin-box">
        <div className="signin-form">
          <picture className="flex items-center justify-center mb-4">
            <img src={LOGO_IMAGE} />
          </picture>
          <h1 className="signin-form__title">Welcome back</h1>
          <p className="signin-form__desc">Do it for yourself, manage your finance</p>
          <div className="signin-form__container">
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
            <Button type="submit" loading={loading}>Sign In</Button>
          </div>
          <p className="signin-form__message">
            You don't have an account? <Link className="link" to={toRoutes.signUp}>Create account</Link>
          </p>
        </div>
      </form>
    </main>
  )
}