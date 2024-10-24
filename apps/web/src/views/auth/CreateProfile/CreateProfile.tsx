import { useForm } from 'react-hook-form';
import './CreateProfile.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaCreateProfile from '../../../validators/SchemaCreateProfile';
import { ICreateProfilePayload } from '../../../interfaces/Auth';
import { $authApi } from '../../../api/modules/auth';
import { useAppDispatch } from '../../../store/hooks';
import { setProfileAction, setSessionAction } from '../../../store/modules/auth';
import { setAuthorizationToken } from '../../../helpers/authorization';
import { useNavigate } from 'react-router-dom';
import { toRoutes } from '../../../routes/routes';
import { TextField } from '../../../components/shared/TextField/TextField';
import { SelectField } from '../../../components/shared/SelectField/SelectField';

export const CreateProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { isValid } } = useForm<ICreateProfilePayload>({
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(schemaCreateProfile),
  });

  const onSubmit = (values: ICreateProfilePayload) => {
    $authApi.createProfile(values).then((response) => {
      dispatch(setProfileAction(response));

      $authApi.session().then((response) => {
        setAuthorizationToken(response.token);
        dispatch(setSessionAction(response));
        
        navigate(toRoutes.dashboard);
      })
    });
  }

  return (
    <main className="create-profile">
      <section className="create-profile__landing">
      </section>
      <form className="create-profile__container" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="profile-form__title">Create Your <span>Profile</span></h2>
        <p className="profile-form__sub">As new member, you need to configure your profile, let's do this.</p>

        <div className="profile-form__container">
          <TextField
            {...register('name')}
            label="Profile Name"
            placeholder="Insert the your profile name (business name or your name)"          
          />

          <SelectField
            options={[
              { label: 'Peruvian Soles', value: 1 },
              { label: 'Mexican Pesos', value: 2 },
              { label: 'US Dollar', value: 3 },
            ]}
            label="Default Currency"
            placeholder="Select a default currency"          
          />
        </div>
       {isValid && <button type="submit" className="profile-form__button">Save and Next</button>}
      </form>
    </main>
  )
};

export default CreateProfile;
