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
import { toast } from 'sonner';
import { useLanguage } from '../../../hooks/useLanguage';

export const SignIn = () => {
  const { content } = useLanguage('signIn');

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
    }).catch(({ response: { data } }) => {
      toast.error(data.message);
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
          <h1 className="signin-form__title">{content.title}</h1>
          <p className="signin-form__desc">{content.sub}</p>
          <div className="signin-form__container">
            <TextField
              {...register('email')}
              error={errors.email}
              disabled={loading}
              label={content.form.email}
              placeholder={content.form.emailPl}
              id="email"
            />
            <PasswordField
              {...register('password')}
              error={errors.password}
              label={content.form.password}
              placeholder={content.form.passwordPl}
              disabled={loading}
              id="password"
            />
            <Button type="submit" loading={loading}>{content.form.submit}</Button>
          </div>
          <p className="signin-form__message">
            {content.form.createAccount} <Link className="link" to={toRoutes.signUp}>{content.form.createAccountLink}</Link>
          </p>
        </div>
      </form>
    </main>
  )
}